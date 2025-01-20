import React from 'react';
import dayjs from 'dayjs';
import { createComponent, Component, Root, sstyled } from '@semcore/core';
import { Box } from '@semcore/flex-box';
import Button from '@semcore/button';
import Divider from '@semcore/divider';
import i18nEnhance from '@semcore/core/lib/utils/enhances/i18nEnhance';
import {
  Header,
  Next,
  Popper,
  Prev,
  Title,
  Trigger as ButtonTrigger,
  InputTrigger,
} from './components';
import { CalendarDays as Calendar } from './components/Calendar';
import PickerAbstract from './components/PickerAbstract';
import { formatDDMMYY } from './utils/formatDate';
import { includesDate } from './utils/includesDate';
import { localizedMessages } from './translations/__intergalactic-dynamic-locales';

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
    ArrowLeft: -1,
    ArrowUp: -7,
    ArrowRight: 1,
    ArrowDown: 7,
  };

  handlerToday = () => {
    this.handlers.value(new Date(new Date().setHours(0, 0, 0, 0)));
  };

  getButtonTriggerProps() {
    const { value, locale } = this.asProps;
    return {
      ...super.getButtonTriggerProps(),
      placeholder: 'Select date',
      children: value ? formatDDMMYY(value, locale) : null,
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
      disabledDates: disabled,
      disabledErrorText,
      children: () => <InputTrigger.SingleDateInput />,
      getI18nText,
      animationsDisabled,
      unit: this.keyStep,
    };
  }

  getPopperProps() {
    return {
      ...super.getPopperProps(),
      children: (
        <>
          <DatePicker.Header />
          <DatePicker.Calendar />
          <Divider ml={-4} mt={4} w='calc(100% + 32px)' />
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
    const { i18n, locale, disabled } = this.asProps;

    return {
      i18n,
      locale,
      onClick: this.handlerToday,
      disabled: disabled.some(includesDate(dayjs(), 'day')),
    };
  }
}

class Today extends Component {
  static enhance = [i18nEnhance(localizedMessages)];

  render() {
    const SToday = Root;
    const { styles, getI18nText, disabled, onClick } = this.asProps;
    return sstyled(styles)(
      <SToday render={Box} __excludeProps={['onClick']}>
        <Button
          use='tertiary'
          children={getI18nText('today')}
          disabled={disabled}
          onClick={onClick}
        />
      </SToday>,
    );
  }
}

const DatePicker = createComponent(
  DatePickerRoot,
  {
    Trigger: InputTrigger,
    ButtonTrigger,
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
