import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, BeforeInsert, BeforeUpdate } from 'typeorm';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { LikeDislike } from './like-dislike';
import moment from 'moment';

@Entity()
export class Song extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  @IsString()
  @IsNotEmpty()
  userId: string;

  @Column()
  @IsString()
  @IsNotEmpty()
  eventId: string;

  @Column()
  @IsNotEmpty()
  @IsString()
  songName: string;

  @Column()
  @IsNotEmpty()
  @IsString()
  singer: string;

  @Column({ default: 0 })
  @IsNotEmpty()
  @IsNumber()
  voiceCount: number;

  like: number;

  dislike: number;

  selfLike?: LikeDislike;

  @Column({ default: '' })
  @IsNotEmpty()
  @IsString()
  additionalTextInfo: string;

  @Column({ default: null, nullable: true })
  @IsString()
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
