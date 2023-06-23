import React from 'react';
import createComponent, { Component, sstyled, Root } from '@semcore/core';
import Input from '@semcore/input';
import { IncrementIcon, DecrementIcon } from './buttons';
import { localizedMessages } from './translations/__intergalactic-dynamic-locales';
import i18nEnhance from '@semcore/utils/lib/enhances/i18nEnhance';

import style from './style/input-number.shadow.css';

function parseValueWithMinMax(value, min = Number.MIN_SAFE_INTEGER, max = Number.MAX_SAFE_INTEGER) {
  return Math.max(min, Math.min(max, value));
}

class InputNumber extends Component {
  static displayName = 'InputNumber';
  static style = style;
  static enhance = [i18nEnhance(localizedMessages)];
  static defaultProps = {
    size: 'm',
    i18n: localizedMessages,
    locale: 'en',
  };

  inputRef = React.createRef();
  inputHandlersRef = React.createRef();

  increment = (event) => {
    // https://stackoverflow.com/questions/68010124/safari-number-input-stepup-stepdown-not-functioning-with-empty-value
    if (this.inputRef.current?.value === '')
      this.inputRef.current.value = this.inputRef.current.min || '0';
    this.inputRef.current?.stepUp?.();
    this.inputHandlersRef.current?.value(this.inputRef.current.value, event);
  };

  decrement = (event) => {
    if (this.inputRef.current?.value === '')
      this.inputRef.current.value = this.inputRef.current.max || '0';
    this.inputRef.current?.stepDown?.();
    this.inputHandlersRef.current?.value(this.inputRef.current.value, event);
  };

  getValueProps() {
    return {
      ref: this.inputRef,
      inputHandlerRefs: this.inputHandlersRef,
      increment: this.increment,
      decrement: this.decrement,
    };
  }

  getControlsProps() {
    const { size, getI18nText } = this.asProps;
    return {
      size,
      increment: this.increment,
      decrement: this.decrement,
      getI18nText,
    };
  }

  render() {
    const SInputNumber = Root;
    return sstyled(this.asProps.style)(<SInputNumber render={Input} />);
  }
}

class Value extends Component {
  static defaultProps = {
    defaultValue: '',
    step: 1,
  };

  inputRef = React.createRef();

  uncontrolledProps() {
    return {
      value: null,
    };
  }

  round(value, step) {
    const countDecimals = Math.floor(step) === step ? 0 : step.toString().split('.')[1].length || 0;
    return countDecimals === 0
      ? Number.parseFloat(value)
      : Number.parseFloat(value).toPrecision(countDecimals);
  }

  handleValidation = (event) => {
    const { value, min, max, step } = this.asProps;
    const roundCoefficient = step < 1 ? step.toString().split('.')[1].length : 1;
    if (Number.isNaN(event.currentTarget.valueAsNumber)) {
      event.currentTarget.value = '';
      this.handlers.value('', event);
    } else {
      let numberValue = parseValueWithMinMax(Number.parseFloat(value), min, max);
      const rounded = this.round(numberValue % step, step);
      if (rounded !== 0) {
        if (rounded >= step / 2) {
          numberValue += step - rounded;
        } else if (Math.abs(rounded) < step) {
          numberValue -= rounded;
        }
      }
      const numberValueRounded = Number(numberValue.toFixed(roundCoefficient));
      this.handlers.value(String(numberValueRounded), event);
    }
  };

  // https://stackoverflow.com/questions/57358640/cancel-wheel-event-with-e-preventdefault-in-react-event-bubbling
  componentDidMount() {
    this.inputRef.current?.addEventListener('wheel', this.handleWheel);
  }
  componentWillUnmount() {
    this.inputRef.current?.removeEventListener('wheel', this.handleWheel);
  }

  handleWheel = (event) => {
    if (event.target !== this.inputRef.current) return;
    if (document.activeElement !== this.inputRef.current) return;
    event.preventDefault();
    if (event.wheelDelta > 0) {
      this.asProps.increment(event);
    } else if (event.wheelDelta < 0) {
      this.asProps.decrement(event);
    }
  };

  render() {
    const SValue = Root;
    const SValueHidden = 'div';
    const { styles, inputHandlerRefs, value, min, max } = this.asProps;

    inputHandlerRefs.current = this.handlers;

    return sstyled(styles)(
      <>
        <SValue
          render={Input.Value}
          type='number'
          autoComplete='off'
          onBlur={this.handleValidation}
          onInvalid={this.handleValidation}
          ref={this.inputRef}
          aria-valuenow={value}
          aria-valuemin={min}
          aria-valuemax={max}
        />
        {/* the next hidden div is necessary for the screen reader to report the value
        in the input, because after validation the value can change to the `min` or `max` 
        if entered less than `min` or more than `max` */}
        <SValueHidden aria-live='polite' aria-atomic={true}>
          {value}
        </SValueHidden>
      </>,
    );
  }
}

function Controls(props) {
  const { Children, increment, decrement, size, styles, getI18nText } = props;
  const SControls = Root;
  const SUp = 'button';
  const SDown = 'button';

  return sstyled(styles)(
    <SControls render={Input.Addon} aria-hidden='true'>
      <SUp
        onClick={increment}
        tabIndex={-1}
        type='button'
        size={size}
        aria-label={getI18nText('increment')}
      >
        <IncrementIcon />
      </SUp>
      <SDown
        onClick={decrement}
        tabIndex={-1}
        type='button'
        size={size}
        aria-label={getI18nText('decrement')}
      >
        <DecrementIcon />
      </SDown>
      <Children />
    </SControls>,
  );
}

export default createComponent(InputNumber, {
  Value,
  Controls,
  Addon: Input.Addon,
});
