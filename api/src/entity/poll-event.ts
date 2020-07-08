import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, BeforeInsert, BeforeUpdate } from 'typeorm';
import { EventStatus, EventType } from '../interfaces/poll-event';
import { Expose, Transform, Type } from 'class-transformer';
import moment from 'moment';

@Entity()
export class PollEvent extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar' })
  @Expose()
  name: string;

  @Column({ type: 'varchar' })
  @Expose()
  message: string;

  @Column({ type: 'varchar' })
  @Expose()
  endMessage: string;

  @Column({ type: 'timestamp' })
  @Expose()
  @Transform(value => new Date(value).toISOString())
  startDate: string;

  @Column({ type: 'timestamp' })
  @Expose()
  @Transform(value => new Date(value).toISOString())
  endDate: string;

  @Column({
    type: 'enum',
    enum: EventStatus,
    default: EventStatus.Inactive,
  })
  @Expose()
  status: EventStatus;

  @Column({
    type: 'enum',
    enum: EventType,
    default: EventType.Infinite,
  })
  @Expose()
  type: EventType;

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
