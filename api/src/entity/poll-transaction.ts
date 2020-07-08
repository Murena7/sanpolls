import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, BeforeInsert, BeforeUpdate } from 'typeorm';
import { TransactionSource } from '../interfaces/poll-transaction';
import moment from 'moment';
import { Expose } from 'class-transformer';

@Entity()
export class PollTransaction extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'uuid' })
  @Expose()
  userId: string;

  @Column({ type: 'uuid', nullable: true })
  @Expose()
  eventId: string;

  @Column({ type: 'uuid', nullable: true })
  @Expose()
  songId: string;

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
