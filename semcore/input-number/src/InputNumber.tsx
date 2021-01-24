import React, { HTMLAttributes, InputHTMLAttributes } from 'react';
import createComponent, { Component, Merge, PropGetter, styled } from '@semcore/core';
import BUTTONS from './buttons';
import Input, { IInputAddonProps, IInputProps, IInputValueProps } from '@semcore/input';
import { callAllEventHandlers } from '@semcore/utils/lib/assignProps';

import style from './style/input-number.shadow.css';

export type InputNumberValue = string | number | null;
export type InputNumberSize = 'm' | 'l' | 'xl';

export interface IInputNumberProps extends IInputProps {
  /** Input size
   * @default m
   * */
  size?: InputNumberSize;
}

export interface IInputNumberValueProps extends IInputValueProps {
  /** Minimum value
   * @default Number.MIN_SAFE_INTEGER
   */
  min?: number;
  /** Maximum value
   * @default Number.MAX_SAFE_INTEGER
   */
  max?: number;
  /** Value change step
   * @default 1
   */
  step?: number;
  /** Numeric value */
  value?: InputNumberValue;
  /** Called when the input value changes, it returns its current value in numeric format */
  onChange?: (value: InputNumberValue, event?: React.SyntheticEvent<HTMLInputElement>) => void;
}

export interface IInputNumberControlsProps extends IInputAddonProps {
  /** Always displays controls (steppers)
   * @default false
   */
  showControls?: boolean;
}

export interface IInputNumberContext extends IInputNumberProps {
  getValueProps: PropGetter<InputNumber['getValueProps']>;
  getControlsProps: PropGetter<InputNumber['getControlsProps']>;
}

function floatOrDefault(value, def = 0) {
  const number = Number.parseFloat(value);
  return Number.isNaN(number) ? def : number;
}

function countFloat(value) {
  const result = value.toString().match(/,\w+|\.\w+/);
  return result ? result[0].length - 1 : 0;
}

function valueToNumber(value, defValue = NaN) {
  const newValue = floatOrDefault(value);
  if (newValue.toString() !== value.toString()) {
    return defValue;
  }
  return newValue;
}

function formatToFixed(a, b, result) {
  const toFixed = Math.max(countFloat(a), countFloat(b));
  return result.toFixed(toFixed);
}

function parseValueWithMinMax(max, min, value) {
  return Math.max(min, Math.min(max, value));
}

const IconUp = ({ size }) => BUTTONS.up[size] || BUTTONS.up['m'];
const IconDown = ({ size }) => BUTTONS.down[size] || BUTTONS.down['m'];

class InputNumber extends Component<IInputNumberProps> {
  static displayName = 'InputNumber';
  static style = style;
  static defaultProps = {
    size: 'm',
  };

  state = {
    inc: () => {},
    dec: () => {},
  };

  registerValueChangers = (obj) => {
    this.setState({
      ...obj,
    });
  };

  getValueProps() {
    return {
      registerValueChangers: this.registerValueChangers,
    };
  }

  getControlsProps() {
    const { size } = this.asProps;
    const { inc, dec } = this.state;
    return {
      size,
      inc: inc,
      dec: dec,
    };
  }

  render() {
    const { Root: SInputNumber } = this;
    const { Children, style } = this.asProps;

    return styled(style)(<SInputNumber render={Input}>{Children.origin}</SInputNumber>);
  }
}

class Value extends Component<IInputNumberValueProps> {
  static defaultProps = {
    defaultValue: '',
    min: Number.MIN_SAFE_INTEGER,
    max: Number.MAX_SAFE_INTEGER,
    step: 1,
  };

  state = {
    dirtyValue: undefined,
    prevNumberValue: 0,
  };

  uncontrolledProps() {
    return {
      value: (value) => value,
    };
  }

  static getDerivedStateFromProps = (props, state) => {
    return {
      prevNumberValue: floatOrDefault(props.value !== undefined ? props.value : state.value),
    };
  };

  constructor(props) {
    super(props);
    props.registerValueChangers({
      inc: this.inc,
      dec: this.dec,
    });
  }

