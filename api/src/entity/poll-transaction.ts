import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, BaseEntity } from 'typeorm';
import { IsNotEmpty, IsEmail, IsNumber } from 'class-validator';
import { TransactionSource } from '../interfaces/poll-transaction';

@Entity()
export class PollTransaction extends BaseEntity {
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
  amount: number;

  @Column({
    type: 'enum',
    enum: TransactionSource,
  })
  @IsNotEmpty()
  source: TransactionSource;

  @Column()
  @CreateDateColumn()
  createdAt: Date;

  @Column()
  @UpdateDateColumn()
  updatedAt: Date;
}
