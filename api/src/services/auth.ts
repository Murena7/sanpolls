import { Inject, Service } from 'typedi';
import argon2 from 'argon2';
import { randomBytes } from 'crypto';
import { Role } from '../interfaces/user';
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
import MailerService from './mailer';
import { IBasicResponse } from '../interfaces/response-types';
import { EmailVerificationTokens } from '../entity';
import { EmailVerificationStatus, IEmailVerificationResponse, IUserSignUpBody } from '../interfaces/auth';
import crypto from 'crypto-random-string';
import config from '../config';
import { ResponseStatusMessage } from '../interfaces/response';

@Service()
export default class AuthService {
  userRepository: Repository<User>;
  verificationTokensRepository: Repository<EmailVerificationTokens>;

  constructor(
    private mailer: MailerService,
    @Inject('logger') private logger,
    @EventDispatcher() private eventDispatcher: EventDispatcherInterface,
  ) {
    this.userRepository = getRepository(User);
    this.verificationTokensRepository = getRepository(EmailVerificationTokens);
  }

  public async SignUp(userInputDTO: IUserSignUpBody): Promise<{ user: User }> {
    try {
      /*
      Check User Exist
      */
      const userExist = await this.userRepository.findOne({ email: userInputDTO.email });
      if (userExist) {
        throw new Error('This email already used');
      }
      /*
      Hash password
      */
      this.logger.silly('Hashing password');
      const salt = randomBytes(32);
      const hashedPassword = await argon2.hash(userInputDTO.password, { salt });
      this.logger.silly('Creating user db record');
      /*
      Create and Save New User to DB
      */
      const userRecord = await this.userRepository
        .create({
          email: userInputDTO.email,
          password: hashedPassword,
          role: Role.User,
          username: `user${lodash.random(1000000, 9999999)}`,
        })
        .save();

      if (!userRecord) {
        throw new Error('User cannot be created');
      }
      /*
      Generate Email Verify Link
      */
      const verificationLink = await this.generateVerificationLink(userRecord);
      /*
      Sending welcome email
      */
      this.logger.silly('Sending welcome email');
      await this.mailer.SendWelcomeEmail(userRecord.email, verificationLink);
      this.eventDispatcher.dispatch(events.user.signUp, { user: userRecord });
      /*
      Crediting SignUp Voice Bonus
      */
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
      return { user };
    } catch (e) {
      this.logger.error(e);
      throw e;
    }
  }

  private async generateVerificationLink(user: User): Promise<string> {
    const tokenRecord = await this.verificationTokensRepository
      .create({
        userId: user.id,
        token: crypto({ length: 16, type: 'url-safe' }),
      })
      .save();

    return `${config.serverApiUrl}/login?verificationToken=${tokenRecord.token}&email=${user.email}`;
  }

  public async forgotPassword(email: string): Promise<IBasicResponse> {
    try {
      const userRecord = await this.userRepository.findOneOrFail({ email: email });

      /*
      Generate and hash random password
      */
      const salt = randomBytes(32);
      const newPassword = generatePassword.generate({
        length: 12,
        numbers: true,
        symbols: true,
        lowercase: true,
        uppercase: true,
      });
      this.logger.silly('Hashing password');
      const hashedPassword = await argon2.hash(newPassword, { salt });

      userRecord.password = hashedPassword;

      await userRecord.save();
      await this.mailer.SendPasswordRecoveryEmail(userRecord.email, newPassword);

      return { status: ResponseStatusMessage.Success };
    } catch (e) {
      this.logger.error(e);
      throw e;
    }
  }

  public async resendVerification(email: string): Promise<IBasicResponse> {
    try {
      const userRecord = await this.userRepository.findOneOrFail({ email: email });

      if (userRecord.emailConfirmed) {
        throw new Error('Email already confirmed');
      }

      const tokenRecord = await this.verificationTokensRepository.findOneOrFail({ userId: userRecord.id });
      const verificationLink = `${config.serverApiUrl}/login?verificationToken=${tokenRecord.token}&email=${userRecord.email}`;
      await this.mailer.SendWelcomeEmail(userRecord.email, verificationLink);

      return { status: ResponseStatusMessage.Success };
    } catch (e) {
      this.logger.error(e);
      throw e;
    }
  }

  public async loginOrSignUpSocial(profile: Profile | ProfileGoogle, cb: Function) {
    try {
      /*
      Check if email exist in social response
      */
      if (!profile.emails) {
        cb(new Error('Facebook or Google No Email'));
      }
      const userEmail = profile.emails[0].value;
      /*
      Check if user exist by email
      */
      const userExist = await this.userRepository.findOne({ email: userEmail });
      if (userExist) {
        if (userExist.emailConfirmed === false) {
          /*
          Auto confirm email if SocialLogin
            */
          userExist.emailConfirmed = true;
          await userExist.save();
        }

        Reflect.deleteProperty(userExist, 'password');
        /*
        Return user and create session if user exist
        */
        return cb(null, userExist);
      }
      /*
      Generate and hash random password for social login
      */
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
      /*
      Create User in Db
      */
      this.logger.silly('Creating user db record');
      const userRecord = await this.userRepository
        .create({
          email: userEmail,
          password: hashedPassword,
          role: Role.User,
          emailConfirmed: true,
          username: `user${lodash.random(1000000, 9999999)}`,
        })
        .save();

      if (!userRecord) {
        cb(new Error('User cannot be created'));
      }

      /*
      Generate Email Verify Link
      */
      const verificationLink = await this.generateVerificationLink(userRecord);
      /*
      Sending welcome email
      */
      this.logger.silly('Sending welcome email');
      await this.mailer.SendWelcomeEmail(userRecord.email, verificationLink);
      this.eventDispatcher.dispatch(events.user.signUp, { user: userRecord });

      /*
      Crediting SignUp Voice Bonus
      */
      const signUpBonusTransactionData: IAddVoiceByTypeBody = {
        userId: userRecord.id,
        amount: 20,
        source: TransactionSource.SignUpBonus,
      };
      await AddVoiceByTypeTransaction(signUpBonusTransactionData);

      const user = userRecord;
      Reflect.deleteProperty(user, 'password');

      return cb(null, user);
    } catch (e) {
      this.logger.error(e);
      throw e;
    }
  }

  public async emailVerification(token: string, email: string): Promise<IBasicResponse<IEmailVerificationResponse>> {
    try {
      const userRecord = await this.userRepository.findOne({ email: email });
      if (!userRecord) {
        return { data: { verificationStatus: EmailVerificationStatus.notValidUserEmail } };
      }

      if (userRecord.emailConfirmed) {
        return { data: { verificationStatus: EmailVerificationStatus.confirmed } };
      } else {
        const tokenRecord = await this.verificationTokensRepository.findOne({ token: token });
        if (!tokenRecord) {
          return { data: { verificationStatus: EmailVerificationStatus.notValidToken } };
        }

        userRecord.emailConfirmed = true;
        await userRecord.save();
        await tokenRecord.remove();
        return { data: { verificationStatus: EmailVerificationStatus.confirmed } };
      }
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
