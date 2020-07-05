import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  Unique,
  CreateDateColumn,
  UpdateDateColumn,
  BaseEntity,
} from 'typeorm';
import { Length, IsNotEmpty, IsEmail, IsNumber } from 'class-validator';
import argon2 from 'argon2';
import { randomBytes } from 'crypto';
import { UserStatus } from '../interfaces/user';

@Entity()
@Unique(['email'])
export class User extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ default: null, nullable: true })
  username: string;

  @Column()
  @Length(4, 100)
  password: string;

  @Column()
  @IsEmail()
  email: string;

  @Column()
  @IsNotEmpty()
  role: string;

  @Column({ default: 0 })
  @IsNumber()
  voiceBalance: number;

  @Column()
  @IsNotEmpty()
  salt: string;

  @Column({
    type: 'enum',
    enum: UserStatus,
    default: UserStatus.Active,
  })
  @IsNotEmpty()
  status: UserStatus;

  @Column()
  @CreateDateColumn()
  createdAt: Date;

  @Column()
  @UpdateDateColumn()
  updatedAt: Date;

  @Column({ default: null, nullable: true })
  lastLogin: Date;

  async hashPassword() {
    const salt = randomBytes(32);
    this.password = await argon2.hash(this.password, { salt });
  }

  async checkIfUnencryptedPasswordIsValid(unencryptedPassword: string) {
    return await argon2.verify(this.password, unencryptedPassword);
  }
}
