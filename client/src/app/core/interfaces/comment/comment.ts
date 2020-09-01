import { ILikeDislike } from '@core/interfaces/like-dislike/like-dislike.types';
import { IUser } from '@core/interfaces/user/user.types';
import { IPollEvent } from '@core/interfaces/poll-event/poll-event.types';
import { ISong } from '@core/interfaces/song/song.types';
import { IChildComment } from '../child-comment/child-comment';

export interface IComment {
  id: string;
  userId: string;
  user?: IUser;
  eventId: string;
  event?: IPollEvent;
  songId: string;
  song?: ISong;
  text: string;
  likeCount: number;
  dislikeCount: number;
  selfLike?: ILikeDislike;
  childCommentsCount: number;
  childComments?: IChildComment[];
  childLoaderFlag?: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface IDeleteCommentBody {
  commentId: string;
}

export interface IAddCommentReqBody {
  commentText: string;
}

export interface IEditCommentReqBody {
  commentText: string;
}

export interface IEditCommentBody {
  commentText: string;
  commentId: string;
}

export interface ITextAreaEmitBody {
  commentText: string;
}

export interface ILoadChildComment {
  commentId: string;
  index: number;
}

export interface IAddChildCommentBody {
  commentText: string;
  commentId: string;
  index: number;
}
