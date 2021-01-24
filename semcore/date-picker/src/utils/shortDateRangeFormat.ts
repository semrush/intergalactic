import dayjs from 'dayjs';
import { DateConstructorParams } from '../components/Calendar';

function getDayJSLocale(locale) {
  if (locale.includes('en') || locale.includes('ja')) {
    return 'en';
  }
  return 'ru';
}

export default function shortDateRangeFormat(
  dates: DateConstructorParams[],
  { locale = 'en-US', ...options },
): string {
  const { format } = new Intl.DateTimeFormat(locale, options);
  const normalizeDates = dates.map((date) => dayjs(date).toDate());
  const monthsYears = dates.map((date) => [dayjs(date).month(), dayjs(date).year()]);

  if (monthsYears.length > 1) {
    const isSimilarMonth = monthsYears[0][0] === monthsYears[1][0];
    const isSimilarYear = monthsYears[0][1] === monthsYears[1][1];

    if (isSimilarMonth && isSimilarYear && !options.day) {
      return format(normalizeDates[0]);
    }
    if (isSimilarMonth) {
      if (getDayJSLocale(locale) === 'en') {
        return `${new Intl.DateTimeFormat(locale, { month: options.month }).format(
          normalizeDates[0],
        )} ${normalizeDates[0].getDate()} - ${normalizeDates[1].getDate()}, ${normalizeDates[0].getFullYear()}`;
      }
      return `${normalizeDates[0].getDate()} - ${normalizeDates[1].getDate()} ${new Intl.DateTimeFormat(
        locale,
        { month: options.month },
      ).format(normalizeDates[0])} ${normalizeDates[0].getFullYear()}`;
    }

    if (isSimilarYear) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { year, ...newOptions } = options;
      if (getDayJSLocale(locale) === 'en') {
        return `${new Intl.DateTimeFormat(locale, newOptions).format(
          normalizeDates[0],
        )} - ${new Intl.DateTimeFormat(locale, newOptions).format(
          normalizeDates[1],
        )}, ${normalizeDates[0].getFullYear()}`;
      }
      return `${new Intl.DateTimeFormat(locale, newOptions).format(
        normalizeDates[0],
      )} - ${new Intl.DateTimeFormat(locale, newOptions).format(
        normalizeDates[1],
      )} ${normalizeDates[0].getFullYear()}`;
    }

    return `${format(normalizeDates[0])} - ${format(normalizeDates[1])}`;
  }

  return format(normalizeDates[0]);
}
