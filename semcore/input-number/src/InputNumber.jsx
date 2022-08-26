import React from 'react';
import createComponent, { Component, sstyled, Root } from '@semcore/core';
import Input from '@semcore/input';
import BUTTONS from './buttons';

import style from './style/input-number.shadow.css';

function parseValueWithMinMax(value, min = Number.MIN_SAFE_INTEGER, max = Number.MAX_SAFE_INTEGER) {
  return Math.max(min, Math.min(max, value));
}

const IconUp = () => BUTTONS.up;
const IconDown = () => BUTTONS.down;

class InputNumber extends Component {
  static displayName = 'InputNumber';
  static style = style;
  static defaultProps = {
    size: 'm',
  };

  inputRef = React.createRef();
  inputHandlersRef = React.createRef();

  handlerInc = (e) => {
    // TODO: IE11 dont work
    this.inputRef.current?.stepUp && this.inputRef.current?.stepUp();
    this.inputHandlersRef.current?.value(this.inputRef.current.value, e);
  };

  handlerDec = (e) => {
    // TODO: IE11 dont work
    this.inputRef.current?.stepDown && this.inputRef.current?.stepDown();
    this.inputHandlersRef.current?.value(this.inputRef.current.value, e);
  };

  getValueProps() {
    return {
      ref: this.inputRef,
      $inputHandlers: this.inputHandlersRef,
    };
  }

  getControlsProps() {
    const { size } = this.asProps;
    return {
      size,
      inc: this.handlerInc,
      dec: this.handlerDec,
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

  uncontrolledProps() {
    return {
      value: null,
    };
  }

  roundRemainder(value, step) {
    const countDecimals = Math.floor(step) === step ? 0 : step.toString().split('.')[1].length || 0;
    return countDecimals === 0
      ? Number.parseFloat(value)
      : Number.parseFloat(value).toPrecision(countDecimals);
  }

  handleValidation = (e) => {
    const { value, min, max, step } = this.asProps;
    const roundCoefficient = step < 1 ? step.toString().split('.')[1].length : 1;
    if (Number.isNaN(e.currentTarget.valueAsNumber)) {
      e.currentTarget.value = '';
      this.handlers.value('', e);
    } else {
      let numberValue = parseValueWithMinMax(Number.parseFloat(value), min, max);
      const r = this.roundRemainder(numberValue % step, step);
      if (r !== 0) {
        if (r >= step / 2) {
          numberValue += step - r;
        } else if (Math.abs(r) < step) {
          numberValue -= r;
        }
      }
      const numberValueRounded = Number(numberValue.toFixed(roundCoefficient));
      this.handlers.value(String(numberValueRounded), e);
    }
  };

  render() {
    const SValue = Root;
    const { styles, $inputHandlers, value, min, max } = this.asProps;

    // 🐒 не делайте так
    $inputHandlers.current = this.handlers;

    return sstyled(styles)(
      <SValue
        render={Input.Value}
        type="number"
        autoComplete="off"
        onBlur={this.handleValidation}
        onInvalid={this.handleValidation}
        aria-valuenow={value}
        aria-valuemin={min}
        aria-valuemax={max}
      />,
    );
  }
}

function Controls(props) {
  const { Children, inc, dec, size, styles } = props;
  const SControls = Root;
  const SUp = 'button';
  const SDown = 'button';

  return sstyled(styles)(
    <SControls render={Input.Addon}>
      <SUp onClick={inc} tabIndex={-1} type="button" size={size} aria-label="Increment number">
        <IconUp />
      </SUp>
      <SDown onClick={dec} tabIndex={-1} type="button" size={size} aria-label="Decrement number">
        <IconDown />
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
