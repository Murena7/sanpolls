import { LikeStatus } from './like-dislike';

export interface IAddSongBody {
  eventId: string;
  songSinger: string;
  songName: string;
  coverSinger: string;
  voiceCount: number;
  additionalTextInfo: string;
  youtubeVideoId: string;
}

export interface ISongLikeBody {
  likeId?: string;
  likeStatus: LikeStatus;
}

export interface IGetComments {
  skip?: string;
  take?: string;
  id: string;
}

export interface IAddEditCommentBody {
  commentText: string;
}
