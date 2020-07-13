export interface IPollTransaction {
  id: string;
  userId: string;
  eventId: string;
  songId: string;
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
