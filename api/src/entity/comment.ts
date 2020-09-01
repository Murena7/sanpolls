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
import { User } from './user';
import { PollEvent } from './poll-event';
import { Song } from './song';
import { OneToMany } from 'typeorm/index';
import { ChildComment } from './child-comment';

@Entity()
export class Comment extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: true })
  userId: string;

  @ManyToOne(type => User, { onDelete: 'CASCADE' })
  @JoinColumn()
  user: User;

  @Column({ nullable: true })
  eventId: string;

  @ManyToOne(type => PollEvent)
  @JoinColumn()
  event: PollEvent;

  @Column({ nullable: true })
  songId: string;

  @ManyToOne(type => Song)
  @JoinColumn()
  song: Song;

  @Column({ type: 'varchar' })
  text: string;

  @OneToMany(
    type => ChildComment,
    childComment => childComment.comment,
  )
  childComments: ChildComment[];

  childCommentsCount: number;

  @OneToMany(
    type => LikeDislike,
    likeDislike => likeDislike.commentLikeDislike,
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
