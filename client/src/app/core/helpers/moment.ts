import * as moment from 'moment-timezone';
const DATE_FORMAT = 'YYYY-MM-DD';
const DATE_TIMEZONE = 'America/New_York';
moment.tz.setDefault(DATE_TIMEZONE);

export { moment };
export { Moment } from 'moment-timezone';

export function toLocalDate(date: moment.Moment) {
  const d = new Date(date.format());
  d.setHours(0);
  d.setMinutes(0);
  d.setSeconds(0);
  return d;
}

export function fromLocalDate(date: Date) {
  const dateStr = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
  return moment(dateStr, 'YYYY-MM-DD');
}

export function formatOutputDate(date: moment.Moment) {
  return moment(date).format(DATE_FORMAT);
}

export function now() {
  return moment();
}
