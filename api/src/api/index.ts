import { Router } from 'express';
import auth from './routes/auth';
import user from './routes/user';
import agendash from './routes/bull-board';
import swagger from './routes/swagger';
import poll from './routes/poll';
import song from './routes/song';
import vote from './routes/vote';
import admin from './routes/admin';

// guaranteed to get dependencies
export default () => {
  const app = Router();
  auth(app);
  user(app);
  poll(app);
  agendash(app);
  swagger(app);
  song(app);
  vote(app);
  admin(app);

  return app;
};
