import { Router, Request, Response, NextFunction } from 'express';
import { Container } from 'typedi';
import { Logger } from 'winston';
import middlewares from '../middlewares';
import { IBasicResponse } from '../../interfaces/response-types';
import { celebrate, Joi } from 'celebrate';
import { User } from '../../entity/user';
import VoteService from '../../services/vote';

const route = Router();

export default (app: Router) => {
  app.use('/vote', route);

  route.post(
    '/give',
    middlewares.checkAuth(),
    celebrate({
      body: Joi.object({
        songId: Joi.string()
          .uuid()
          .required(),
        voiceCount: Joi.number()
          .min(1)
          .required(),
      }),
    }),
    async (req: Request, res: Response, next: NextFunction) => {
      const logger: Logger = Container.get('logger');
      logger.debug('Calling /vote/give endpoint');
      try {
        const voteServiceInstance = Container.get(VoteService);
        const result: IBasicResponse = await voteServiceInstance.giveVote(req.body, req.user as User);

        return res.status(200).json(result);
      } catch (e) {
        logger.error('🔥 error: %o', e);
        return next(e);
      }
    },
  );
};
