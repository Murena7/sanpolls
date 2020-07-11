import { login, logout, signUp } from './auth/auth';
import { getMe } from './user/user';
import { getActivePoll, getRatingList } from './poll/poll';
import { postAddVoice, postPollCreate, putUserToAdmin } from './admin/admin';
import { getSongById, postAddSong } from './song/song';
import { postGiveVote } from './vote/vote';

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
    '/poll/rating-list': {
      get: getRatingList,
    },
    ///// ADMIN
    '/admin/user/{userId}/user-to-admin': {
      put: putUserToAdmin,
    },
    '/admin/user/add-voice': {
      post: postAddVoice,
    },
    '/admin/poll/create': {
      post: postPollCreate,
    },
    ///// SONG
    '/song/by-id/{id}': {
      get: getSongById,
    },
    '/song/add': {
      post: postAddSong,
    },
    ///// VOTE
    '/vote/give': {
      post: postGiveVote,
    },
  },
};
