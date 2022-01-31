import React from 'react';
import createComponent, { Component, sstyled, Root } from '@semcore/core';
import Input from '@semcore/input';
import { Box } from '@semcore/flex-box';
import { Hours, Minutes } from './PickerInput';
import Format from './PickerFormat';

import style from './style/time-picker.shadow.css';

const MAP_MERIDIEM = {
  AM: 'PM',
  PM: 'AM',
};
const MAP_FIELD_TO_TIME = {
  hours: 0,
  minutes: 1,
};

export function nextInput(element) {
  do {
    element = element.nextElementSibling;
  } while (element && element.tagName !== 'INPUT');
  return element;
}

export function prevInput(element) {
  do {
    element = element.previousElementSibling;
  } while (element && element.tagName !== 'INPUT');
  return element;
}

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
  if (nHours > 12) return nHours - 12; // 22 => 12 PM

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
  });

  _lastMeridiem = 'AM'; // default AM

  uncontrolledProps() {
    return {
      value: null,
    };
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

  getHoursProps = () => {
    const { is12Hour, size, disabled } = this.asProps;
    const time = this.valueToTime(this.value);

    return {
      time,
      size,
      is12Hour,
      disabled,
      $onValueChange: this.handleValueChange,
    };
  };

  getMinutesProps = () => {
    return this.getHoursProps();
  };

  getFormatProps = () => {
    const { size, disabled, disablePortal } = this.asProps;
    return {
      size,
      disabled,
      disablePortal,
      meridiem: this.meridiem,
      onClick: this.handleMeridiemClick,
    };
  };

  render() {
    const STimePicker = Root;
    const { styles, Children } = this.asProps;

    return sstyled(styles)(
      <STimePicker render={Input}>
        <Children />
      </STimePicker>,
    );
  }
}

class Separator extends Component {
  static defaultProps = {
    children: ':',
  };

  $el = React.createRef();

  handlerClick = () => {
    if (this.$el.current) {
      prevInput(this.$el.current)?.focus();
    }
  };

  render() {
    return <Root render={Box} ref={this.$el} onClick={this.handlerClick} />;
  }
}

const TimePicker = createComponent(TimePickerRoot, {
  Hours,
  Minutes,
  Separator,
  Format,
});

export default TimePicker;
