import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, BaseEntity } from 'typeorm';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

@Entity()
export class Song extends BaseEntity {
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

  @Column('int', { array: true })
  likes: string[];

  @Column('int', { array: true })
  dislike: string[];

  @Column({ default: '' })
  @IsNotEmpty()
  @IsString()
  additionalTextInfo: string;

  @Column({ default: null, nullable: true })
  youtubeVideoId: string;

  @Column()
  @CreateDateColumn()
  createdAt: Date;

  @Column()
  @UpdateDateColumn()
  updatedAt: Date;
}
