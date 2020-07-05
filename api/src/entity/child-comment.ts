import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, BaseEntity } from 'typeorm';
import { IsNotEmpty, IsEmail, IsNumber, IsString } from 'class-validator';

@Entity()
export class ChildComment extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  @IsNotEmpty()
  @IsNumber()
  commentId: string;

  @Column()
  @IsNotEmpty()
  @IsString()
  text: string;

  @Column('simple-array')
  likes: string[];

  @Column('simple-array')
  dislike: string[];

  @Column()
  @CreateDateColumn()
  createdAt: Date;

  @Column()
  @UpdateDateColumn()
  updatedAt: Date;
}
