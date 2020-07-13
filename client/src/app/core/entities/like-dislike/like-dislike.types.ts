export interface ILikeDislike {
  id: string;
  userId: string;
  parentId: string;
  parentType: ParentType;
  isLike: boolean;
  createdAt: string;
  updatedAt: string;
}

export enum ParentType {
  Song = 'song',
  Comment = 'comment',
  ChildComment = 'child-comment'
}
