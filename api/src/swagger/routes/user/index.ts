//// USER Routes
import {getMe} from '../../endpoints/user/getMe';
import {postUserProfileUpdate} from '../../endpoints/user/postUserProfileUpdate';
import {postUserPasswordChange} from '../../endpoints/user/postUserPasswordChange';
import {getUserSongHistory} from '../../endpoints/user/getUserSongHistory';

export const userRoutes = {
  '/user/me': {
    get: getMe,
  },
  '/user/profile/update': {
    post: postUserProfileUpdate,
  },
  '/user/password/change': {
    post: postUserPasswordChange,
  },
  '/user/song/history': {
    get: getUserSongHistory,
  },
};
