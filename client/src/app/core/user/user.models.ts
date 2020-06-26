import { UserRole } from './role.models';
import { UserStatus } from '@core/user/user.types';

export class User {
  id?: number;
  email: string;
  username?: string;
  password: string;
  firstName?: string;
  lastName?: string;
  role: UserRole;
  status: UserStatus;
  accessToken?: string;
  timeCreatedAt?: string;
  timeUpdatedAt?: string;
}
