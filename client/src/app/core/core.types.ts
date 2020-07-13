export interface IBasicResponse<T = any> {
  data?: T;
  status?: ResponseStatusMessage;
  count?: number;
}

export enum ResponseStatusMessage {
  Success = 'Success'
}
