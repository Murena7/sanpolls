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
    '/:id/comments',
    celebrate({
      query: Joi.object({
        skip: Joi.number(),
        take: Joi.number(),
      }),
      params: Joi.object({
        id: Joi.string()
          .uuid()
          .required(),
      }),
    }),
    async (req: Request, res: Response, next: NextFunction) => {
      const logger: Logger = Container.get('logger');
      logger.debug('Calling /song/comments/bySongId endpoint');
      try {
        const songServiceInstance = Container.get(SongService);

        const result: IBasicResponse = await songServiceInstance.getSongComments({
          skip: req.query.skip,
          take: req.query.take,
          id: req.params.id,
        });

        return res.status(200).json(result);
      } catch (e) {
        logger.error('🔥 error: %o', e);
        return next(e);
      }
    },
  );

  route.post(
    '/:id/comments/add',
    middlewares.checkAuth(),
    celebrate({
      body: Joi.object({
        commentText: Joi.string().required(),
      }),
      params: Joi.object({
        id: Joi.string()
          .uuid()
          .required(),
      }),
    }),
    async (req: Request, res: Response, next: NextFunction) => {
      const logger: Logger = Container.get('logger');
      logger.debug('Calling /song/comments/add endpoint');
      try {
        const songServiceInstance = Container.get(SongService);

        const result: IBasicResponse = await songServiceInstance.addSongComment(req.user as User, req.params.id, {
          commentText: req.body.commentText,
        });

        return res.status(200).json(result);
      } catch (e) {
        logger.error('🔥 error: %o', e);
        return next(e);
      }
    },
  );

  route.post(
    '/:songId/comments/:commentId/edit',
    middlewares.checkAuth(),
    celebrate({
      body: Joi.object({
        commentText: Joi.string().required(),
      }),
      params: Joi.object({
        songId: Joi.string()
          .uuid()
          .required(),
        commentId: Joi.string()
          .uuid()
          .required(),
      }),
    }),
    async (req: Request, res: Response, next: NextFunction) => {
      const logger: Logger = Container.get('logger');
      logger.debug('Calling /song/comments/edit endpoint');
      try {
        const songServiceInstance = Container.get(SongService);

        const result: IBasicResponse = await songServiceInstance.editSongComment(
          req.user as User,
          req.params.commentId,
          {
            commentText: req.body.commentText,
          },
        );

        return res.status(200).json(result);
      } catch (e) {
        logger.error('🔥 error: %o', e);
        return next(e);
      }
    },
  );

  route.delete(
    '/:songId/comments/:commentId/delete',
    middlewares.checkAuth(),
    celebrate({
      params: Joi.object({
        songId: Joi.string()
          .uuid()
          .required(),
        commentId: Joi.string()
          .uuid()
          .required(),
      }),
    }),
    async (req: Request, res: Response, next: NextFunction) => {
      const logger: Logger = Container.get('logger');
      logger.debug('Calling /song/comments/delete endpoint');
      try {
        const songServiceInstance = Container.get(SongService);

        const result: IBasicResponse = await songServiceInstance.deleteSongComment(
          req.user as User,
          req.params.commentId,
        );

        return res.status(200).json(result);
      } catch (e) {
        logger.error('🔥 error: %o', e);
        return next(e);
      }
    },
  );

  route.get(
    '/:id',
    celebrate({
      params: Joi.object({
        id: Joi.string()
          .uuid()
          .required(),
      }),
    }),
    async (req: Request, res: Response, next: NextFunction) => {
      const logger: Logger = Container.get('logger');
      logger.debug('Calling /song/by-id endpoint');
      try {
        const songServiceInstance = Container.get(SongService);
        const result: IBasicResponse = await songServiceInstance.songById(req.params.id, req.user as User);

        return res.status(200).json(result);
      } catch (e) {
        logger.error('🔥 error: %o', e);
        return next(e);
      }
    },
  );

  route.post(
    '/:songId/like',
    middlewares.checkAuth(),
    celebrate({
      params: Joi.object({
        songId: Joi.string()
          .uuid()
          .required(),
      }),
      body: Joi.object({
        likeId: Joi.string().uuid(),
        likeStatus: Joi.number()
          .min(0)
          .max(2),
      }),
    }),
    async (req: Request, res: Response, next: NextFunction) => {
      const logger: Logger = Container.get('logger');
      logger.debug('Calling /song/like endpoint');
      try {
        const songServiceInstance = Container.get(SongService);
        const result: IBasicResponse = await songServiceInstance.songLike(
          req.params.songId,
          req.body,
          req.user as User,
        );

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
