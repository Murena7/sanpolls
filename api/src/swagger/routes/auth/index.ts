//// AUTH Routes
import { signUp } from '../../endpoints/auth/signUp';
import { login } from '../../endpoints/auth/login';
import { logout } from '../../endpoints/auth/logout';
import { verificationUser } from '../../endpoints/auth/verification';
import { forgotPassword } from '../../endpoints/auth/forgotPassword';
import { resendVerificationUser } from '../../endpoints/auth/resendVerification';
import { facebookLogin } from '../../endpoints/auth/facebookLogin';
import { googleLogin } from '../../endpoints/auth/googleLogin';

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
  '/auth/verification': {
    post: verificationUser,
  },
  '/auth/forgot-password': {
    post: forgotPassword,
  },
  '/auth/resend-verification': {
    post: resendVerificationUser,
  },
  '/auth/facebook': {
    get: facebookLogin,
  },
  '/auth/google': {
    get: googleLogin,
  },
};
