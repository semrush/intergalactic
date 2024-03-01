import dayjs from 'dayjs';

const DDMMYYFormattersCache = {};

export const formatDDMMYY = (date, locale) => {
  if (DDMMYYFormattersCache[locale] === undefined) {
    DDMMYYFormattersCache[locale] = new Intl.DateTimeFormat(locale, {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    });
  }

  const formatter = DDMMYYFormattersCache[locale];

  return formatter.format(dayjs(date).toDate());
};

const MMYYYYFormattersCache = {};

export const formatMMYY = (date, locale) => {
  if (MMYYYYFormattersCache[locale] === undefined) {
    MMYYYYFormattersCache[locale] = new Intl.DateTimeFormat(locale, {
      month: 'long',
      year: 'numeric',
    });
  }

  const formatter = MMYYYYFormattersCache[locale];

  return formatter.format(dayjs(date).toDate());
};
