import { ILikeDislike } from '@core/entities/like-dislike/like-dislike.types';

export interface ISong {
  id: string;
  userId: string;
  eventId: string;
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
