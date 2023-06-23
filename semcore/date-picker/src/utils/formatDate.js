import dayjs from 'dayjs';

const formatterCache = {};

export const getLocaleDate = (date, locale) => {
  if (formatterCache[locale] === undefined) {
    formatterCache[locale] = new Intl.DateTimeFormat(locale, {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    });
  }

  const formatter = formatterCache[locale];

  return formatter.format(dayjs(date).toDate());
};
