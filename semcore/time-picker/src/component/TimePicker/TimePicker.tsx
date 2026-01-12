import { createComponent, Component, sstyled, Root } from '@semcore/core';
import propsObserver from '@semcore/core/lib/decorators/propsObserver';
import reactive from '@semcore/core/lib/decorators/reactive';
import i18nEnhance from '@semcore/core/lib/utils/enhances/i18nEnhance';
import { Box } from '@semcore/flex-box';
import Input from '@semcore/input';
import React from 'react';

import style from './time-picker.shadow.css';
import type {
  TimePickerComponent,
  TimePickerProps,
  TimePickerField,
  TimePickerSeparatorProps,
} from './TimePicker.type';
import TimePickerEntity from '../../entity/TimePickerEntity';
import { localizedMessages } from '../../translations/__intergalactic-dynamic-locales';
import Format from '../PickerFormat/PickerFormat';
import { Hours, Minutes } from '../PickerInput/PickerInput';

@propsObserver(['value'])
class TimePickerRoot extends Component<TimePickerProps, {}, {}, typeof TimePickerRoot.enhance> {
  static displayName = 'TimePicker';
  static style = style;
  static enhance = [i18nEnhance(localizedMessages)] as const;
  static defaultProps = ({ is12Hour }: TimePickerProps) => ({
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
    locale: 'en',
  });

  hoursInputRef = React.createRef<HTMLElement>();
  minutesInputRef = React.createRef<HTMLElement>();

  @reactive(['meridiem'], function () {
    this.forceUpdate();
  })
  readonly entity = new TimePickerEntity(this.props.value, this.props.is12Hour);

  onPropsChange(changedProps: TimePickerProps) {
    const { value } = changedProps;

    if (!value) return;

    const [hours = '', minutes = ''] = value.split(':');

    this.entity.hours = hours;
    this.entity.minutes = minutes;
  }

  uncontrolledProps() {
    return {
      value: null,
    };
  }

  handleValueChange = (value: string, field: TimePickerField, event: React.SyntheticEvent) => {
    this.entity[field] = value;

    this.handlers.value(this.entity.toString(), event);
  };

  handleMeridiemClick = (event: React.SyntheticEvent) => {
    this.entity.toggleMeridiem();

    this.handlers.value(this.entity.toString(), event);
  };

  private getCommonPickerInputProps = () => {
    const { is12Hour, size, disabled } = this.asProps;

    return {
      size,
      is12Hour,
      disabled,
      $onValueChange: this.handleValueChange,
      minutesInputRef: this.minutesInputRef,
      hoursInputRef: this.hoursInputRef,
    };
  };

  getHoursProps = () => {
    return {
      ...this.getCommonPickerInputProps(),
      time: this.entity.hours,
      ariaLabel: this.asProps.getI18nText('hours'),
      ref: this.hoursInputRef,
    };
  };

  getMinutesProps = () => {
    return {
      ...this.getCommonPickerInputProps(),
      time: this.entity.minutes,
      ariaLabel: this.asProps.getI18nText('minutes'),
      ref: this.minutesInputRef,
    };
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
      meridiem: this.entity.meridiem,
      onClick: this.handleMeridiemClick,
      getI18nText,
    };
  }

  render() {
    const STimePicker = Root;
    const { styles, Children, value, is12Hour, getI18nText } = this.asProps;
    const label = value
      ? `${getI18nText('title', {
        time: this.entity.toString(),
        meridiem: is12Hour ? this.entity.meridiem : '',
      })}`
      : `${getI18nText('titleEmpty')}`;

    return sstyled(styles)(
      <>
        <STimePicker render={Input} role='group' aria-label={label} __excludeProps={['value']}>
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
