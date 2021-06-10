import { isInPeriod, isValidSchedule } from './cronTabScheduler';

export default (date, unit) => (disabled_day) => {
  if (Array.isArray(disabled_day)) {
    const MAX_DATE_TIMESTAMP = 8640000000000000;
    const [start, end] = disabled_day;
    return date.isBetween(start || -MAX_DATE_TIMESTAMP, end || MAX_DATE_TIMESTAMP, unit, '[]');
  }
  if (isValidSchedule(disabled_day)) {
    return isInPeriod(disabled_day, date.toDate());
  }
  return date.isSame(disabled_day, 'date');
};
