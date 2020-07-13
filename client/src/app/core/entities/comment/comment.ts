import { ILikeDislike } from '@core/entities/like-dislike/like-dislike.types';

export interface IComment {
  id: string;
  userId: string;
  eventId: string;
  songId: string;
  text: string;
  like: number;
  dislike: number;
  selfLike?: ILikeDislike;
  replyCount: number;
  createdAt: string;
  updatedAt: string;
}
