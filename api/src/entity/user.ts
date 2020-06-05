import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  Unique,
  CreateDateColumn,
  UpdateDateColumn,
  BaseEntity,
} from 'typeorm';
import { Length, IsNotEmpty, IsEmail } from 'class-validator';
import argon2 from 'argon2';
import { randomBytes } from 'crypto';

@Entity()
@Unique(['username'])
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @Length(4, 20)
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

  @Column()
  @IsNotEmpty()
  salt: string;

  @Column()
  @CreateDateColumn()
  createdAt: Date;

  @Column()
  @UpdateDateColumn()
  updatedAt: Date;

  @Column()
  lastLogin: Date;

  async hashPassword() {
    const salt = randomBytes(32);
    this.password = await argon2.hash(this.password, { salt });
  }

  async checkIfUnencryptedPasswordIsValid(unencryptedPassword: string) {
    return await argon2.verify(this.password, unencryptedPassword);
  }
}
