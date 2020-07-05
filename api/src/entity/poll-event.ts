import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, BaseEntity } from 'typeorm';
import { IsNotEmpty, IsEmail, IsNumber, IsString, IsDate } from 'class-validator';
import { EventStatus, EventType } from '../interfaces/poll-event';

@Entity()
export class PollEvent extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  @IsNotEmpty()
  @IsString()
  name: string;

  @Column()
  @IsNotEmpty()
  @IsString()
  message: string;

  @Column()
  @IsNotEmpty()
  @IsString()
  endMessage: string;

  @Column()
  @IsDate()
  startDate: Date;

  @Column()
  @IsDate()
  endDate: Date;

  @Column({
    type: 'enum',
    enum: EventStatus,
    default: EventStatus.Inactive,
  })
  @IsNotEmpty()
  status: EventStatus;

  @Column({
    type: 'enum',
    enum: EventType,
    default: EventType.Infinite,
  })
  @IsNotEmpty()
  type: EventType;

  @Column()
  @CreateDateColumn()
  createdAt: Date;

  @Column()
  @UpdateDateColumn()
  updatedAt: Date;
}
