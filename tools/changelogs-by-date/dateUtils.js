const dayJs = require('dayjs');
const isBetween = require('dayjs/plugin/isBetween');
dayJs.extend(isBetween);

function isDateValid(date) {
  if (date === undefined) return false;
  return dayJs(date).isValid();
}

function dateSorter(a, b) {
  const dateA = dayJs(a);
  const dateB = dayJs(b);
  if (dateA.isAfter(dateB)) return -1;
  if (dateA.isBefore(dateB)) return 1;
  return 0;
}

function isDateInRange(date, start, end) {
  return dayJs(date).isBetween(start, end, 'd', '[)');
}

module.exports = {
  isDateValid,
  dateSorter,
  isDateInRange,
};
