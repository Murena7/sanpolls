import { Router } from 'express';
import basicAuth from 'express-basic-auth';
import config from '../../config';
import { UI } from 'bull-board';

export default (app: Router) => {
  app.use(
    '/bull',
    basicAuth({
      users: {
        [config.bullBoard.user]: config.bullBoard.password,
      },
      challenge: true,
    }),
    UI,
  );
};
