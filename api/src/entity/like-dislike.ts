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
import { ParentType } from '../interfaces/like-dislike';
import moment from 'moment';
import { User } from './user';

@Entity()
export class LikeDislike extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: true })
  userId: string;

  @OneToOne(type => User)
  @JoinColumn()
  user: User;

  @Column({ type: 'uuid' })
  parentId: string;

  @Column({
    type: 'enum',
    enum: ParentType,
  })
  parentType: ParentType;

  @Column({ type: 'boolean' })
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
