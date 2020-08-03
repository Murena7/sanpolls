export enum EventStatus {
  Active = 'active',
  Inactive = 'inactive',
  Archived = 'archived',
}

export enum EventType {
  Timer = 'timer',
  Infinite = 'infinite',
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

export interface IGetPollListBody {
  skip?: string;
  take?: string;
  id?: string;
}
