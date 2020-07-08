import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, BeforeInsert, BeforeUpdate } from 'typeorm';
import { LikeDislike } from './like-dislike';
import moment from 'moment';
import { Expose } from 'class-transformer';

@Entity()
export class Song extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'uuid' })
  @Expose()
  userId: string;

  @Column({ type: 'uuid' })
  @Expose()
  eventId: string;

  @Column({ type: 'varchar' })
  @Expose()
  songName: string;

  @Column({ type: 'varchar' })
  @Expose()
  singer: string;

  @Column({ type: 'int', default: 0 })
  @Expose()
  voiceCount: number;

  like: number;

  dislike: number;

  selfLike?: LikeDislike;

  @Column({ type: 'varchar', default: '' })
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
