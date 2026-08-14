import { Box, ScreenReaderOnly } from '@semcore/base-components';
import type { Intergalactic } from '@semcore/core';
import { createComponent, Component, sstyled, Root } from '@semcore/core';
import propsObserver from '@semcore/core/lib/decorators/propsObserver';
import reactive from '@semcore/core/lib/decorators/reactive';
import i18nEnhance from '@semcore/core/lib/utils/enhances/i18nEnhance';
import Input from '@semcore/input';
import React from 'react';

import style from './time-picker.shadow.css';
import type { NSTimePicker } from './TimePicker.type';
import TimePickerEntity from '../../entity/TimePickerEntity';
import { localizedMessages } from '../../translations/__intergalactic-dynamic-locales';
import Format from '../PickerFormat/PickerFormat';
import { Hours, Minutes } from '../PickerInput/PickerInput';

@propsObserver(['value', 'is12Hour'])
class TimePickerRoot extends Component<
    Intergalactic.InternalTypings.InferComponentProps<NSTimePicker.Component>,
  typeof TimePickerRoot.enhance,
  { value: null },
  {},
  {},
  NSTimePicker.DefaultProps
  > {
  static displayName = 'TimePicker';
  static style = style;
  static enhance = [i18nEnhance(localizedMessages)] as const;

  static defaultProps = ({ is12Hour }: Intergalactic.InternalTypings.InferComponentProps<NSTimePicker.Component>) => ({
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
  } as const);

  hoursInputRef = React.createRef<HTMLElement>();
  minutesInputRef = React.createRef<HTMLElement>();

  state = {
    ariaLabel: '',
  };

  componentDidMount() {
    const { id, 'aria-describedby': ariaDescribedBy } = this.asProps;
    const selector = `[for=${id}]`;

    const element = document.querySelector(selector) ?? document.querySelector(`#${ariaDescribedBy}`);

    if (element) {
      this.setState({ ariaLabel: element.textContent });
    }
  }

  @reactive(['meridiem'], function () {
    this.forceUpdate();
  })
  readonly entity = new TimePickerEntity(this.props.value ?? this.props.defaultValue, this.props.is12Hour);

  onPropsChange(changedProps: Intergalactic.InternalTypings.InferComponentProps<NSTimePicker.Component>) {
    const { value, is12Hour } = changedProps;

    if (value !== undefined) {
      const [hours = '', minutes = ''] = value.split(':');

      this.entity.setMeridiemFromHours(hours);
      this.entity.hours = hours;
      this.entity.minutes = minutes;
    }

    if (is12Hour !== undefined) {
      this.entity.is12Hour = is12Hour;
    }
  }

  uncontrolledProps() {
    return {
      value: null,
    };
  }

  handleValueChange = (value: string, field: NSTimePicker.Field, event: React.SyntheticEvent) => {
    this.entity[field] = value;

    this.handlers.value(this.entity.toString(), event);
  };

  handleMeridiemClick = (event: React.SyntheticEvent) => {
    this.entity.toggleMeridiem();

    this.handlers.value(this.entity.toString(), event);
  };

  private getCommonPickerInputProps = () => {
    const { is12Hour, size, disabled, state } = this.asProps;

    return {
      size,
      is12Hour,
      disabled,
      $onValueChange: this.handleValueChange,
      minutesInputRef: this.minutesInputRef,
      hoursInputRef: this.hoursInputRef,
      state,
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
    const { styles, Children, value, is12Hour, getI18nText, id } = this.asProps;

    const time = `${this.entity.hours}:${this.entity.minutes}`;
    const meridiem = is12Hour ? this.entity.meridiem : '';

    const label = value
      ? `${this.state.ariaLabel} ${getI18nText('title', {
        time,
        meridiem,
      })}`
      : `${this.state.ariaLabel} ${getI18nText('titleEmpty')}`;

    return sstyled(styles)(
      <>
        <STimePicker render={Input} role='group' aria-label={label} __excludeProps={['value', 'id']}>
          <Children />
        </STimePicker>
        <ScreenReaderOnly tag='input' tabIndex={-1} id={id} aria-hidden={true} value={`${time} ${meridiem}`} readOnly />
      </>,
    );
  }
}
class Separator extends Component<
  Intergalactic.InternalTypings.InferChildComponentProps<NSTimePicker.Separator.Component, typeof TimePickerRoot, 'Separator'>
> {
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

export type TimePickerRootType = typeof TimePickerRoot;

/**
 * TimePicker
 *
 * {@link https://developer.semrush.com/intergalactic/components/time-picker/time-picker-api/|API} | {@link https://developer.semrush.com/intergalactic/components/time-picker/time-picker-code/|Examples}
 */
const TimePicker = createComponent<
  NSTimePicker.Component,
  TimePickerRootType
>(TimePickerRoot, {
  Hours,
  Minutes,
  Separator,
  Format,
});

export default TimePicker;
