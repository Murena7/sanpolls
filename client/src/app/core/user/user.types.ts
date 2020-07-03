import { User } from '@core/user/user.models';

export enum UserStatus {
  Active = 'active',
  Inactive = 'inactive',
}

export interface UserResponse {
  data: User;
}
