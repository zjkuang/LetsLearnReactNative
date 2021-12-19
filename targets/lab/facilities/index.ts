import dayjs from 'dayjs';

export function isString(a: any): a is string {
  return typeof a === typeof '';
}

export function isValidString(a: any): a is string {
  return typeof a === typeof '' && (a as string).trim() !== '';
}

export function dateTime(): string {
  return dayjs().format('YYYY-MM-DD HH:mm:ss');
}
