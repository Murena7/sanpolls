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
import { TransactionSource } from '../interfaces/poll-transaction';
import moment from 'moment';
import { Expose } from 'class-transformer';
import { User } from './user';
import { PollEvent } from './poll-event';
import { Song } from './song';

@Entity()
export class PollTransaction extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: true })
  @Expose()
  userId: string;

  @ManyToOne(type => User)
  @JoinColumn()
  user: User;

  @Column({ nullable: true })
  @Expose()
  eventId: string;

  @ManyToOne(type => PollEvent)
  @JoinColumn()
  event: PollEvent;

  @Column({ nullable: true })
  @Expose()
  songId: string;

  @ManyToOne(type => Song)
  @JoinColumn()
  song: Song;

  @Column({ type: 'int' })
  @Expose()
  amount: number;

  @Column({
    type: 'enum',
    enum: TransactionSource,
  })
  @Expose()
  source: TransactionSource;

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
