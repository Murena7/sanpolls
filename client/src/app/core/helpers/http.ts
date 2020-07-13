import { stringify } from 'qs';

interface KeyValueObject {
  [key: string]: any;
}

export function toQueryString(obj: KeyValueObject): string {
  return stringify(obj, { addQueryPrefix: true, strictNullHandling: true });
}
