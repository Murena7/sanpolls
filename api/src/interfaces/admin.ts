import { TransactionSource } from './poll-transaction';

export interface IAddVoiceBody {
  userId: string;
  amount: number;
}

export interface IAddVoiceByTypeBody {
  userId: string;
  amount: number;
  source: TransactionSource;
}

export interface IStatisticTotal {
  totalUsers: number;
  totalUsersToday: number;
  totalTransactions: number;
  totalTransactionsToday: number;
}
