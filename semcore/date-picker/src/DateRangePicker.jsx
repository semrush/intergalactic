import React from 'react';
import dayjs from 'dayjs';
import { createComponent } from '@semcore/core';
import shortDateRangeFormat from './utils/shortDateRangeFormat';
import {
  Header,
  Next,
  Period,
  Popper,
  Prev,
  Title,
  Trigger as ButtonTrigger,
  InputTrigger,
} from './components';
import { CalendarDays as Calendar } from './components/Calendar';
import RangePickerAbstract, { Apply, Reset } from './components/RangePickerAbstract';

class DateRangePickerRoot extends RangePickerAbstract {
  static displayName = 'DateRangePicker';
  static defaultProps = (props) => {
    return {
      ...RangePickerAbstract.defaultProps(props),
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
    ArrowLeft: -1,
    ArrowUp: -7,
    ArrowRight: 1,
    ArrowDown: 7,
  };

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

  getButtonTriggerProps() {
    const { value, locale } = this.asProps;
    return {
      ...super.getButtonTriggerProps(),
      placeholder: 'Select date period',
      children: shortDateRangeFormat(value, {
        locale,
        day: 'numeric',
        month: 'short',
        year: 'numeric',
      }),
    };
  }

  getTriggerProps() {
    const {
      visible,
      preselectedValue,
      onChange,
      onDisplayedPeriodChange,
      locale,
      disabled,
      disabledErrorText,
      getI18nText,
      animationsDisabled,
    } = this.asProps;
    const value = visible
      ? [preselectedValue[0] || this.asProps.value[0], preselectedValue[1] || this.asProps.value[1]]
      : this.asProps.value;

    return {
      ...super.getButtonTriggerProps(),
      value,
      onChange,
      onDisplayedPeriodChange,
      locale,
      disabledDates: disabled,
      disabledErrorText,
      children: () => <InputTrigger.DateRange />,
      getI18nText,
      animationsDisabled,
      unit: this.keyStep,
    };
  }
}

const DateRangePicker = createComponent(
  DateRangePickerRoot,
  {
    Trigger: InputTrigger,
    ButtonTrigger,
    Popper,
    Header,
    Title,
    Prev,
    Next,
    Calendar,
    Period,
    Apply,
    Reset,
  },
  {
    parent: Calendar,
  },
);

export default DateRangePicker;
