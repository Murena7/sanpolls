import { IUser } from '@core/interfaces/user/user.types';

export interface ILoginResponse {
  data: IUser;
}

export interface IEmailVerificationResponse {
  verificationStatus: EmailVerificationStatus;
}

export interface IEmailVerificationBody {
  token: string;
  email: string;
}

export enum EmailVerificationStatus {
  confirmed,
  notValidToken,
  notValidUserEmail,
}
