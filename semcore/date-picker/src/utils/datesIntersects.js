import { isInPeriod, isValidSchedule } from './cronTabScheduler';
import dayjs from 'dayjs';

const MAX_DATE_TIMESTAMP = 8640000000000000;

export const datesIntersects =
  ([dateFrom, dateTo], unit) =>
  (disabled_day) => {
    if (Array.isArray(disabled_day)) {
      const [start, end] = disabled_day;

      return (
        (dateFrom &&
          dayjs(dateFrom).isBetween(
            start || -MAX_DATE_TIMESTAMP,
            end || MAX_DATE_TIMESTAMP,
            unit,
            '[]',
          )) ||
        (dateTo &&
          dayjs(dateTo).isBetween(
            start || -MAX_DATE_TIMESTAMP,
            end || MAX_DATE_TIMESTAMP,
            unit,
            '[]',
          )) ||
        (dateFrom &&
          dateTo &&
          dayjs(start).isBetween(dayjs(dateFrom), dayjs(dateTo), unit, '[]')) ||
        (dateFrom && dateTo && dayjs(end).isBetween(dayjs(dateFrom), dayjs(dateTo), unit, '[]'))
      );
    }
    if (isValidSchedule(disabled_day)) {
      return isInPeriod(disabled_day, dateFrom) || isInPeriod(disabled_day, dateTo);
    }
    return (
      dateFrom &&
      dateTo &&
      dayjs(disabled_day).isBetween(dayjs(dateFrom), dayjs(dateTo), unit, '[]')
    );
  };
