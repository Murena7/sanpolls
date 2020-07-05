import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, BaseEntity } from 'typeorm';
import { IsNotEmpty, IsEmail, IsNumber, IsString } from 'class-validator';

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

  @Column('simple-array')
  likes: string[];

  @Column('simple-array')
  dislike: string[];

  @Column({ default: 0 })
  replyCount: number;

  @Column()
  @CreateDateColumn()
  createdAt: Date;

  @Column()
  @UpdateDateColumn()
  updatedAt: Date;
}
