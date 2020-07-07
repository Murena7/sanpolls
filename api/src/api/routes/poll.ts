import { Router, Request, Response, NextFunction } from 'express';
import { Container } from 'typedi';
import { Logger } from 'winston';
import PollService from '../../services/poll';
import middlewares from '../middlewares';
import { Role } from '../../interfaces/user';
import { IBasicResponse } from '../../interfaces/response-types';
import { celebrate, Joi } from 'celebrate';

const route = Router();

export default (app: Router) => {
  app.use('/poll', route);

  route.get(
    '/rating-list',
    celebrate({
      query: Joi.object({
        skip: Joi.string(),
        take: Joi.string(),
        id: Joi.string(),
      }),
    }),
    async (req: Request, res: Response, next: NextFunction) => {
      const logger: Logger = Container.get('logger');
      logger.debug('Calling /poll/rating-list endpoint');
      try {
        const pollServiceInstance = Container.get(PollService);

        const result: IBasicResponse = await pollServiceInstance.ratingList({
          skip: req.query.skip,
          take: req.query.take,
          id: req.query.id,
        });

        return res.status(200).json(result);
      } catch (e) {
        logger.error('🔥 error: %o', e);
        return next(e);
      }
    },
  );

  route.post(
    '/create',
    middlewares.checkAuth([Role.Admin]),
    celebrate({
      body: Joi.object({
        name: Joi.string().required(),
        message: Joi.string().required(),
        endMessage: Joi.string().required(),
        startDate: Joi.date().required(),
        endDate: Joi.date().required(),
        status: Joi.string().required(),
        type: Joi.string().required(),
      }),
    }),
    async (req: Request, res: Response, next: NextFunction) => {
      const logger: Logger = Container.get('logger');
      logger.debug('Calling /poll/create endpoint');
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
};
