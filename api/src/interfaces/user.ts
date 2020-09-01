export enum UserStatus {
  Active = 'active',
  Inactive = 'inactive',
}

export enum Role {
  User = 'user',
  Admin = 'admin',
}

export interface IUserSongHistoryBody {
  skip?: string;
  take?: string;
}

export interface IUserPollTransactionHistoryBody {
  skip?: string;
  take?: string;
}

export interface IUpdateProfile {
  username: string;
}

export interface IChangePassword {
  newPassword: string;
  oldPassword: string;
}
