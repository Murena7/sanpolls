export interface IBill {
  id: string;
  userId: string;
  payType: PayType;
  status: Status;
  amount: number;
  currency: string;
  description: string;
  createdAt: string;
  updatedAt: string;
}

export enum BillCallbackStatus {
  success = 'success',
  fail = 'fail',
}

export enum PayType {
  Obmenka = 'Obmenka',
}

export enum Status {
  CREATED = 'CREATED',
  PAYIN = 'PAYIN',
  FINISHED = 'FINISHED',
  PAYIN_ERROR = 'PAYIN_ERROR',
  CANCELED = 'CANCELED',
  PAYED_RECALC = 'PAYED_RECALC',
  FAILED = 'FAILED',
}

export enum Currency {
  UAH = 'UAH',
  USD = 'USD',
  EUR = 'EUR',
  RUR = 'RUR',
  LTC = 'LTC',
  BTC = 'BTC',
  BCH = 'BCH',
  USDT = 'USDT',
}

export interface IBillCreateBody {
  payType: PayType;
  amount: number;
  currency: Currency;
}

export interface IStatusObmenkaBody {
  invoiceId: string;
}

export interface IBillCreateResponse {
  clientId: string;
  sign?: string;
  signOrder?: string;
  invoiceId: string;
  amount: number;
  currency: Currency;
  successUrl: string;
  failUrl: string;
  statusUrl: string;
}

export interface IStatusObmenkaResponse {
  payment_id: string;
  tracking: string;
  amount: string;
  fee: string;
  accrual_amount: string;
  accrual_currency: string;
  currency: string;
  status: string;
  created: string;
}
