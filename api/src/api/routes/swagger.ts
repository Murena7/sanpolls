import { Router, Request, Response } from 'express';
import swaggerUi from 'swagger-ui-express';
import { swaggerDocument } from '../../swagger/swaggerDocument';
import { options } from '../../swagger/swaggerOptions';
const route = Router();

export default (app: Router) => {
  app.use('/swagger', route);
  route.use('/api-docs', swaggerUi.serve);
  route.get('/api-docs', swaggerUi.setup(swaggerDocument, options));
};
