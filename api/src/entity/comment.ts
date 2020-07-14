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
import { PollEvent } from './poll-event';
import { Song } from './song';

@Entity()
export class Comment extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: true })
  userId: string;

  @OneToOne(type => User)
  @JoinColumn()
  user: User;

  @Column({ nullable: true })
  eventId: string;

  @OneToOne(type => PollEvent)
  @JoinColumn()
  event: PollEvent;

  @Column({ nullable: true })
  songId: string;

  @OneToOne(type => Song)
  @JoinColumn()
  song: Song;

  @Column({ type: 'varchar' })
  text: string;

  like: number;

  dislike: number;

  selfLike?: LikeDislike;

  @Column({ type: 'int', default: 0 })
  replyCount: number;

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
