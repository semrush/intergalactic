import React, { ComponentProps, HTMLAttributes } from 'react';
import dayjs from 'dayjs';

import createComponent, { Component, Merge, MergeGetters, PropGetter, styled } from '@semcore/core';
import { Box } from '@semcore/flex-box';
import Button from '@semcore/button';
import Dropdown from '@semcore/dropdown';
import Divider from '@semcore/divider';
import i18nEnhance, { IWithI18nEnhanceProps } from '@semcore/utils/lib/enhances/i18nEnhance';

import { Header, Next, Popper, Prev, Title, Trigger } from './components';
import { CalendarDays as Calendar, ICalendarDaysContext } from './components/Calendar';
import ButtonTrigger from './components/ButtonTrigger';
import PickerAbstract, { IDatePickerProps } from './components/PickerAbstract';

export interface IDatePickerContext extends IDatePickerProps {
  getTriggerProps: MergeGetters<
    PropGetter<DatePickerRoot['getTriggerProps']>,
    PropGetter<PickerAbstract['getTriggerProps']>
  >;
  getPopperProps: MergeGetters<
    PropGetter<DatePickerRoot['getPopperProps']>,
    PropGetter<PickerAbstract['getPopperProps']>
  >;
  getHeaderProps: PropGetter<DatePickerRoot['getHeaderProps']>;
  getTitleProps: MergeGetters<
    PropGetter<DatePickerRoot['getTitleProps']>,
    PropGetter<PickerAbstract['getTitleProps']>
  >;
  getNextProps: PropGetter<DatePickerRoot['getNextProps']>;
  getPrevProps: PropGetter<DatePickerRoot['getPrevProps']>;
  getCalendarProps: PropGetter<DatePickerRoot['getCalendarProps']>;
  getTodayProps: PropGetter<DatePickerRoot['getTodayProps']>;
}

export class DatePickerRoot extends PickerAbstract {
  static displayName = 'DatePicker';

  static defaultProps = () => ({
    ...PickerAbstract.defaultProps,
    children: (
      <>
        <DatePicker.Trigger />
        <DatePicker.Popper />
      </>
    ),
  });

  navigateStep = 'month' as dayjs.OpUnitType;

  handlerToday = () => {
    this.handlers.value(new Date(new Date().setHours(0, 0, 0, 0)));
  };

  getTriggerProps() {
    const { value, locale } = this.asProps;
    return {
      ...super.getTriggerProps(),
      placeholder: 'Select date',
      children: value
        ? new Intl.DateTimeFormat(locale, {
            day: 'numeric',
            month: 'short',
            year: 'numeric',
          }).format(dayjs(value).toDate())
        : null,
    };
  }

  getPopperProps() {
    return {
      ...super.getPopperProps(),
      children: (
        <>
          <DatePicker.Header />
          <DatePicker.Calendar />
          <Divider ml={-4} w="calc(100% + 32px)" />
          <DatePicker.Today />
        </>
      ),
    };
  }

  getTitleProps() {
    const { displayedPeriod, locale } = this.asProps;
    return {
      ...super.getTitleProps(),
      children: new Intl.DateTimeFormat(locale, { month: 'long', year: 'numeric' }).format(
        dayjs(displayedPeriod).startOf('month').toDate(),
      ),
    };
  }

  getTodayProps() {
    const { i18n, locale } = this.asProps;
    return {
      i18n,
      locale,
      onClick: this.handlerToday,
    };
  }
}

class Today extends Component<IWithI18nEnhanceProps> {
  static enhance = [i18nEnhance()];

  render() {
    const { Root: SToday } = this;
    const { styles, getI18nText } = this.asProps;

    return styled(styles)(
      <SToday render={Box}>
        <Button use="tertiary" children={getI18nText('today')} />
      </SToday>,
    );
  }
}

const DatePicker = createComponent<
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
    Today: ComponentProps<typeof Box>;
    add: (date: number | Date, amount: number, unit: dayjs.OpUnitType) => Date;
    subtract: (date: number | Date, amount: number, unit: dayjs.OpUnitType) => Date;
  },
  IDatePickerContext & ICalendarDaysContext
>(
  DatePickerRoot,
  {
    Trigger,
    Popper,
    Header,
    Title,
    Prev,
    Next,
    Calendar,
    Today,
  },
  {
    parent: Calendar,
  },
);

export default DatePicker;
