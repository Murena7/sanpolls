import { ILikeDislike, LikeStatus } from '@core/entities/like-dislike/like-dislike.types';
import { IUser } from '@core/entities/user/user.types';
import { IPollEvent } from '@core/entities/poll-event/poll-event.types';

export interface ISong {
  id: string;
  userId?: string;
  user?: IUser;
  eventId: string;
  event?: IPollEvent;
  ratingPosition?: number;
  songSinger: string;
  songName: string;
  coverSinger: string;
  voiceCount: number;
  likeCount: number;
  dislikeCount: number;
  selfLike?: ILikeDislike;
  additionalTextInfo: string;
  youtubeVideoId: string;
  createdAt: string;
  updatedAt: string;
}

export interface IGiveVoiceBody {
  songId: string;
  voiceCount: number;
}

export interface ICreateSong {
  eventId: string;
  songSinger: string;
  songName: string;
  coverSinger: string;
  youtubeVideoId: string;
  additionalTextInfo: string;
  voiceCount: number;
}

export interface ISongLikeBody {
  likeId?: string;
  likeStatus: LikeStatus;
}
