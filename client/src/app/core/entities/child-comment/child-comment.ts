import { ILikeDislike } from '@core/entities/like-dislike/like-dislike.types';
import { IComment } from '@core/entities/comment/comment';

export interface IChildComment {
  id: string;
  commentId: string;
  comment?: IComment;
  text: string;
  like: number;
  dislike: number;
  selfLike?: ILikeDislike;
  createdAt: string;
  updatedAt: string;
}
