import { IUser } from '@core/entities/user/user.types';

export interface ILikeDislike {
  id: string;
  userId: string;
  user?: IUser;
  parentId: string;
  parentType: ParentType;
  isLike: boolean;
  createdAt: string;
  updatedAt: string;
}

export enum ParentType {
  Song = 'song',
  Comment = 'comment',
  ChildComment = 'child-comment',
}

export enum LikeStatus {
  unset,
  like,
  dislike,
}
