import { User } from '@core/user/user.models';

export enum UserStatus {
  Active = 'active',
  Inactive = 'inactive',
  // Archived = 'archived',
}

export interface UserResponse {
  data: User;
}
