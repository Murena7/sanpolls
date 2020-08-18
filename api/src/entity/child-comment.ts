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
import { User } from './user';

@Entity()
export class ChildComment extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: true })
  userId: string;

  @ManyToOne(type => User)
  @JoinColumn()
  user: User;

  @Column({ nullable: true })
  commentId: string;

  @ManyToOne(
    type => Comment,
    comment => comment.childComments,
    { onDelete: 'CASCADE' },
  )
  @JoinColumn()
  comment: Comment;

  @Column({ type: 'varchar' })
  text: string;

  @OneToMany(
    type => LikeDislike,
    likeDislike => likeDislike.childCommentLikeDislike,
  )
  @JoinColumn()
  likeDislike: LikeDislike[];

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
