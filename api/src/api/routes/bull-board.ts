import { Router } from 'express';
import basicAuth from 'express-basic-auth';
import config from '../../config';
import { UI } from 'bull-board';
import middlewares from '../middlewares';
import { Role } from '../../interfaces/user';

export default (app: Router) => {
  app.use(
    '/bull',
    middlewares.checkAuth([Role.Admin]),
    basicAuth({
      users: {
        [config.bullBoard.user]: config.bullBoard.password,
      },
      challenge: true,
    }),
    UI,
  );
};