  get value() {
    const { value } = this.asProps;
    return value === null ? '' : value;
  }

  get inc() {
    return (e) => {
      const { value } = this;
      const { prevNumberValue } = this.state;
      const { step, max, min } = this.asProps;
      const numberValue = valueToNumber(value, prevNumberValue);
      this.updateValue(
        parseValueWithMinMax(max, min, formatToFixed(value, step, numberValue + Number(step))),
        e,
      );
    };
  }

  get dec() {
    return (e) => {
      const { value } = this;
      const { prevNumberValue } = this.state;
      const { step, max, min } = this.asProps;
      const numberValue = valueToNumber(value, prevNumberValue);
      this.updateValue(
        parseValueWithMinMax(max, min, formatToFixed(value, step, numberValue - step)),
        e,
      );
    };
  }

  updateValue = (value, e) => {
    this.setState({ dirtyValue: undefined });
    this.handlers.value(value, e);
  };

  submitChanges = (e) => {
    const { value } = this;
    const { prevNumberValue, dirtyValue } = this.state;
    const { max, min } = this.asProps;
    if (dirtyValue) {
      const numberValue = parseValueWithMinMax(max, min, prevNumberValue);
      this.updateValue(numberValue, e);
      return;
    }
    if (value === '') return;

    const numberValue = parseValueWithMinMax(max, min, valueToNumber(value, prevNumberValue));

    if (numberValue !== prevNumberValue) {
      this.updateValue(numberValue, e);
    }
  };

  handleChange = (value, e) => {
    e.preventDefault();
    const numberValue = valueToNumber(value);
    if (!value.length) {
      this.updateValue(value, e);
      return;
    }

    if (Number.isNaN(numberValue)) {
      this.setState({ dirtyValue: value });
    } else {
      this.updateValue(numberValue, e);
    }
  };

  handleKeyDown = (e) => {
    switch (e.keyCode) {
      case 38:
        e.preventDefault();
        this.inc(e);
        break;
      case 40:
        e.preventDefault();
        this.dec(e);
        break;
      case 13:
        this.submitChanges(e);
        break;
    }
  };

  handleBlur = (e) => this.submitChanges(e);

  render() {
    const SValue = Input.Value;
    const {
      styles,
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      value,
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      onChange,
      disabled,
      onKeyDown,
      onBlur,
      ...other
    } = this.asProps;
    const { dirtyValue } = this.state;

    return styled(styles)(
      <SValue
        value={dirtyValue || this.value}
        disabled={disabled}
        onChange={this.handleChange}
        onKeyDown={callAllEventHandlers(onKeyDown, this.handleKeyDown)}
        onBlur={callAllEventHandlers(onBlur, this.handleBlur)}
        {...other}
      />,
    );
  }
}

function Controls(props) {
  const { Root: SControls, Children, showControls, inc, dec, size, styles } = props;
  const SUp = 'button';
  const SDown = 'button';

  return styled(styles)(
    <SControls render={Input.Addon} size={size} showControls={showControls}>
      <SUp
        onClick={inc}
        tabIndex={-1}
        type="button"
        // @ts-ignore
        size={size}
      >
        <IconUp size={size} />
      </SUp>
      <SDown
        onClick={dec}
        tabIndex={-1}
        type="button"
        // @ts-ignore
        size={size}
      >
        <IconDown size={size} />
      </SDown>
      <Children />
    </SControls>,
  );
}

export default createComponent<
  Merge<IInputNumberProps, HTMLAttributes<HTMLDivElement>>,
  {
    Value: Merge<IInputNumberValueProps, InputHTMLAttributes<HTMLSpanElement>>;
    Controls: Merge<IInputNumberControlsProps, HTMLAttributes<HTMLSpanElement>>;
    Addon: Merge<IInputAddonProps, HTMLAttributes<HTMLSpanElement>>;
  },
  IInputNumberContext
>(InputNumber, {
  Value,
  Controls,
  Addon: Input.Addon,
});
