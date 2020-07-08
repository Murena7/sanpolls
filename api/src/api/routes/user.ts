import { Router, Request, Response } from 'express';
import middlewares from '../middlewares';
import { IBasicResponse } from '../../interfaces/response-types';
import { Logger } from 'winston';
import { Container } from 'typedi';
const route = Router();

export default (app: Router) => {
  app.use('/user', route);

  route.get('/me', middlewares.checkAuth(), (req: Request, res: Response) => {
    const logger: Logger = Container.get('logger');
    logger.debug('Calling /user/me endpoint');

    const user = { ...req.user };
    Reflect.deleteProperty(user, 'password');
    Reflect.deleteProperty(user, 'salt');
    const apiResponse: IBasicResponse = { data: user };
    return res.json(apiResponse).status(200);
  });
};
