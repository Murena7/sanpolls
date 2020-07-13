import { ILikeDislike } from '@core/entities/like-dislike/like-dislike.types';

export interface IChildComment {
  id: string;
  commentId: string;
  text: string;
  like: number;
  dislike: number;
  selfLike?: ILikeDislike;
  createdAt: string;
  updatedAt: string;
}
