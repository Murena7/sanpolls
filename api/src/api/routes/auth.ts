import { Router, Request, Response, NextFunction } from 'express';
import { Container } from 'typedi';
import AuthService from '../../services/auth';
import middlewares from '../middlewares';
import { celebrate, Joi } from 'celebrate';
import { Logger } from 'winston';
import passport from 'passport';
import { IBasicResponse } from '../../interfaces/response-types';
import { ResponseStatusMessage } from '../../interfaces/response';

const route = Router();

export default (app: Router) => {
  app.use('/auth', route);

  route.post(
    '/sign-up',
    celebrate({
      body: Joi.object({
        email: Joi.string()
          .email()
          .required(),
        password: Joi.string()
          .max(150)
          .required(),
      }),
    }),
    async (req: Request, res: Response, next: NextFunction) => {
      const logger: Logger = Container.get('logger');
      logger.debug('Calling Sign-Up endpoint with body: %o', req.body);
      try {
        const authServiceInstance = Container.get(AuthService);

        await authServiceInstance.SignUp(req.body);

        const apiResponse: IBasicResponse = { status: ResponseStatusMessage.Success };

        return res.status(201).json(apiResponse);
      } catch (e) {
        logger.error('🔥 error: %o', e);
        return next(e);
      }
    },
  );

  route.post(
    '/login',
    celebrate({
      body: Joi.object({
        email: Joi.string()
          .email()
          .required(),
        password: Joi.string()
          .max(150)
          .required(),
      }),
    }),
    passport.authenticate('local', { failWithError: true }),
    async (req: Request, res: Response, next: NextFunction) => {
      const logger: Logger = Container.get('logger');
      logger.debug('Calling login endpoint with body: %o', req.body);
      try {
        const user = req.user;
        const apiResponse: IBasicResponse = { data: user };
        return res.json(apiResponse).status(200);
      } catch (e) {
        logger.error('🔥 error: %o', e);
        return next(e);
      }
    },
  );

  /**
   * @TODO Let's leave this as a place holder for now
   * The reason for a logout route could be deleting a 'push notification token'
   * so the device stops receiving push notifications after logout.
   *
   * Another use case for advance/enterprise apps, you can store a record of the jwt token
   * emitted for the session and add it to a black list.
   * It's really annoying to develop that but if you had to, please use Redis as your data store
   */
  route.post('/logout', middlewares.checkAuth(), (req: Request, res: Response, next: NextFunction) => {
    const logger: Logger = Container.get('logger');
    logger.debug('Calling Sign-Out endpoint with body: %o', req.body);
    try {
      //@TODO AuthService.Logout(req.user) do some clever stuff
      //PassportJS Logout
      req.logout();
      const apiResponse: IBasicResponse = { status: ResponseStatusMessage.Success };
      return res.status(200).json(apiResponse);
    } catch (e) {
      logger.error('🔥 error %o', e);
      return next(e);
    }
  });
};
