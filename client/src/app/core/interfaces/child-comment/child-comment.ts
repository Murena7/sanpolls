import { ILikeDislike } from '@core/interfaces/like-dislike/like-dislike.types';
import { IComment } from '@core/interfaces/comment/comment';
import {IUser} from '../user/user.types';

export interface IChildComment {
  id: string;
  userId: string;
  user?: IUser;
  commentId: string;
  comment?: IComment;
  text: string;
  likeCount: number;
  dislikeCount: number;
  selfLike?: ILikeDislike;
  createdAt: string;
  updatedAt: string;
}
