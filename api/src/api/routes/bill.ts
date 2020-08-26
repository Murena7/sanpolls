import { Router, Request, Response, NextFunction } from 'express';
import middlewares from '../middlewares';
import { IBasicResponse } from '../../interfaces/response-types';
import { Logger } from 'winston';
import { Container } from 'typedi';
import { User } from '../../entity';
import { celebrate, Joi } from 'celebrate';
import BillService from '../../services/bill';
const route = Router();

export default (app: Router) => {
  app.use('/bill', route);

  route.post(
    '/create',
    celebrate({
      body: Joi.object({
        payType: Joi.string().required(),
        amount: Joi.number().required(),
        currency: Joi.string().required(),
      }),
    }),
    middlewares.checkAuth(),
    async (req: Request, res: Response, next: NextFunction) => {
      const logger: Logger = Container.get('logger');
      logger.debug('Calling /bill/create endpoint');
      try {
        const billServiceInstance = Container.get(BillService);
        const result: IBasicResponse = await billServiceInstance.create(req.body, req.user as User);
        return res.status(200).json(result);
      } catch (e) {
        logger.error('🔥 error: %o', e);
        return next(e);
      }
    },
  );

  route.get(
    '/status/obmenka',
    celebrate({
      query: Joi.object({
        invoiceId: Joi.string().required(),
      }),
    }),
    async (req: Request, res: Response, next: NextFunction) => {
      const logger: Logger = Container.get('logger');
      logger.debug('Calling /bill/status/obmenka endpoint');
      try {
        const billServiceInstance = Container.get(BillService);

        const result: IBasicResponse = await billServiceInstance.getStatusObmenka({
          invoiceId: req.query.invoiceId,
        });

        return res.status(200).json(result);
      } catch (e) {
        logger.error('🔥 error: %o', e);
        return next(e);
      }
    },
  );

  route.get('/history', middlewares.checkAuth(), async (req: Request, res: Response, next: NextFunction) => {
    const logger: Logger = Container.get('logger');
    logger.debug('Calling /bill/history endpoint');
    try {
      const billServiceInstance = Container.get(BillService);

      const result: IBasicResponse = await billServiceInstance.getBillHistoryByUser(req.user as User);

      return res.status(200).json(result);
    } catch (e) {
      logger.error('🔥 error: %o', e);
      return next(e);
    }
  });

  route.delete(
    '/remove/:billId',
    celebrate({
      params: Joi.object({
        billId: Joi.string()
          .uuid()
          .required(),
      }),
    }),
    middlewares.checkAuth(),
    async (req: Request, res: Response, next: NextFunction) => {
      const logger: Logger = Container.get('logger');
      logger.debug('Calling /bill/delete endpoint');
      try {
        const billServiceInstance = Container.get(BillService);

        const result: IBasicResponse = await billServiceInstance.removeById(req.params.billId, req.user as User);

        return res.status(200).json(result);
      } catch (e) {
        logger.error('🔥 error: %o', e);
        return next(e);
      }
    },
  );
};
