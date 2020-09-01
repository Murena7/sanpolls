import express from 'express';
import { Redis } from 'ioredis';
import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import { Strategy as FacebookStrategy } from 'passport-facebook';
import { OAuth2Strategy as GoogleStrategy } from 'passport-google-oauth';
import { Container } from 'typedi';
import AuthService from '../services/auth';
import { User } from '../entity/user';
import { getRepository } from 'typeorm';
import config from '../config';

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

  passport.use(
    new FacebookStrategy(
      {
        clientID: config.facebook.appId,
        clientSecret: config.facebook.secret,
        callbackURL: `${config.serverApiUrl}${config.api.prefix}/auth/facebook/callback`,
        passReqToCallback: true,
        profileFields: ['id', 'emails', 'name'],
        enableProof: true,
      },
      async (req, accessToken, refreshToken, profile, cb) => {
        try {
          const authServiceInstance = Container.get(AuthService);
          return await authServiceInstance.loginOrSignUpSocial(profile, cb);
        } catch (err) {
          cb(err);
        }
      },
    ),
  );

  passport.use(
    new GoogleStrategy(
      {
        clientID: config.google.appId,
        clientSecret: config.google.secret,
        callbackURL: `${config.serverApiUrl}${config.api.prefix}/auth/google/callback`,
        passReqToCallback: true,
      },
      async (req, accessToken, refreshToken, profile, cb) => {
        try {
          const authServiceInstance = Container.get(AuthService);
          return await authServiceInstance.loginOrSignUpSocial(profile, cb);
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
