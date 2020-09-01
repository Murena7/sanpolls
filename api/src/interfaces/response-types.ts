import { ResponseStatusMessage } from './response';

export interface IBasicResponse<T = any> {
  data?: T;
  status?: ResponseStatusMessage;
  count?: number;
}
