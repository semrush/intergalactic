import React from 'react';
import dayjs from 'dayjs';
import createComponent from '@semcore/core';
import shortDateRangeFormat from './utils/shortDateRangeFormat';
import { Header, Next, Period, Popper, Prev, Title, Trigger } from './components';
import { CalendarDays as Calendar } from './components/Calendar';
import RangePickerAbstract from './components/RangePickerAbstract';

class DateRangePickerRoot extends RangePickerAbstract {
  static displayName = 'DateRangePicker';
  static defaultProps = () => {
    return {
      ...RangePickerAbstract.defaultProps,
      children: (
        <>
          <DateRangePicker.Trigger />
          <DateRangePicker.Popper />
        </>
      ),
    };
  };

  navigateStep = 'month';
  keyStep = 'day';
  keyDiff = {
    37: -1,
    38: -7,
    39: 1,
    40: 7,
  };

  getDefaultPeriods() {
    const { getI18nText } = this.asProps;
    const today = new Date(new Date().setHours(0, 0, 0, 0));
    return [
      {
        children: getI18nText('last2Days'),
        value: [
          dayjs(today)
            .subtract(1, 'day')
            .toDate(),
          today,
        ],
      },
      {
        children: getI18nText('lastWeek'),
        value: [
          dayjs(today)
            .subtract(6, 'day')
            .toDate(),
          today,
        ],
      },
      {
        children: getI18nText('last2Weeks'),
        value: [
          dayjs(today)
            .subtract(13, 'day')
            .toDate(),
          today,
        ],
      },
      {
        children: getI18nText('lastMonth'),
        value: [
          dayjs(today)
            .subtract(1, 'month')
            .toDate(),
          today,
        ],
      },
      {
        children: getI18nText('last2Months'),
        value: [
          dayjs(today)
            .subtract(2, 'month')
            .toDate(),
          today,
        ],
      },
    ];
  }

  getTriggerProps() {
    const { value, locale } = this.asProps;
    return {
      ...super.getTriggerProps(),
      placeholder: 'Select date period',
      children: shortDateRangeFormat(value, {
        locale,
        day: 'numeric',
        month: 'short',
        year: 'numeric',
      }),
    };
  }
}

const DateRangePicker = createComponent(
  DateRangePickerRoot,
  {
    Trigger,
    Popper,
    Header,
    Title,
    Prev,
    Next,
    Calendar,
    Period,
  },
  {
    parent: Calendar,
  },
);

export default DateRangePicker;
