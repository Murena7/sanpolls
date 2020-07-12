import { Router, Request, Response, NextFunction } from 'express';
import { Container } from 'typedi';
import { Logger } from 'winston';
import middlewares from '../middlewares';
import { IBasicResponse } from '../../interfaces/response-types';
import { celebrate, Joi } from 'celebrate';
import AdminService from '../../services/admin';
import { Role } from '../../interfaces/user';
import PollService from '../../services/poll';

const route = Router();

export default (app: Router) => {
  app.use('/admin', middlewares.checkAuth([Role.Admin]), route);

  /// USER ////
  route.get(
    '/user/all',
    celebrate({
      query: Joi.object({
        skip: Joi.string(),
        take: Joi.string(),
      }),
    }),
    async (req: Request, res: Response, next: NextFunction) => {
      const logger: Logger = Container.get('logger');
      logger.debug('Calling /admin/user/all endpoint');
      try {
        const devToolsServiceInstance = Container.get(AdminService);
        const result: IBasicResponse = await devToolsServiceInstance.getAllUsers(+req.query.skip, +req.query.take);

        return res.status(200).json(result);
      } catch (e) {
        logger.error('🔥 error: %o', e);
        return next(e);
      }
    },
  );

  route.put(
    '/user/:userId/user-to-admin',
    celebrate({
      params: Joi.object({
        userId: Joi.string()
          .uuid()
          .required(),
      }),
    }),
    async (req: Request, res: Response, next: NextFunction) => {
      const logger: Logger = Container.get('logger');
      logger.debug('Calling /admin/user/user-to-admin endpoint');
      try {
        const devToolsServiceInstance = Container.get(AdminService);
        const result: IBasicResponse = await devToolsServiceInstance.userToAdmin(req.params.userId);

        return res.status(200).json(result);
      } catch (e) {
        logger.error('🔥 error: %o', e);
        return next(e);
      }
    },
  );

  route.post(
    '/user/add-voice',
    celebrate({
      body: Joi.object({
        userId: Joi.string()
          .uuid()
          .required(),
        amount: Joi.number().required(),
      }),
    }),
    async (req: Request, res: Response, next: NextFunction) => {
      const logger: Logger = Container.get('logger');
      logger.debug('Calling /admin/user/user-to-admin endpoint');
      try {
        const devToolsServiceInstance = Container.get(AdminService);
        const result: IBasicResponse = await devToolsServiceInstance.addVoiceByUserId({
          userId: req.body.userId,
          amount: req.body.amount,
        });

        return res.status(200).json(result);
      } catch (e) {
        logger.error('🔥 error: %o', e);
        return next(e);
      }
    },
  );
  ///////
  /////// POLL //////////
  route.post(
    '/poll/create',
    celebrate({
      body: Joi.object({
        name: Joi.string()
          .max(200)
          .required(),
        message: Joi.string()
          .max(500)
          .required(),
        endMessage: Joi.string()
          .max(500)
          .required(),
        startDate: Joi.date().required(),
        endDate: Joi.date().required(),
        status: Joi.string().required(),
        type: Joi.string().required(),
      }),
    }),
    async (req: Request, res: Response, next: NextFunction) => {
      const logger: Logger = Container.get('logger');
      logger.debug('Calling /admin/poll/create endpoint');
      try {
        const pollServiceInstance = Container.get(PollService);
        const result: IBasicResponse = await pollServiceInstance.createPoll(req.body);

        return res.status(200).json(result);
      } catch (e) {
        logger.error('🔥 error: %o', e);
        return next(e);
      }
    },
  );

  route.get(
    '/poll/all',
    celebrate({
      query: Joi.object({
        skip: Joi.string(),
        take: Joi.string(),
      }),
    }),
    async (req: Request, res: Response, next: NextFunction) => {
      const logger: Logger = Container.get('logger');
      logger.debug('Calling /admin/poll/all endpoint');
      try {
        const devToolsServiceInstance = Container.get(AdminService);
        const result: IBasicResponse = await devToolsServiceInstance.getAllPolls(+req.query.skip, +req.query.take);

        return res.status(200).json(result);
      } catch (e) {
        logger.error('🔥 error: %o', e);
        return next(e);
      }
    },
  );
  ///
  ////Statistics
  route.get('/user/statistic/total', async (req: Request, res: Response, next: NextFunction) => {
    const logger: Logger = Container.get('logger');
    logger.debug('Calling /user/statistic/total endpoint');
    try {
      const devToolsServiceInstance = Container.get(AdminService);
      const result: IBasicResponse = await devToolsServiceInstance.getStatisticTotal();

      return res.status(200).json(result);
    } catch (e) {
      logger.error('🔥 error: %o', e);
      return next(e);
    }
  });
  ////////
  /////Transactions
  route.get(
    '/transaction/all',
    celebrate({
      query: Joi.object({
        skip: Joi.string(),
        take: Joi.string(),
      }),
    }),
    async (req: Request, res: Response, next: NextFunction) => {
      const logger: Logger = Container.get('logger');
      logger.debug('Calling /admin/transaction/all endpoint');
      try {
        const devToolsServiceInstance = Container.get(AdminService);
        const result: IBasicResponse = await devToolsServiceInstance.getAllTransactions(
          +req.query.skip,
          +req.query.take,
        );

        return res.status(200).json(result);
      } catch (e) {
        logger.error('🔥 error: %o', e);
        return next(e);
      }
    },
  );
  ////
};
