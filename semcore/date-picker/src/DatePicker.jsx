import React from 'react';
import dayjs from 'dayjs';
import createComponent, { Component, Root, sstyled } from '@semcore/core';
import { Box } from '@semcore/flex-box';
import Button from '@semcore/button';
import Divider from '@semcore/divider';
import i18nEnhance from '@semcore/utils/lib/enhances/i18nEnhance';
import { Header, Next, Popper, Prev, Title, Trigger, InputTrigger } from './components';
import { CalendarDays as Calendar } from './components/Calendar';
import PickerAbstract from './components/PickerAbstract';
import { getLocaleDate } from './utils/formatDate';

export class DatePickerRoot extends PickerAbstract {
  static displayName = 'DatePicker';

  static defaultProps = (props) => ({
    ...PickerAbstract.defaultProps(props),
    children: (
      <>
        <DatePicker.Trigger />
        <DatePicker.Popper />
      </>
    ),
  });

  navigateStep = 'month';
  keyStep = 'day';
  keyDiff = {
    37: -1,
    38: -7,
    39: 1,
    40: 7,
  };

  handlerToday = () => {
    this.handlers.value(new Date(new Date().setHours(0, 0, 0, 0)));
  };

  getTriggerProps() {
    const { value, locale } = this.asProps;
    return {
      ...super.getTriggerProps(),
      placeholder: 'Select date',
      children: value ? getLocaleDate(value, locale) : null,
    };
  }

  getInputTriggerProps() {
    const { value, onChange, onDisplayedPeriodChange, locale, disabled, size } = this.asProps;

    return {
      ...super.getTriggerProps(),
      value,
      onChange,
      onDisplayedPeriodChange,
      locale,
      w: size === 'm' ? 145 : 160,
      disabledDates: disabled,
      children: () => <InputTrigger.SingleDateInput />,
    };
  }

  getPopperProps() {
    return {
      ...super.getPopperProps(),
      children: (
        <>
          <DatePicker.Header />
          <DatePicker.Calendar />
          <Divider ml={-4} mt={4} w="calc(100% + 32px)" />
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

class Today extends Component {
  static enhance = [i18nEnhance()];

  render() {
    const SToday = Root;
    const { styles, getI18nText } = this.asProps;
    return sstyled(styles)(
      <SToday render={Box}>
        <Button use="tertiary" children={getI18nText('today')} />
      </SToday>,
    );
  }
}

const DatePicker = createComponent(
  DatePickerRoot,
  {
    Trigger,
    InputTrigger,
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
