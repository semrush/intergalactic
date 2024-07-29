import React from 'react';
import createComponent, { Component, sstyled, Root } from '@semcore/core';
import Input from '@semcore/input';
import { Box } from '@semcore/flex-box';
import { Hours, Minutes } from './PickerInput';
import Format from './PickerFormat';
import { localizedMessages } from './translations/__intergalactic-dynamic-locales';
import i18nEnhance from '@semcore/utils/lib/enhances/i18nEnhance';

import style from './style/time-picker.shadow.css';
import keyboardFocusEnhance from '@semcore/utils/lib/enhances/keyboardFocusEnhance';

const MAP_MERIDIEM = {
  AM: 'PM',
  PM: 'AM',
};
const MAP_FIELD_TO_TIME = {
  hours: 0,
  minutes: 1,
};

export function intOrDefault(value, def = 0) {
  const number = Number.parseInt(value);
  return Number.isNaN(number) ? def : number;
}

export function withLeadingZero(value) {
  value = String(value);
  if (value.length === 1) return `0${value}`;
  return String(value);
}

export function meridiemByHours(hours) {
  return hours >= 12 ? 'PM' : 'AM';
}

export function formatHoursTo12(hours /* hours by 24 */) {
  const nHours = intOrDefault(hours, NaN); // if not (:00)
  if (Number.isNaN(nHours)) return hours;

  // if not (HH:00)
  if (nHours === 0) return 12; // 0 => 12 PM
  if (nHours > 12) return nHours - 12; // 22 => 10 PM

  return hours;
}

export function formatHoursTo24(hours /* hours by 12 */, meridiem) {
  const nHours = intOrDefault(hours, NaN); // if not (:00)

  if (Number.isNaN(nHours)) return hours;

  if (meridiem === 'AM') {
    if (nHours === 12) return 0; // 12 AM => 0
  }

  if (meridiem === 'PM') {
    if (nHours < 12) return nHours + 12; // 10 PM => 22
  }

  return hours;
}

class TimePickerRoot extends Component {
  static displayName = 'TimePicker';
  static style = style;
  static enhance = [i18nEnhance(localizedMessages), keyboardFocusEnhance()];
  static defaultProps = ({ is12Hour }) => ({
    defaultValue: '',
    size: 'm',
    children: (
      <>
        <TimePicker.Hours />
        <TimePicker.Separator />
        <TimePicker.Minutes />
        {is12Hour && <TimePicker.Format />}
      </>
    ),
    i18n: localizedMessages,
    locale: 'en',
    defaultTitle: '',
  });

  hoursInputRef = React.createRef();
  minutesInputRef = React.createRef();

  _lastMeridiem = 'AM'; // default AM

  uncontrolledProps() {
    return {
      value: null,
      title: null,
    };
  }

  componentDidMount() {
    const { id, 'aria-describedby': ariaDescribedBy } = this.asProps;
    const selector = `[for=${id}]`;
    const titleElement =
      document.querySelector(selector) ?? document.querySelector(`#${ariaDescribedBy}`);

    if (titleElement) {
      this.handlers.title(titleElement.textContent);
    }
  }

  get value() {
    const { value } = this.asProps;
    return value === null || value === undefined ? ':' : value;
  }

  get meridiem() {
    const { value } = this.asProps;
    const [hours = ''] = value.split(':');

    const nHours = intOrDefault(hours, NaN);

    if (!Number.isNaN(nHours)) {
      this._lastMeridiem = meridiemByHours(nHours);
    }

    return this._lastMeridiem;
  }

  valueToTime(value) {
    const { is12Hour } = this.asProps;
    let [hours = '', minutes = ''] = value.split(':');

    if (is12Hour) hours = formatHoursTo12(hours);

    hours = withLeadingZero(hours);
    minutes = withLeadingZero(minutes);

    return [hours, minutes];
  }

  timeToValue(time, meridiem) {
    const { is12Hour } = this.asProps;
    let [hours = '', minutes = ''] = time;

    hours = intOrDefault(hours, hours); // 03 => 3
    minutes = intOrDefault(minutes, minutes); // MM => MM

    if (is12Hour) hours = formatHoursTo24(hours, meridiem); // 12 PM -> 0

    return `${hours}:${minutes}`;
  }

  handleValueChange = (value, field, event) => {
    const { is12Hour } = this.asProps;
    const { meridiem } = this;

    let time;
    if (field) {
      time = this.value.split(':');
      time[MAP_FIELD_TO_TIME[field]] = value;
    } else {
      time = value.split(':');
    }

    let [hours = '', minutes = ''] = time;

    if (is12Hour) hours = String(formatHoursTo12(hours));

    value = this.timeToValue([hours, minutes], meridiem);
    this.handlers.value(value, event);
  };

  handleMeridiemClick = (event) => {
    const { is12Hour } = this.asProps;
    let { value, meridiem } = this;
    let [hours = '', minutes = ''] = value.split(':');

    if (is12Hour) hours = String(formatHoursTo12(hours));

    value = this.timeToValue([hours, minutes], MAP_MERIDIEM[meridiem]);
    this.handlers.value(value, event);
  };

  _getHoursAndMinutesProps = () => {
    const { is12Hour, size, disabled, getI18nText } = this.asProps;
    const time = this.valueToTime(this.value);

    return {
      time,
      size,
      is12Hour,
      disabled,
      $onValueChange: this.handleValueChange,
      minutesInputRef: this.minutesInputRef,
      hoursInputRef: this.hoursInputRef,
      _getI18nText: getI18nText,
    };
  };

  getHoursProps = () => {
    return { ...this._getHoursAndMinutesProps(), ref: this.hoursInputRef };
  };
  getMinutesProps = () => {
    return { ...this._getHoursAndMinutesProps(), ref: this.minutesInputRef };
  };

  getSeparatorProps() {
    return {
      disabled: this.asProps.disabled,
      hoursInputRef: this.hoursInputRef,
    };
  }

  getFormatProps() {
    const { size, disabled, disablePortal, getI18nText } = this.asProps;

    return {
      size,
      disabled,
      disablePortal,
      meridiem: this.meridiem,
      onClick: this.handleMeridiemClick,
      getI18nText,
    };
  }

  render() {
    const STimePicker = Root;
    const { styles, Children, value, is12Hour, getI18nText, title } = this.asProps;
    const [hours, minutes] = this.valueToTime(this.value);

    const label = value
      ? `${title} ${getI18nText('title', {
          time: `${hours}:${withLeadingZero(minutes)}`,
          meridiem: is12Hour ? this.meridiem : '',
        })}`
      : `${title} ${getI18nText('titleEmpty')}`;

    return sstyled(styles)(
      <>
        <STimePicker
          render={Input}
          role={'group'}
          aria-label={label}
          __excludeProps={['value', 'title']}
        >
          <Children />
        </STimePicker>
      </>,
    );
  }
}

class Separator extends Component {
  static defaultProps = {
    children: ':',
  };

  handlerClick = () => {
    if (this.asProps.hoursInputRef.current) {
      this.asProps.hoursInputRef.current?.focus();
    }
  };

  render() {
    const STimePickerSeparator = Root;
    const { styles } = this.asProps;

    return sstyled(styles)(
      <STimePickerSeparator render={Box} onClick={this.handlerClick} aria-hidden='true' />,
    );
  }
}

const TimePicker = createComponent(TimePickerRoot, {
  Hours,
  Minutes,
  Separator,
  Format,
});

export default TimePicker;
