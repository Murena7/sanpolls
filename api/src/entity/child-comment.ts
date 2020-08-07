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
import { LikeDislike } from './like-dislike';
import moment from 'moment';
import { Comment } from './comment';
import { OneToMany } from 'typeorm/index';

@Entity()
export class ChildComment extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: true })
  commentId: string;

  @ManyToOne(type => Comment)
  @JoinColumn()
  comment: Comment;

  @Column({ type: 'varchar' })
  text: string;

  @OneToMany(
    type => LikeDislike,
    likeDislike => likeDislike.childCommentLike,
  )
  @JoinColumn()
  like: LikeDislike[];

  @OneToMany(
    type => LikeDislike,
    likeDislike => likeDislike.childCommentDislike,
  )
  @JoinColumn()
  dislike: LikeDislike[];

  likeCount: number;
  dislikeCount: number;
  selfLike?: LikeDislike;

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
