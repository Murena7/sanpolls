import { Router, Request, Response, NextFunction } from 'express';
import middlewares from '../middlewares';
import { IBasicResponse } from '../../interfaces/response-types';
import { Logger } from 'winston';
import { Container } from 'typedi';
import UserService from '../../services/user';
import { User } from '../../entity';
import { celebrate, Joi } from 'celebrate';
const route = Router();

export default (app: Router) => {
  app.use('/user', route);

  route.get('/me', middlewares.checkAuth(), async (req: Request, res: Response, next: NextFunction) => {
    const logger: Logger = Container.get('logger');
    logger.debug('Calling /user/me endpoint');
    try {
      const user = { ...req.user };
      Reflect.deleteProperty(user, 'password');
      const apiResponse: IBasicResponse = { data: user };
      return res.json(apiResponse).status(200);
    } catch (e) {
      logger.error('🔥 error: %o', e);
      return next(e);
    }
  });

  route.post(
    '/profile/update',
    celebrate({
      body: Joi.object({
        username: Joi.string()
          .max(200)
          .required(),
      }),
    }),
    middlewares.checkAuth(),
    async (req: Request, res: Response, next: NextFunction) => {
      const logger: Logger = Container.get('logger');
      logger.debug('Calling /user/profile/update endpoint');
      try {
        const userServiceInstance = Container.get(UserService);
        const result: IBasicResponse = await userServiceInstance.updateProfile(req.body, req.user as User);
        return res.status(200).json(result);
      } catch (e) {
        logger.error('🔥 error: %o', e);
        return next(e);
      }
    },
  );

  route.post(
    '/password/change',
    celebrate({
      body: Joi.object({
        newPassword: Joi.string()
          .min(6)
          .max(200)
          .required(),
        oldPassword: Joi.string()
          .min(6)
          .max(200)
          .required(),
      }),
    }),
    middlewares.checkAuth(),
    async (req: Request, res: Response, next: NextFunction) => {
      const logger: Logger = Container.get('logger');
      logger.debug('Calling /user/password/change endpoint');
      try {
        const userServiceInstance = Container.get(UserService);
        const result: IBasicResponse = await userServiceInstance.changePassword(req.body, req.user as User);
        return res.status(200).json(result);
      } catch (e) {
        logger.error('🔥 error: %o', e);
        return next(e);
      }
    },
  );

  route.get(
    '/song/history',
    celebrate({
      query: Joi.object({
        skip: Joi.number(),
        take: Joi.number(),
      }),
    }),
    middlewares.checkAuth(),
    async (req: Request, res: Response, next: NextFunction) => {
      const logger: Logger = Container.get('logger');
      logger.debug('Calling /user/song/history endpoint');
      try {
        const userServiceInstance = Container.get(UserService);
        const result: IBasicResponse = await userServiceInstance.userSongHistory(
          {
            skip: req.query.skip,
            take: req.query.take,
          },
          req.user as User,
        );
        return res.status(200).json(result);
      } catch (e) {
        logger.error('🔥 error: %o', e);
        return next(e);
      }
    },
  );

  route.get(
    '/poll-transaction/history',
    celebrate({
      query: Joi.object({
        skip: Joi.number(),
        take: Joi.number(),
      }),
    }),
    middlewares.checkAuth(),
    async (req: Request, res: Response, next: NextFunction) => {
      const logger: Logger = Container.get('logger');
      logger.debug('Calling /user/transaction/history endpoint');
      try {
        const userServiceInstance = Container.get(UserService);
        const result: IBasicResponse = await userServiceInstance.userPollTransactionHistory(
          {
            skip: req.query.skip,
            take: req.query.take,
          },
          req.user as User,
        );
        return res.status(200).json(result);
      } catch (e) {
        logger.error('🔥 error: %o', e);
        return next(e);
      }
    },
  );
};
