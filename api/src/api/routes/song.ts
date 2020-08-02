import { Router, Request, Response, NextFunction } from 'express';
import { Container } from 'typedi';
import { Logger } from 'winston';
import middlewares from '../middlewares';
import { IBasicResponse } from '../../interfaces/response-types';
import { celebrate, Joi } from 'celebrate';
import SongService from '../../services/song';
import { User } from '../../entity/user';

const route = Router();

export default (app: Router) => {
  app.use('/song', route);

  route.get(
    '/by-id/:id',
    celebrate({
      params: Joi.object({
        id: Joi.string().uuid(),
      }),
    }),
    async (req: Request, res: Response, next: NextFunction) => {
      const logger: Logger = Container.get('logger');
      logger.debug('Calling /song/by-id endpoint');
      try {
        const songServiceInstance = Container.get(SongService);
        const result: IBasicResponse = await songServiceInstance.songById(req.params.id);

        return res.status(200).json(result);
      } catch (e) {
        logger.error('🔥 error: %o', e);
        return next(e);
      }
    },
  );

  route.post(
    '/add',
    middlewares.checkAuth(),
    celebrate({
      body: Joi.object({
        eventId: Joi.string()
          .uuid()
          .required(),
        songSinger: Joi.string()
          .max(300)
          .required(),
        songName: Joi.string()
          .max(300)
          .required(),
        coverSinger: Joi.string()
          .max(300)
          .required(),
        voiceCount: Joi.number()
          .min(1)
          .required(),
        additionalTextInfo: Joi.string()
          .allow('')
          .max(500),
        youtubeVideoId: Joi.string()
          .allow('')
          .max(50),
      }),
    }),
    async (req: Request, res: Response, next: NextFunction) => {
      const logger: Logger = Container.get('logger');
      logger.debug('Calling /song/add endpoint');
      try {
        const songServiceInstance = Container.get(SongService);
        const result: IBasicResponse = await songServiceInstance.addSong(req.body, req.user as User);

        return res.status(200).json(result);
      } catch (e) {
        logger.error('🔥 error: %o', e);
        return next(e);
      }
    },
  );
};
