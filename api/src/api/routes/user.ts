import { Router, Request, Response } from 'express';
import middlewares from '../middlewares';
const route = Router();

export default (app: Router) => {
  app.use('/user', route);

  route.get('/me', middlewares.checkAuth(), (req: Request, res: Response) => {
    const user = { ...req.user };
    Reflect.deleteProperty(user, 'password');
    Reflect.deleteProperty(user, 'salt');
    return res.json({ data: user }).status(200);
  });
};
