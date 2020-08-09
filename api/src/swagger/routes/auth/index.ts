//// AUTH Routes
import {signUp} from '../../endpoints/auth/signUp';
import {login} from '../../endpoints/auth/login';
import {logout} from '../../endpoints/auth/logout';

export const authRoutes = {
  '/auth/sign-up': {
    post: signUp,
  },
  '/auth/login': {
    post: login,
  },
  '/auth/logout': {
    post: logout,
  },
};
