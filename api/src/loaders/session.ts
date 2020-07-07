import session from 'express-session';
import connectRedis from 'connect-redis';
import express from 'express';
import { Redis } from 'ioredis';
import config from '../config';

export default ({ app, redisConnection }: { app: express.Application; redisConnection: Redis }) => {
  let RedisStore = connectRedis(session);

  app.use(
    session({
      store: new RedisStore({ client: redisConnection }),
      secret: config.sessionSecret,
      resave: true,
      rolling: true,
      saveUninitialized: false,
      cookie: {
        maxAge: 4 * 60 * 60 * 1000, // 4 hours
        httpOnly: true,
        secure: false,
      },
    }),
  );
};
