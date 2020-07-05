import { login, logout, signUp } from './auth/auth';
import { getMe } from './user/user';
import { getActivePoll } from './poll/poll';

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
  tags: [
    {
      name: 'Auth',
    },
  ],
  paths: {
    //// AUTH Routes
    '/auth/sign-up': {
      post: signUp,
    },
    '/auth/login': {
      post: login,
    },
    '/auth/logout': {
      post: logout,
    },
    //// USER Routes
    '/user/me': {
      get: getMe,
    },
    //// POLL Routes
    '/poll/active': {
      get: getActivePoll,
    },
  },
};
