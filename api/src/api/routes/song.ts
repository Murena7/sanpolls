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

        const result: IBasicResponse = await songServiceInstance.getSongComments(
          {
            skip: req.query.skip,
            take: req.query.take,
            id: req.params.id,
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
    '/comments/:commentId/child',
    celebrate({
      query: Joi.object({
        skip: Joi.number(),
        take: Joi.number(),
      }),
      params: Joi.object({
        commentId: Joi.string()
          .uuid()
          .required(),
      }),
    }),
    async (req: Request, res: Response, next: NextFunction) => {
      const logger: Logger = Container.get('logger');
      logger.debug('Calling /song/comments/cild endpoint');
      try {
        const songServiceInstance = Container.get(SongService);

        const result: IBasicResponse = await songServiceInstance.getSongChildComments(
          {
            skip: req.query.skip,
            take: req.query.take,
            commentId: req.params.commentId,
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

  route.post(
    '/:id/comments/add',
    middlewares.checkAuth(),
    celebrate({
      body: Joi.object({
        commentText: Joi.string()
          .required()
          .max(1000),
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
    '/comments/:commentId/child/add',
    middlewares.checkAuth(),
    celebrate({
      body: Joi.object({
        commentText: Joi.string()
          .required()
          .max(1000),
      }),
      params: Joi.object({
        commentId: Joi.string()
          .uuid()
          .required(),
      }),
    }),
    async (req: Request, res: Response, next: NextFunction) => {
      const logger: Logger = Container.get('logger');
      logger.debug('Calling /song/comments/child/add endpoint');
      try {
        const songServiceInstance = Container.get(SongService);

        const result: IBasicResponse = await songServiceInstance.addSongChildComment(
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

  route.post(
    '/comments/:commentId/edit',
    middlewares.checkAuth(),
    celebrate({
      body: Joi.object({
        commentText: Joi.string().required(),
      }),
      params: Joi.object({
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

  route.post(
    '/comments/child/:childCommentId/edit',
    middlewares.checkAuth(),
    celebrate({
      body: Joi.object({
        commentText: Joi.string().required(),
      }),
      params: Joi.object({
        childCommentId: Joi.string()
          .uuid()
          .required(),
      }),
    }),
    async (req: Request, res: Response, next: NextFunction) => {
      const logger: Logger = Container.get('logger');
      logger.debug('Calling /song/comments/child/edit endpoint');
      try {
        const songServiceInstance = Container.get(SongService);

        const result: IBasicResponse = await songServiceInstance.editSongChildComment(
          req.user as User,
          req.params.childCommentId,
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
    '/comments/:commentId/delete',
    middlewares.checkAuth(),
    celebrate({
      params: Joi.object({
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

  route.delete(
    '/comments/child/:childCommentId/delete',
    middlewares.checkAuth(),
    celebrate({
      params: Joi.object({
        childCommentId: Joi.string()
          .uuid()
          .required(),
      }),
    }),
    async (req: Request, res: Response, next: NextFunction) => {
      const logger: Logger = Container.get('logger');
      logger.debug('Calling /song/comments/child/delete endpoint');
      try {
        const songServiceInstance = Container.get(SongService);

        const result: IBasicResponse = await songServiceInstance.deleteSongChildComment(
          req.user as User,
          req.params.childCommentId,
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
    '/comments/:commentId/like',
    middlewares.checkAuth(),
    celebrate({
      params: Joi.object({
        commentId: Joi.string()
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
      logger.debug('Calling /song/comment/like endpoint');
      try {
        const songServiceInstance = Container.get(SongService);
        const result: IBasicResponse = await songServiceInstance.commentLike(
          req.params.commentId,
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
    '/comments/child/:childCommentId/like',
    middlewares.checkAuth(),
    celebrate({
      params: Joi.object({
        childCommentId: Joi.string()
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
      logger.debug('Calling /song/comment/child/like endpoint');
      try {
        const songServiceInstance = Container.get(SongService);
        const result: IBasicResponse = await songServiceInstance.childCommentLike(
          req.params.childCommentId,
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
          .allow(['', null])
          .max(500),
        youtubeVideoId: Joi.string()
          .allow(['', null])
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
