import { ILikeDislike, LikeStatus } from '@core/interfaces/like-dislike/like-dislike.types';
import { IUser } from '@core/interfaces/user/user.types';
import { IPollEvent } from '@core/interfaces/poll-event/poll-event.types';

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

export interface ICommentReqLikeBody {
  likeId?: string;
  likeStatus: LikeStatus;
}

export interface ICommentLikeBody {
  likeStatus: LikeStatus;
  index: number;
}

export interface IChildCommentLikeBody {
  likeStatus: LikeStatus;
  index?: number;
  childIndex?: number;
}

export interface IChildCommentReqLikeBody {
  likeId?: string;
  likeStatus: LikeStatus;
}

export interface IGetCommentBySongIdParams {
  take: number;
  skip: number;
}
