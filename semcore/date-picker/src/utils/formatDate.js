import dayjs from 'dayjs';

export const getLocaleDate = (date, locale) =>
  new Intl.DateTimeFormat(locale, {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  }).format(dayjs(date).toDate());
