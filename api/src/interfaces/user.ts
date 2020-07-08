// export interface IUser {
//   id: string;
//   username: string;
//   password: string;
//   email: string;
//   role: string;
//   salt: string;
//   createdAt: Date;
// }

export interface IUserSignUpBody {
  email: string;
  password: string;
}

export enum UserStatus {
  Active = 'active',
  Inactive = 'inactive',
}

export enum Role {
  User = 'user',
  Admin = 'admin',
}
