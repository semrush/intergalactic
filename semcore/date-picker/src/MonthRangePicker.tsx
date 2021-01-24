import React, { ComponentProps, HTMLAttributes } from 'react';
import dayjs, { OpUnitType } from 'dayjs';

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
import { CalendarMonths as Calendar, ICalendarMonthsContext } from './components/Calendar';
import ButtonTrigger from './components/ButtonTrigger';
import RangePickerAbstract, { IDateRangePickerProps } from './components/RangePickerAbstract';

export interface IMonthRangePickerContext extends IDateRangePickerProps {
  getTriggerProps: MergeGetters<
    PropGetter<MonthRangePickerRoot['getTriggerProps']>,
    PropGetter<RangePickerAbstract['getTriggerProps']>
  >;
  getPopperProps: PropGetter<MonthRangePickerRoot['getPopperProps']>;
  getHeaderProps: PropGetter<MonthRangePickerRoot['getHeaderProps']>;
  getTitleProps: PropGetter<MonthRangePickerRoot['getTitleProps']>;
  getNextProps: PropGetter<MonthRangePickerRoot['getNextProps']>;
  getPrevProps: PropGetter<MonthRangePickerRoot['getPrevProps']>;
  getCalendarProps: PropGetter<MonthRangePickerRoot['getCalendarProps']>;
  getPeriodProps: PropGetter<MonthRangePickerRoot['getPeriodProps']>;
}

class MonthRangePickerRoot extends RangePickerAbstract {
  static displayName = 'MonthRangePicker';
  static defaultProps = () => {
    return {
      ...RangePickerAbstract.defaultProps,
      children: (
        <>
          <MonthRangePicker.Trigger />
          <MonthRangePicker.Popper />
        </>
      ),
    };
  };

  navigateStep = 'year' as OpUnitType;

  getDefaultPeriods() {
    const { getI18nText } = this.asProps;
    const today = new Date(new Date().setHours(0, 0, 0, 0));
    return [
      {
        children: getI18nText('lastMonth'),
        value: [
          dayjs(today).subtract(1, 'month').startOf('month').toDate(),
          dayjs(today).startOf('month').toDate(),
        ],
      },
      {
        children: getI18nText('last3Months'),
        value: [
          dayjs(today).subtract(2, 'month').startOf('month').toDate(),
          dayjs(today).startOf('month').toDate(),
        ],
      },
      {
        children: getI18nText('last6Months'),
        value: [
          dayjs(today).subtract(5, 'month').startOf('month').toDate(),
          dayjs(today).startOf('month').toDate(),
        ],
      },
      {
        children: getI18nText('last12Months'),
        value: [
          dayjs(today).subtract(11, 'month').startOf('month').toDate(),
          dayjs(today).startOf('month').toDate(),
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
}

const MonthRangePicker = createComponent<
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
  IMonthRangePickerContext & ICalendarMonthsContext
>(
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
