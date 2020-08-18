///// SONG
import { getSongById } from '../../endpoints/song/getSongById';
import { postAddSong } from '../../endpoints/song/postAddSong';
import { postSongLike } from '../../endpoints/song/postSongLike';
import { getCommentsBySongId } from '../../endpoints/song/getCommentsBySongId';
import { addCommentBySongId } from '../../endpoints/song/addCommentBySongId';
import { editCommentByCommentId } from '../../endpoints/song/editCommentByCommentId';
import { deleteCommentByCommentId } from '../../endpoints/song/deleteCommentByCommentId';
import { getChildCommentsByCommentId } from '../../endpoints/song/getChildCommentsByCommentId';
import { addChildCommentByCommentId } from '../../endpoints/song/addChildCommentByCommentId';
import { editChildCommentByChildCommentId } from '../../endpoints/song/editChildCommentByChildCommentId';
import { deleteChildCommentByChildCommentId } from '../../endpoints/song/deleteChildCommentByChildCommentId';

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
  '/song/comments/{commentId}/like': {
    post: postSongLike,
  },
  '/song/comments/child/{childCommentId}/like': {
    post: postSongLike,
  },
  '/song/{songId}/comments': {
    get: getCommentsBySongId,
  },
  '/song/{songId}/comments/add': {
    post: addCommentBySongId,
  },
  '/song/comments/{commentId}/edit': {
    post: editCommentByCommentId,
  },
  '/song/comments/{commentId}/delete': {
    delete: deleteCommentByCommentId,
  },
  '/song/comments/{commentId}/child': {
    get: getChildCommentsByCommentId,
  },
  '/song/comments/{commentId}/child/add': {
    post: addChildCommentByCommentId,
  },
  '/song/comments/child/{childCommentId}/edit': {
    post: editChildCommentByChildCommentId,
  },
  '/song/comments/child/{childCommentId}/delete': {
    delete: deleteChildCommentByChildCommentId,
  },
};
