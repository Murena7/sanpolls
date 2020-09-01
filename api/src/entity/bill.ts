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
import moment from 'moment';
import { Expose } from 'class-transformer';
import { User } from './user';
import { PayType, Status } from '../interfaces/bill';

@Entity()
export class Bill extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  @Expose()
  userId: string;

  @ManyToOne(type => User, { onDelete: 'CASCADE' })
  @JoinColumn()
  user: User;

  @Column({
    type: 'enum',
    enum: PayType,
  })
  payType: PayType;

  @Column({
    type: 'enum',
    enum: Status,
  })
  status: Status;

  @Column({ type: 'double precision' })
  @Expose()
  amount: number;

  @Column()
  @Expose()
  currency: string;

  @Column({ nullable: true })
  description: string;

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
