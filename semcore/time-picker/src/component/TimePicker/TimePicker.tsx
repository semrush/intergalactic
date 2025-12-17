import { createComponent, Component, sstyled, Root } from '@semcore/core';
import i18nEnhance from '@semcore/core/lib/utils/enhances/i18nEnhance';
import { Box } from '@semcore/flex-box';
import Input from '@semcore/input';
import React from 'react';

import style from './time-picker.shadow.css';
import type {
  TimePickerComponent,
  TimePickerProps,
  TimePickerMeridiem,
  TimePickerField,
  TimePickerSeparatorProps,
} from './TimePicker.type';
import TimePickerTime from '../../entity/TimePickerTime';
import { localizedMessages } from '../../translations/__intergalactic-dynamic-locales';
import { meridiemByHours } from '../../utils';
import Format from '../PickerFormat/PickerFormat';
import { Hours, Minutes } from '../PickerInput/PickerInput';

const MAP_MERIDIEM: { [key in TimePickerMeridiem]: TimePickerMeridiem } = {
  AM: 'PM',
  PM: 'AM',
};

class TimePickerRoot extends Component<TimePickerProps, {}, {}, typeof TimePickerRoot.enhance> {
  static displayName = 'TimePicker';
  static style = style;
  static enhance = [i18nEnhance(localizedMessages)] as const;
  static defaultProps = ({ is12Hour }: TimePickerProps) => ({
    defaultValue: '',
    defaultTitle: '',
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
  });

  hoursInputRef = React.createRef<HTMLElement>();
  minutesInputRef = React.createRef<HTMLElement>();

  private lastMeridiem: TimePickerMeridiem = 'AM'; // default AM

  uncontrolledProps() {
    return {
      value: null,
      title: null,
    };
  }

  componentDidMount() {
    const { id, 'aria-describedby': ariaDescribedBy } = this.asProps;
    const selector = `[for=${id}]`;
    const titleElement = document.querySelector(selector) ?? document.querySelector(`#${ariaDescribedBy}`);
    if (titleElement) {
      this.handlers.title(titleElement.textContent);
    }
  }

  get splitValue() {
    const { value = ':' } = this.asProps;
    const [hours = '', minutes = ''] = value.split(':');

    return [hours, minutes];
  }

  get meridiem() {
    const [hours] = this.splitValue;

    const numberHours = Number.parseInt(hours);

    if (!Number.isNaN(numberHours)) {
      this.lastMeridiem = meridiemByHours(numberHours);
    }

    return this.lastMeridiem;
  }

  get currentTime(): TimePickerTime {
    const { is12Hour } = this.asProps;
    const [hours, minutes] = this.splitValue;

    return new TimePickerTime(hours, minutes, { is12Hour, meridiem: this.meridiem });
  }

  handleValueChange = (value: string, field: TimePickerField, event: React.SyntheticEvent) => {
    const time = this.currentTime;
    time[field] = value;

    this.handlers.value(time.toString(), event);
  };

  handleMeridiemClick = (event: React.SyntheticEvent) => {
    const time = this.currentTime;

    time.options = {
      ...time.options,
      meridiem: MAP_MERIDIEM[this.meridiem],
    };

    this.handlers.value(time.toString(), event);
  };

  _getHoursAndMinutesProps = () => {
    const { is12Hour, size, disabled, getI18nText } = this.asProps;

    return {
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
    return { ...this._getHoursAndMinutesProps(), time: this.currentTime.hours, ref: this.hoursInputRef };
  };

  getMinutesProps = () => {
    return { ...this._getHoursAndMinutesProps(), time: this.currentTime.minutes, ref: this.minutesInputRef };
  };

  getSeparatorProps() {
    return {
      disabled: this.asProps.disabled,
      hoursInputRef: this.hoursInputRef,
    };
  }

  getFormatProps() {
    const { size, disabled, getI18nText } = this.asProps;
    return {
      size,
      disabled,
      meridiem: this.meridiem,
      onClick: this.handleMeridiemClick,
      getI18nText,
    };
  }

  render() {
    const STimePicker = Root;
    const { styles, Children, value, is12Hour, getI18nText, title } = this.asProps;
    const time = this.currentTime;
    const label = value
      ? `${title} ${getI18nText('title', {
        time: time.toString(),
        meridiem: is12Hour ? this.meridiem : '',
      })}`
      : `${title} ${getI18nText('titleEmpty')}`;
    return sstyled(styles)(
      <>
        <STimePicker render={Input} role='group' aria-label={label} __excludeProps={['value', 'title']}>
          <Children />
        </STimePicker>
      </>,
    );
  }
}
class Separator extends Component<TimePickerSeparatorProps> {
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
    return sstyled(styles)(<STimePickerSeparator render={Box} onClick={this.handlerClick} aria-hidden='true' />);
  }
}

const TimePicker = createComponent(TimePickerRoot, {
  Hours,
  Minutes,
  Separator,
  Format,
}) as TimePickerComponent;

export default TimePicker;
