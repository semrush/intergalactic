function cronUnitToArray(unit) {
  if (unit.includes('-')) {
    const [start, end] = unit.split('-');
    return Array.from(
      { length: parseInt(end, 10) - parseInt(start, 10) + 1 },
      (_, idx) => parseInt(start, 10) + idx,
    );
  }
  return unit.split(/[,\/]/);
}

export function isValidSchedule(pattern) {
  if (typeof pattern !== 'string') return false;

  function isValidUnit(unit, min, max) {
    const unitValues = cronUnitToArray(unit);
    const CRON_REG = /^\d+$|^\*$|^\*\/\d+$/;
    return unitValues.every((item) => {
      const intItem = parseInt(item, 10);
      return !(intItem < min || intItem > max || !CRON_REG.test(item));
    });
  }

  function isValidMonth(month) {
    return isValidUnit(month, 1, 12);
  }

  function isValidWeekDay(weekDay) {
    return isValidUnit(weekDay, 1, 7);
  }

  function isValidMonthDay(monthDay) {
    return isValidUnit(monthDay, 1, 31);
  }

  function validate(pattern, validateFn, msg) {
    if (validateFn(pattern)) return true;
    // eslint-disable-next-line no-console
    console.warn(`DatePicker disabledSchedule: ${msg} format is invalid`);
    return false;
  }

  const patternArr = pattern.split(' ');

  if (patternArr.length < 3) return false;

  return patternArr.every((pattern, idx) => {
    switch (idx) {
      case 0:
        return validate(pattern, isValidMonthDay, 'day of month');
      case 1:
        return validate(pattern, isValidMonth, 'month');
      case 2:
        return validate(pattern, isValidWeekDay, 'day of week');
      default:
        return false;
    }
  });
}

export function isInPeriod(pattern, date) {
  const patternArr = pattern.split(' ');

  function isInPeriod(date, period, dateMethod) {
    if (period === '*') return true;
    return date[dateMethod]() === parseInt(period, 10);
  }

  function monthInPeriod(date, period) {
    return isInPeriod(date, period, 'getMonth');
  }

  function monthDayInPeriod(date, period) {
    return isInPeriod(date, period, 'getDate');
  }

  function weekDayInPeriod(date, period) {
    if (period == 7) period = 0;
    return isInPeriod(date, period, 'getDay');
  }

  function test(units, date, testFn) {
    return units.some((unit) => testFn(date, unit));
  }

  return patternArr.every((unit, idx) => {
    const unitValues = cronUnitToArray(unit);
    switch (idx) {
      case 0:
        return test(unitValues, date, monthDayInPeriod);
      case 1:
        return test(unitValues, date, monthInPeriod);
      case 2:
        return test(unitValues, date, weekDayInPeriod);
      default:
        return false;
    }
  });
}
