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
import { Expose } from 'class-transformer';
import { User } from './user';
import { PollEvent } from './poll-event';
import { OneToMany } from 'typeorm/index';

@Entity()
export class Song extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: true })
  @Expose()
  userId: string;

  @ManyToOne(type => User, { onDelete: 'CASCADE' })
  @JoinColumn()
  user: User;

  @Column({ nullable: true })
  @Expose()
  eventId: string;

  @ManyToOne(type => PollEvent)
  @JoinColumn()
  event: PollEvent;

  @Column({ type: 'varchar' })
  @Expose()
  songSinger: string;

  @Column({ type: 'varchar' })
  @Expose()
  songName: string;

  @Column({ type: 'varchar' })
  @Expose()
  coverSinger: string;

  @Column({ type: 'int', default: 0 })
  @Expose()
  voiceCount: number;

  @OneToMany(
    type => LikeDislike,
    likeDislike => likeDislike.songLikeDislike,
  )
  likeDislike: LikeDislike[];

  likeCount: number;
  dislikeCount: number;
  selfLike?: LikeDislike;
  ratingPosition: number;

  @Column({ type: 'varchar', default: '', nullable: true })
  @Expose()
  additionalTextInfo: string;

  @Column({ type: 'varchar', default: null, nullable: true })
  @Expose()
  youtubeVideoId: string;

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
