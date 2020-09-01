import { IUser } from '@core/interfaces/user/user.types';
import { IPollEvent } from '@core/interfaces/poll-event/poll-event.types';
import { ISong } from '@core/interfaces/song/song.types';

export interface IPollTransaction {
  id: string;
  userId: string;
  user?: IUser;
  eventId: string;
  event?: IPollEvent;
  songId: string;
  song?: ISong;
  amount: number;
  source: TransactionSource;
  createdAt: string;
  updatedAt: string;
}

export enum TransactionSource {
  System = 'system',
  SystemBonus = 'system-bonus',
  PayPal = 'paypal',
  AddSong = 'add-song',
  GiveVote = 'give-vote',
  ByAdmin = 'by-admin'
}
