import { ILikeDislike } from '@core/entities/like-dislike/like-dislike.types';
import { IUser } from '@core/entities/user/user.types';
import { IPollEvent } from '@core/entities/poll-event/poll-event.types';

export interface ISong {
  id: string;
  userId: string;
  user?: IUser;
  eventId: string;
  event?: IPollEvent;
  songSinger: string;
  songName: string;
  coverSinger: string;
  voiceCount: number;
  like: number;
  dislike: number;
  selfLike?: ILikeDislike;
  additionalTextInfo: string;
  youtubeVideoId: string;
  createdAt: string;
  updatedAt: string;
}
