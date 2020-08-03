import { EventStatus, EventType } from '@core/entities/poll-event/poll-event.types';

export interface IAddVoiceBody {
  userId: string;
  amount: number;
}

export interface IPaginationQueryParams {
  take: number;
  skip: number;
  id?: string;
  filter?: string;
}

export interface ICreatePollBody {
  name: string;
  message: string;
  endMessage: string;
  startDate: string;
  endDate: string;
  status: EventStatus;
  type: EventType;
}
