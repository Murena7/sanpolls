import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, BeforeInsert, BeforeUpdate } from 'typeorm';
import { IsBoolean, IsEnum, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { ParentType } from '../interfaces/like-dislike';
import moment from 'moment';

@Entity()
export class LikeDislike extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  @IsString()
  @IsNotEmpty()
  userId: string;

  @Column()
  @IsString()
  @IsNotEmpty()
  parentId: string;

  @Column({
    type: 'enum',
    enum: ParentType,
  })
  @IsEnum(ParentType)
  @IsNotEmpty()
  parentType: ParentType;

  @Column()
  @IsNotEmpty()
  @IsBoolean()
  isLike: boolean;

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
