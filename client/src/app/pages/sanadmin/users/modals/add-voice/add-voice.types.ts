import { IUser } from '@core/entities/user/user.types';

export interface IAddVoiceModalResult {
  user: IUser;
  amount: number;
}
