export interface IEmailVerificationResponse {
  verificationStatus: EmailVerificationStatus;
}

export enum EmailVerificationStatus {
  confirmed,
  notValidToken,
  notValidUserEmail,
}

export interface IUserSignUpBody {
  email: string;
  password: string;
}
