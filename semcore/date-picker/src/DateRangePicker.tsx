import React, { ComponentProps, HTMLAttributes } from 'react';
import dayjs from 'dayjs';

import createComponent, { Merge, MergeGetters, PropGetter } from '@semcore/core';
import { Box } from '@semcore/flex-box';
import Dropdown, { IDropdownProps } from '@semcore/dropdown';
import Button from '@semcore/button';

import shortDateRangeFormat from './utils/shortDateRangeFormat';
import {
  Header,
  IDateRangePickerPeriodProps,
  Next,
  Period,
  Popper,
  Prev,
  Title,
  Trigger,
} from './components';
import { CalendarDays as Calendar, ICalendarDaysContext } from './components/Calendar';
import ButtonTrigger from './components/ButtonTrigger';
import RangePickerAbstract, { IDateRangePickerProps } from './components/RangePickerAbstract';

import style from './style/date-picker.shadow.css';

export interface IDateRangePickerContext extends IDateRangePickerProps {
  getTriggerProps: MergeGetters<
    PropGetter<DateRangePickerRoot['getTriggerProps']>,
    PropGetter<RangePickerAbstract['getTriggerProps']>
  >;
  getPopperProps: PropGetter<DateRangePickerRoot['getPopperProps']>;
  getHeaderProps: PropGetter<DateRangePickerRoot['getHeaderProps']>;
  getTitleProps: PropGetter<DateRangePickerRoot['getTitleProps']>;
  getNextProps: PropGetter<DateRangePickerRoot['getNextProps']>;
  getPrevProps: PropGetter<DateRangePickerRoot['getPrevProps']>;
  getCalendarProps: PropGetter<DateRangePickerRoot['getCalendarProps']>;
  getPeriodProps: PropGetter<DateRangePickerRoot['getPeriodProps']>;
}

class DateRangePickerRoot extends RangePickerAbstract {
  static displayName = 'DateRangePicker';
  static style = style;
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

  navigateStep = 'month' as dayjs.OpUnitType;

  getDefaultPeriods() {
    const { getI18nText } = this.asProps;
    const today = new Date(new Date().setHours(0, 0, 0, 0));
    return [
      {
        children: getI18nText('last2Days'),
        value: [dayjs(today).subtract(1, 'day').toDate(), today],
      },
      {
        children: getI18nText('lastWeek'),
        value: [dayjs(today).subtract(6, 'day').toDate(), today],
      },
      {
        children: getI18nText('last2Weeks'),
        value: [dayjs(today).subtract(13, 'day').toDate(), today],
      },
      {
        children: getI18nText('lastMonth'),
        value: [dayjs(today).subtract(1, 'month').toDate(), today],
      },
      {
        children: getI18nText('last2Months'),
        value: [dayjs(today).subtract(2, 'month').toDate(), today],
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

const DateRangePicker = createComponent<
  Merge<IDateRangePickerProps, IDropdownProps>,
  {
    Trigger: Merge<ComponentProps<typeof Dropdown.Trigger>, ComponentProps<typeof ButtonTrigger>>;
    Popper: ComponentProps<typeof Dropdown.Popper>;
    Header: ComponentProps<typeof Box>;
    Title: ComponentProps<typeof Box>;
    Prev: ComponentProps<typeof Button>;
    Next: ComponentProps<typeof Button>;
    Calendar: [
      ComponentProps<typeof Calendar>,
      {
        Unit: ComponentProps<typeof Calendar.Unit>;
      },
    ];
    Period: Merge<IDateRangePickerPeriodProps, HTMLAttributes<HTMLDivElement>>;
    add: (date: number | Date, amount: number, unit: dayjs.OpUnitType) => Date;
    subtract: (date: number | Date, amount: number, unit: dayjs.OpUnitType) => Date;
  },
  IDateRangePickerContext & ICalendarDaysContext
>(
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
