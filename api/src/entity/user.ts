import { Entity, PrimaryGeneratedColumn, Column, Unique, BaseEntity, BeforeInsert, BeforeUpdate } from 'typeorm';
import { Length, IsNotEmpty, IsEmail, IsNumber, IsString, IsEnum } from 'class-validator';
import argon2 from 'argon2';
import { randomBytes } from 'crypto';
import { Role, UserStatus } from '../interfaces/user';
import moment from 'moment';

@Entity()
@Unique(['email'])
export class User extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: true })
  @IsString()
  username: string;

  @Column()
  @Length(4, 100)
  @IsString()
  password: string;

  @Column()
  @IsEmail()
  email: string;

  @Column({
    type: 'enum',
    enum: Role,
    default: Role.User,
  })
  @IsEnum(Role)
  @IsNotEmpty()
  role: Role;

  @Column({ default: 0 })
  @IsNotEmpty()
  @IsNumber()
  voiceBalance: number;

  @Column()
  @IsString()
  @IsNotEmpty()
  salt: string;

  @Column({
    type: 'enum',
    enum: UserStatus,
    default: UserStatus.Active,
  })
  @IsEnum(UserStatus)
  @IsNotEmpty()
  status: UserStatus;

  @Column({ default: null, nullable: true })
  lastLogin: Date;

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

  async hashPassword() {
    const salt = randomBytes(32);
    this.password = await argon2.hash(this.password, { salt });
  }

  async checkIfUnencryptedPasswordIsValid(unencryptedPassword: string) {
    return await argon2.verify(this.password, unencryptedPassword);
  }
}
