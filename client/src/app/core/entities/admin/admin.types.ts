import { EventStatus, EventType } from '@core/entities/poll-event/poll-event.types';

export interface IUserToAdminBody {
  userId: string;
  amount: number;
}

export interface IPaginationQueryParams {
  take: number;
  skip: number;
  id?: string;
}

export interface ICreatePollBody {
  name: string;
  message: string;
  endMessage: string;
  startDate: Date;
  endDate: Date;
  status: EventStatus;
  type: EventType;
}
