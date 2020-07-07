import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, BeforeInsert, BeforeUpdate } from 'typeorm';
import { IsNotEmpty, IsEmail, IsNumber, IsString, IsEnum } from 'class-validator';
import { TransactionSource } from '../interfaces/poll-transaction';
import moment from 'moment';

@Entity()
export class PollTransaction extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  @IsString()
  @IsNotEmpty()
  userId: string;

  @Column()
  @IsString()
  @IsNotEmpty()
  eventId: string;

  @Column()
  @IsString()
  @IsNotEmpty()
  songId: string;

  @Column()
  @IsNumber()
  @IsNotEmpty()
  amount: number;

  @Column({
    type: 'enum',
    enum: TransactionSource,
  })
  @IsEnum(TransactionSource)
  @IsNotEmpty()
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
