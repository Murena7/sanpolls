import { Router, Request, Response, NextFunction } from 'express';
import { Container } from 'typedi';
import { Logger } from 'winston';
import PollService from '../../services/poll';

const route = Router();

export default (app: Router) => {
  app.use('/poll', route);

  route.get('/active', async (req: Request, res: Response, next: NextFunction) => {
    const logger: Logger = Container.get('logger');
    logger.debug('Calling /poll/active endpoint');
    try {
      const pollServiceInstance = Container.get(PollService);

      const result = await pollServiceInstance.activePoll({ skipCount: req.query.skip, takeCount: req.query.take });

      return res.status(200).json(result);
    } catch (e) {
      logger.error('🔥 error: %o', e);
      return next(e);
    }
  });
};
