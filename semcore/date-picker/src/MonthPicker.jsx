import React from 'react';
import dayjs from 'dayjs';
import { createComponent } from '@semcore/core';
import {
  Header,
  Next,
  Popper,
  Prev,
  Title,
  Trigger as ButtonTrigger,
  InputTrigger,
} from './components';
import { CalendarMonths as Calendar } from './components/Calendar';
import PickerAbstract from './components/PickerAbstract';

const dateParts = { day: false, month: true, year: true };

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
    ArrowLeft: -1,
    ArrowUp: -3,
    ArrowRight: 1,
    ArrowDown: 3,
  };

  getButtonTriggerProps() {
    const { value, locale } = this.asProps;
    return {
      ...super.getButtonTriggerProps(),
      placeholder: 'Select month',
      children: value
        ? new Intl.DateTimeFormat(locale, {
            month: 'short',
            year: 'numeric',
          }).format(dayjs(value).toDate())
        : null,
    };
  }

  getTriggerProps() {
    const {
      value,
      onChange,
      onDisplayedPeriodChange,
      locale,
      disabled,
      disabledErrorText,
      getI18nText,
      animationsDisabled,
    } = this.asProps;

    return {
      ...super.getButtonTriggerProps(),
      value,
      onChange,
      onDisplayedPeriodChange,
      locale,
      parts: dateParts,
      disabledDates: disabled,
      disabledErrorText,
      children: () => <InputTrigger.SingleDateInput />,
      getI18nText,
      animationsDisabled,
      unit: this.keyStep,
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
    Trigger: InputTrigger,
    ButtonTrigger,
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
