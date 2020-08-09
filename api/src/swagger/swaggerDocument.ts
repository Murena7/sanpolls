import { authRoutes } from './routes/auth';
import { userRoutes } from './routes/user';
import { pollRoutes } from './routes/poll';
import { adminRoutes } from './routes/admin';
import { songRoutes } from './routes/song';
import { voteRoutes } from './routes/vote';

export const swaggerDocument = {
  openapi: '3.0.1',
  info: {
    version: '1.0.0',
    title: 'SanSan APIs Document',
    description: 'SanSan Site Api Description',
    termsOfService: '',
    contact: {
      name: 'SanSan',
      email: 'san.san.music@gmail.com',
      url: 'https://sansan.co',
    },
    license: {
      name: 'Apache 2.0',
      url: 'https://www.apache.org/licenses/LICENSE-2.0.html',
    },
  },
  servers: [{ url: '/api' }],
  // components: {
  //   securitySchemes: {
  //     cookieAuth: {
  //       type: 'apiKey',
  //       in: 'cookie',
  //       name: 'JSESSIONID',
  //       flows: {
  //         authorizationCode: {
  //           scopes: {
  //             admin: 'Grants access to admin operations',
  //           },
  //         },
  //       },
  //     },
  //   },
  // },
  // security: [{ cookieAuth: ['admin'] }],
  paths: {
    ...authRoutes,
    ...userRoutes,
    ...pollRoutes,
    ...adminRoutes,
    ...songRoutes,
    ...voteRoutes,
  },
};
