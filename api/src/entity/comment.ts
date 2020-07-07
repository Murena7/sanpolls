import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, BeforeInsert, BeforeUpdate } from 'typeorm';
import { IsNotEmpty, IsEmail, IsNumber, IsString } from 'class-validator';
import { LikeDislike } from './like-dislike';
import moment from 'moment';

@Entity()
export class Comment extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  @IsNotEmpty()
  userId: string;

  @Column()
  @IsNotEmpty()
  eventId: string;

  @Column()
  @IsNotEmpty()
  songId: string;

  @Column()
  @IsNotEmpty()
  @IsString()
  text: string;

  like: number;

  dislike: number;

  selfLike?: LikeDislike;

  @Column({ default: 0 })
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
