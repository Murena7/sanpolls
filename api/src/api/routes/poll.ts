import { Router, Request, Response, NextFunction } from 'express';
import { Container } from 'typedi';
import { Logger } from 'winston';
import PollService from '../../services/poll';
import { IBasicResponse } from '../../interfaces/response-types';
import { celebrate, Joi } from 'celebrate';

const route = Router();

export default (app: Router) => {
  app.use('/poll', route);

  route.get('/active', async (req: Request, res: Response, next: NextFunction) => {
    const logger: Logger = Container.get('logger');
    logger.debug('Calling /poll/active endpoint');
    try {
      const pollServiceInstance = Container.get(PollService);

      const result: IBasicResponse = await pollServiceInstance.activePoll();

      return res.status(200).json(result);
    } catch (e) {
      logger.error('🔥 error: %o', e);
      return next(e);
    }
  });

  route.get(
    '/rating-list',
    celebrate({
      query: Joi.object({
        skip: Joi.number(),
        take: Joi.number(),
        id: Joi.string().uuid(),
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
};
