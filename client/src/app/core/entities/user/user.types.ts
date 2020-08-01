import { UserRole } from '@core/entities/user/role.types';

export enum UserStatus {
  Active = 'active',
  Inactive = 'inactive'
}

export interface IUser {
  id: string;
  username: string;
  password?: string;
  email: string;
  role: UserRole;
  voiceBalance: number;
  status: UserStatus;
  emailConfirmed: boolean;
  lastLogin: Date;
  createdAt: string;
  updatedAt: string;
}

export interface IUserRegistrationBody {
  email: string;
  password: string;
}

export interface UserResponse {
  data: IUser;
}
