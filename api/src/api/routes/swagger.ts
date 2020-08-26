import { Router, Request, Response } from 'express';
import swaggerUi from 'swagger-ui-express';
import { swaggerDocument } from '../../swagger/swaggerDocument';
import { options } from '../../swagger/swaggerOptions';
import middlewares from '../middlewares';
import { Role } from '../../interfaces/user';
const route = Router();

export default (app: Router) => {
  app.use('/swagger', route);
  route.use('/api-docs', swaggerUi.serve);
  route.get('/api-docs', middlewares.checkAuth([Role.Admin]), swaggerUi.setup(swaggerDocument, options));
};
