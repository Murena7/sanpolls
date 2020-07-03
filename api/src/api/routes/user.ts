import { Router, Request, Response } from 'express';
import middlewares from '../middlewares';
const route = Router();

export default (app: Router) => {
  app.use('/users', route);

  route.get('/me', middlewares.checkAuth(), (req: Request, res: Response) => {
    return res.json({ user: req.currentUser }).status(200);
  });

  route.get('/test', middlewares.checkAuth(['admin']), (req: Request, res: Response) => {
    return res.json({ user: 'ok' }).status(200);
  });
};
