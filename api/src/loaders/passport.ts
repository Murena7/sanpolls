import express from 'express';
import { Redis } from 'ioredis';
import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import { Container } from 'typedi';
import AuthService from '../services/auth';
import { User } from '../entity/user';
import { getRepository } from 'typeorm';

export default ({ app, redisConnection }: { app: express.Application; redisConnection: Redis }) => {
  passport.use(
    new LocalStrategy(
      {
        usernameField: 'email',
        passwordField: 'password',
      },
      async (email, password, cb) => {
        try {
          const authServiceInstance = Container.get(AuthService);
          return await authServiceInstance.SignIn(email, password, cb);
        } catch (err) {
          cb(err);
        }
      },
    ),
  );

  passport.serializeUser(async (user: User, cb) => {
    cb(null, user.id);
  });

  passport.deserializeUser(async (id, cb) => {
    try {
      const userRepository = getRepository(User);
      const userRecord = await userRepository.findOneOrFail(id);
      cb(null, userRecord);
    } catch (err) {
      cb(err);
    }
  });

  // INIT PASSPORT
  app.use(passport.initialize());
  app.use(passport.session());
};
