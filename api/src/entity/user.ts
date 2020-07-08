import { Entity, PrimaryGeneratedColumn, Column, Unique, BaseEntity, BeforeInsert, BeforeUpdate } from 'typeorm';
import argon2 from 'argon2';
import { randomBytes } from 'crypto';
import { Role, UserStatus } from '../interfaces/user';
import moment from 'moment';

@Entity()
@Unique(['email'])
export class User extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', nullable: true })
  username: string;

  @Column({ type: 'varchar' })
  password: string;

  @Column({ type: 'varchar' })
  email: string;

  @Column({
    type: 'enum',
    enum: Role,
    default: Role.User,
  })
  role: Role;

  @Column({ type: 'int', default: 0 })
  voiceBalance: number;

  @Column({ type: 'varchar' })
  salt: string;

  @Column({
    type: 'enum',
    enum: UserStatus,
    default: UserStatus.Active,
  })
  status: UserStatus;

  @Column({ type: 'boolean', default: true })
  emailConfirmed: boolean;

  @Column({ type: 'timestamp', default: null, nullable: true })
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
