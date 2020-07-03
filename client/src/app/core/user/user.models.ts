import { UserRole } from './role.models';
import { UserStatus } from '@core/user/user.types';

export class User {
  id?: number;
  username?: string;
  password: string;
  email: string;
  role: UserRole;
  status: UserStatus;
  createdAt?: string;
  updatedAt?: string;
}
