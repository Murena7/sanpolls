export interface IAddVoiceBody {
  userId: string;
  amount: number;
}

export interface IStatisticTotal {
  totalUsers: number;
  totalUsersToday: number;
  totalTransactions: number;
  totalTransactionsToday: number;
}
