import React from 'react';
import dayjs from 'dayjs';
import createComponent from '@semcore/core';
import shortDateRangeFormat from './utils/shortDateRangeFormat';
import { Header, Next, Period, Popper, Prev, Title, Trigger } from './components';
import { CalendarMonths as Calendar } from './components/Calendar';
import RangePickerAbstract from './components/RangePickerAbstract';

class MonthRangePickerRoot extends RangePickerAbstract {
  static displayName = 'MonthRangePicker';
  static defaultProps = (props) => {
    return {
      ...RangePickerAbstract.defaultProps(props),
      children: (
        <>
          <MonthRangePicker.Trigger />
          <MonthRangePicker.Popper />
        </>
      ),
    };
  };

  navigateStep = 'year';
  keyStep = 'month';
  keyDiff = {
    37: -1,
    38: -3,
    39: 1,
    40: 3,
  };

  getDefaultPeriods() {
    const { getI18nText } = this.asProps;
    const today = new Date(new Date().setHours(0, 0, 0, 0));
    return [
      {
        children: getI18nText('lastMonth'),
        value: [
          dayjs(today)
            .subtract(1, 'month')
            .startOf('month')
            .toDate(),
          dayjs(today)
            .startOf('month')
            .toDate(),
        ],
      },
      {
        children: getI18nText('last3Months'),
        value: [
          dayjs(today)
            .subtract(2, 'month')
            .startOf('month')
            .toDate(),
          dayjs(today)
            .startOf('month')
            .toDate(),
        ],
      },
      {
        children: getI18nText('last6Months'),
        value: [
          dayjs(today)
            .subtract(5, 'month')
            .startOf('month')
            .toDate(),
          dayjs(today)
            .startOf('month')
            .toDate(),
        ],
      },
      {
        children: getI18nText('last12Months'),
        value: [
          dayjs(today)
            .subtract(11, 'month')
            .startOf('month')
            .toDate(),
          dayjs(today)
            .startOf('month')
            .toDate(),
        ],
      },
    ];
  }

  getTriggerProps() {
    const { value, locale } = this.asProps;
    return {
      ...super.getTriggerProps(),
      placeholder: 'Select month period',
      children: shortDateRangeFormat(value, {
        locale,
        month: 'short',
        year: 'numeric',
      }),
    };
  }

  getTitleProps(props, index) {
    const { displayedPeriod, locale } = this.asProps;
    return {
      ...super.getTitleProps(props, index),
      children: new Intl.DateTimeFormat(locale, { year: 'numeric' }).format(
        dayjs(displayedPeriod)
          .add(index, this.navigateStep)
          .startOf(this.navigateStep)
          .toDate(),
      ),
    };
  }
}

const MonthRangePicker = createComponent(
  MonthRangePickerRoot,
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

export default MonthRangePicker;
