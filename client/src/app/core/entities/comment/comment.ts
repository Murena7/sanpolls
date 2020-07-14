import { ILikeDislike } from '@core/entities/like-dislike/like-dislike.types';
import { IUser } from '@core/entities/user/user.types';
import { IPollEvent } from '@core/entities/poll-event/poll-event.types';
import { ISong } from '@core/entities/song/song.types';

export interface IComment {
  id: string;
  userId: string;
  user?: IUser;
  eventId: string;
  event?: IPollEvent;
  songId: string;
  song?: ISong;
  text: string;
  like: number;
  dislike: number;
  selfLike?: ILikeDislike;
  replyCount: number;
  createdAt: string;
  updatedAt: string;
}
