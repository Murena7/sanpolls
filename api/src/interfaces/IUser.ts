// export interface IUser {
//   id: string;
//   username: string;
//   password: string;
//   email: string;
//   role: string;
//   salt: string;
//   createdAt: Date;
// }

export interface IUserInputDTO {
  email: string;
  password: string;
}

export enum UserStatus {
  Active = 'active',
  Inactive = 'inactive',
}
