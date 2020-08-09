///// SONG
import { getSongById } from '../../endpoints/song/getSongById';
import { postAddSong } from '../../endpoints/song/postAddSong';
import { postSongLike } from '../../endpoints/song/postSongLike';
import { getCommentsBySongId } from '../../endpoints/song/getCommentsBySongId';
import { addCommentBySongId } from '../../endpoints/song/addCommentBySongId';
import { editCommentByCommentId } from '../../endpoints/song/editCommentByCommentId';
import { deleteCommentByCommentId } from '../../endpoints/song/deleteCommentByCommentId';

export const songRoutes = {
  '/song/{id}': {
    get: getSongById,
  },
  '/song/add': {
    post: postAddSong,
  },
  '/song/{songId}/like': {
    post: postSongLike,
  },
  '/song/{songId}/comments': {
    get: getCommentsBySongId,
  },
  '/song/{songId}/comments/add': {
    post: addCommentBySongId,
  },
  '/song/{songId}/comments/{commentId}/edit': {
    post: editCommentByCommentId,
  },
  '/song/{songId}/comments/{commentId}/delete': {
    delete: deleteCommentByCommentId,
  },
};
