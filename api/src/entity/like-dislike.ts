import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  BeforeInsert,
  BeforeUpdate,
  JoinColumn,
  ManyToOne,
} from 'typeorm';
import { ParentType } from '../interfaces/like-dislike';
import moment from 'moment';
import { User } from './user';
import { Song } from './song';
import { Comment } from './comment';
import { ChildComment } from './child-comment';

@Entity()
export class LikeDislike extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: true })
  userId: string;

  @ManyToOne(type => User)
  @JoinColumn()
  user: User;

  @Column({ type: 'uuid' })
  parentId: string;

  @Column({
    type: 'enum',
    enum: ParentType,
  })
  parentType: ParentType;

  @ManyToOne(
    type => Song,
    song => song.likeDislike,
    { onDelete: 'CASCADE' },
  )
  @JoinColumn()
  songLikeDislike: Song;

  @ManyToOne(
    type => Comment,
    comment => comment.likeDislike,
    { onDelete: 'CASCADE' },
  )
  commentLikeDislike: Comment;

  @ManyToOne(
    type => ChildComment,
    childComment => childComment.likeDislike,
    { onDelete: 'CASCADE' },
  )
  childCommentLikeDislike: ChildComment;

  @Column({ type: 'boolean' })
  isLike: boolean;

  @Column({ type: 'timestamp' })
  createdAt: string;

  @Column({ type: 'timestamp' })
  updatedAt: string;

  @BeforeInsert()
  public beforeInsert() {
    const timeNowUTC = moment.utc().toISOString();
    this.createdAt = timeNowUTC;
    this.updatedAt = timeNowUTC;
  }

  @BeforeUpdate()
  public beforeUpdate() {
    const timeNowUTC = moment.utc().toISOString();
    this.updatedAt = timeNowUTC;
  }
}
