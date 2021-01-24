import React, { ComponentProps, HTMLAttributes } from 'react';
import dayjs from 'dayjs';

import createComponent, { Merge, MergeGetters, PropGetter } from '@semcore/core';
import Dropdown from '@semcore/dropdown';
import { Box } from '@semcore/flex-box';
import Button from '@semcore/button';

import { Header, Next, Popper, Prev, Title, Trigger } from './components';
import { CalendarMonths as Calendar, ICalendarMonthsContext } from './components/Calendar';
import ButtonTrigger from './components/ButtonTrigger';
import PickerAbstract, { IDatePickerProps } from './components/PickerAbstract';

export interface IMonthPickerContext extends IDatePickerProps {
  getTriggerProps: MergeGetters<
    PropGetter<MonthPickerRoot['getTriggerProps']>,
    PropGetter<PickerAbstract['getTriggerProps']>
  >;
  getPopperProps: PropGetter<MonthPickerRoot['getTriggerProps']>;
  getHeaderProps: PropGetter<MonthPickerRoot['getHeaderProps']>;
  getTitleProps: MergeGetters<
    PropGetter<MonthPickerRoot['getTitleProps']>,
    PropGetter<PickerAbstract['getTitleProps']>
  >;
  getNextProps: PropGetter<MonthPickerRoot['getNextProps']>;
  getPrevProps: PropGetter<MonthPickerRoot['getPrevProps']>;
  getCalendarProps: PropGetter<MonthPickerRoot['getCalendarProps']>;
}

class MonthPickerRoot extends PickerAbstract {
  static displayName = 'MonthPicker';

  static defaultProps = () => ({
    ...PickerAbstract.defaultProps,
    children: (
      <>
        <MonthPicker.Trigger />
        <MonthPicker.Popper />
      </>
    ),
  });

  navigateStep = 'year' as dayjs.OpUnitType;

  getTriggerProps() {
    const { value, locale } = this.asProps;
    return {
      ...super.getTriggerProps(),
      placeholder: 'Select month',
      children: value
        ? new Intl.DateTimeFormat(locale, {
            month: 'short',
            year: 'numeric',
          }).format(dayjs(value).toDate())
        : null,
    };
  }

  getTitleProps() {
    const { displayedPeriod, locale } = this.asProps;
    return {
      ...super.getTitleProps(),
      children: new Intl.DateTimeFormat(locale, { year: 'numeric' }).format(
        dayjs(displayedPeriod).startOf('year').toDate(),
      ),
    };
  }
}

const MonthPicker = createComponent<
  Merge<IDatePickerProps, HTMLAttributes<HTMLButtonElement>>,
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
    add: (date: number | Date, amount: number, unit: dayjs.OpUnitType) => Date;
    subtract: (date: number | Date, amount: number, unit: dayjs.OpUnitType) => Date;
  },
  IMonthPickerContext & ICalendarMonthsContext
>(
  MonthPickerRoot,
  {
    Trigger,
    Popper,
    Header,
    Title,
    Prev,
    Next,
    Calendar,
  },
  {
    parent: Calendar,
  },
);

export default MonthPicker;
