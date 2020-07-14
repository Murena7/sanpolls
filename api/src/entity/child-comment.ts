import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  BeforeInsert,
  BeforeUpdate,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { LikeDislike } from './like-dislike';
import moment from 'moment';
import { User } from './user';
import { Comment } from './comment';

@Entity()
export class ChildComment extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: true })
  commentId: string;

  @OneToOne(type => Comment)
  @JoinColumn()
  comment: Comment;

  @Column({ type: 'varchar' })
  text: string;

  like: number;

  dislike: number;

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
