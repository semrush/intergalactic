import React from 'react';
import dayjs from 'dayjs';
import createComponent from '@semcore/core';
import { Header, Next, Popper, Prev, Title, Trigger, InputTrigger } from './components';
import { CalendarMonths as Calendar } from './components/Calendar';
import PickerAbstract from './components/PickerAbstract';

const inputTriggerParts = { day: false, month: true, year: true };

class MonthPickerRoot extends PickerAbstract {
  static displayName = 'MonthPicker';

  static defaultProps = (props) => ({
    ...PickerAbstract.defaultProps(props),
    children: (
      <>
        <MonthPicker.Trigger />
        <MonthPicker.Popper />
      </>
    ),
  });

  navigateStep = 'year';
  keyStep = 'month';
  keyDiff = {
    37: -1,
    38: -3,
    39: 1,
    40: 3,
  };

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

  getInputTriggerProps() {
    const { value, onChange, onDisplayedPeriodChange, locale, disabled } = this.asProps;

    return {
      ...super.getTriggerProps(),
      value,
      onChange,
      onDisplayedPeriodChange,
      locale,
      w: 135,
      parts: inputTriggerParts,
      disabledDates: disabled,
      children: () => <InputTrigger.SingleDateInput />,
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

const MonthPicker = createComponent(
  MonthPickerRoot,
  {
    Trigger,
    InputTrigger,
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
