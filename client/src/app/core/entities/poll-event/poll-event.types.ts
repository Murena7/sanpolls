export interface IPollEvent {
  id: string;
  name: string;
  message: string;
  endMessage: string;
  startDate: string;
  endDate: string;
  status: EventStatus;
  type: EventType;
  createdAt: string;
  updatedAt: string;
}

export enum EventStatus {
  Active = 'active',
  Inactive = 'inactive',
  Archived = 'archived'
}

export enum EventType {
  Timer = 'timer',
  Infinite = 'infinite'
}
