import React from 'react';
import createComponent, { Component, sstyled, Root } from '@semcore/core';
import Input from '@semcore/input';
import { IncrementIcon, DecrementIcon } from './buttons';
import { localizedMessages } from './translations/__intergalactic-dynamic-locales';
import i18nEnhance from '@semcore/utils/lib/enhances/i18nEnhance';

import style from './style/input-number.shadow.css';
import { forkRef } from '@semcore/utils/lib/ref';

export function parseValueWithMinMax(
  value,
  min = Number.MIN_SAFE_INTEGER,
  max = Number.MAX_SAFE_INTEGER,
) {
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
  valueRef = React.createRef();

  increment = (event) => {
    // https://stackoverflow.com/questions/68010124/safari-number-input-stepup-stepdown-not-functioning-with-empty-value
    if (this.inputRef.current?.value === '')
      this.inputRef.current.value = this.inputRef.current.min || '0';
    this.inputRef.current?.stepUp?.();

    this.valueRef.current.setValue(this.inputRef.current.value, event);
  };

  decrement = (event) => {
    if (this.inputRef.current?.value === '')
      this.inputRef.current.value = this.inputRef.current.max || '0';
    this.inputRef.current?.stepDown?.();

    this.valueRef.current.setValue(this.inputRef.current.value, event);
  };

  getValueProps() {
    const numberFormatter = new Intl.NumberFormat(this.asProps.locale, { style: 'decimal' });

    return {
      inputNumberRef: this.inputRef,
      valueRef: this.valueRef,
      increment: this.increment,
      decrement: this.decrement,
      numberFormatter,
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
    value: '',
    step: 1,
  };

  valueInputRef = React.createRef();

  cursorPosition = -1;

  constructor(props) {
    super(props);

    const { parsedValue, displayValue } = this.valueParser(
      props.value,
      Value.defaultProps.value,
      '',
    );

    this.state = {
      value: parsedValue,
      displayValue,
    };
  }

  get separatorDecimal() {
    const { numberFormatter } = this.props;

    return numberFormatter.format(11.11).replace(/\d/g, '');
  }

  get separatorThousands() {
    const { numberFormatter } = this.props;

    return numberFormatter.format(1111).replace(/\d/g, '');
  }

  valueParser = (value, prevValue, prevDisplayValue) => {
    const { numberFormatter } = this.props;

    const stringNumber = value
      .replace(new RegExp(`[${this.separatorThousands}]`, 'g'), '')
      .replace(this.separatorDecimal, '.');

    if (
      stringNumber[stringNumber.length - 1] === '.' &&
      !Number.isNaN(Number(prevValue)) &&
      !stringNumber.slice(0, -1).includes('.')
    ) {
      if (value.length > prevValue.length) {
        // type new value
        return {
          parsedValue: prevValue + this.separatorDecimal,
          displayValue: numberFormatter.format(prevValue) + this.separatorDecimal,
        };
      } else {
        // backspace value
        return {
          parsedValue: stringNumber,
          displayValue: value,
        };
      }
    }

    if (Number.isNaN(Number(stringNumber))) {
      return {
        parsedValue: prevValue,
        displayValue: prevDisplayValue,
      };
    }

    return {
      parsedValue: stringNumber,
      displayValue: stringNumber === '' ? '' : numberFormatter.format(stringNumber),
    };
  };

  round(value, step) {
    const countDecimals = Math.floor(step) === step ? 0 : step.toString().split('.')[1].length || 0;
    return countDecimals === 0
      ? Number.parseFloat(value)
      : Number.parseFloat(value).toPrecision(countDecimals);
  }

  handleValidation = (event) => {
    const { value } = this.state;
    const { min, max, step, inputNumberRef } = this.asProps;
    const roundCoefficient = step < 1 ? step.toString().split('.')[1].length : 1;
    if (
      !inputNumberRef.current ||
      Number.isNaN(value) ||
      Number.isNaN(inputNumberRef.current.valueAsNumber)
    ) {
      event.currentTarget.value = '';
      this.setState({ value: '', displayValue: '' }, () => {
        if (value !== this.state.value) {
          this.asProps.onChange(this.state.value, event);
        }
      });
    } else {
      let numberValue = parseValueWithMinMax(
        Number.parseFloat(inputNumberRef.current?.valueAsNumber),
        min,
        max,
      );
      const rounded = this.round(numberValue % step, step);
      if (rounded !== 0) {
        if (rounded >= step / 2) {
          numberValue += step - rounded;
        } else if (Math.abs(rounded) < step) {
          numberValue -= rounded;
        }
      }
      const numberValueRounded = Number(numberValue.toFixed(roundCoefficient));

      this.setValue(String(numberValueRounded), event);
    }
  };

  // https://stackoverflow.com/questions/57358640/cancel-wheel-event-with-e-preventdefault-in-react-event-bubbling
  componentDidMount() {
    this.valueInputRef.current?.addEventListener('wheel', this.handleWheel);
  }
  componentWillUnmount() {
    this.valueInputRef.current?.removeEventListener('wheel', this.handleWheel);
  }

  componentDidUpdate(prevProps, prevState) {
    const value = this.asProps.value;
    if (prevState.value !== value) {
      const { parsedValue, displayValue } = this.valueParser(
        value,
        prevState.value,
        prevState.displayValue,
      );

      this.setState({
        value: parsedValue,
        displayValue,
      });
    }
  }

  handleWheel = (event) => {
    if (event.target !== this.valueInputRef.current) return;
    if (document.activeElement !== this.valueInputRef.current) return;
    event.preventDefault();
    if (event.wheelDelta > 0) {
      this.asProps.increment(event);
    } else if (event.wheelDelta < 0) {
      this.asProps.decrement(event);
    }
  };

  handleChange = (event) => {
    const value = event.currentTarget.value;

    if (value === '-') {
      this.setState(
        {
          value,
          displayValue: value,
        },
        () => {
          this.asProps.onChange(value, event);
        },
      );
    } else {
      this.setValue(value, event);
    }

    return false;
  };

  setValue = (newValue, event) => {
    const prevValue = this.state.value;
    this.setState(
      (state) => {
        const { parsedValue, displayValue } = this.valueParser(
          newValue,
          state.value,
          state.displayValue,
        );

        return {
          value: parsedValue,
          displayValue,
        };
      },
      () => {
        if (prevValue !== this.state.value) {
          this.asProps.onChange(this.state.value, event);
        }
      },
    );
  };

  handleKeyUp = (event) => {
    if (event.key === 'Shift') {
      this.cursorPosition = -1;
    }

    const element = event.currentTarget;

    element.role = 'input';
  };

  handleKeyDown = (event) => {
    const element = event.currentTarget;
    const value = element.value;
    const length = value.length;

    // we need this dirty hack for screen readers, because they couldn't read full value in input after adding there ','.
    // so, we change role to `region` here and back to `input` in handleKeyUp
    element.role = 'region';

    if (
      element.selectionStart !== length &&
      (event.key === 'Backspace' ||
        event.key === this.separatorDecimal ||
        ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'].includes(event.key))
    ) {
      const afterSelection = value.slice(element.selectionEnd);

      requestAnimationFrame(() => {
        const newValue = this.state.displayValue;
        const index = newValue.lastIndexOf(afterSelection);
        const selectionStart = index;
        const selectionEnd = index;

        element.setSelectionRange(selectionStart, selectionEnd);
      });
    }

    // For correct moving cursor with skip separatorThousands.
    // Examples:
    // - Press ArrowLeft: `12,3|4 -> 12|,34`
    // - Press ArrowRight: `1|,55 -> 1,5|5`
    const cursorIndex = 2;

    if (event.shiftKey && this.cursorPosition === -1) {
      this.cursorPosition = element.selectionStart;
    }

    if (this.cursorPosition !== -1) {
      if (event.key === 'ArrowLeft') {
        event.preventDefault();

        if (
          element.selectionStart <= this.cursorPosition &&
          element.selectionEnd === this.cursorPosition
        ) {
          element.setSelectionRange(
            value[element.selectionStart - cursorIndex] === this.separatorThousands
              ? element.selectionStart - cursorIndex
              : element.selectionStart - 1,
            element.selectionEnd,
          );
          return;
        } else {
          element.setSelectionRange(
            element.selectionStart,
            value[element.selectionEnd - cursorIndex] === this.separatorThousands
              ? element.selectionEnd - cursorIndex
              : element.selectionEnd - 1,
          );
          return;
        }
      } else if (event.key === 'ArrowRight') {
        event.preventDefault();

        if (
          element.selectionEnd >= this.cursorPosition &&
          element.selectionStart === this.cursorPosition
        ) {
          element.setSelectionRange(
            element.selectionStart,
            value[element.selectionEnd] === this.separatorThousands
              ? element.selectionEnd + cursorIndex
              : element.selectionEnd + 1,
          );
          return;
        } else {
          element.setSelectionRange(
            value[element.selectionStart] === this.separatorThousands
              ? element.selectionStart + cursorIndex
              : element.selectionStart + 1,
            element.selectionEnd,
          );
          return;
        }
      }
    } else {
      if (event.key === 'ArrowLeft') {
        event.preventDefault();
        const nextPosition = element.selectionStart - 1;

        element.setSelectionRange(
          value[element.selectionStart - cursorIndex] === this.separatorThousands
            ? element.selectionStart - cursorIndex
            : nextPosition,
          value[element.selectionStart - cursorIndex] === this.separatorThousands
            ? element.selectionStart - cursorIndex
            : nextPosition,
        );
        return;
      }
      if (event.key === 'ArrowRight') {
        event.preventDefault();
        const nextPosition = element.selectionEnd + 1;

        event.preventDefault();
        element.setSelectionRange(
          value[element.selectionEnd] === this.separatorThousands
            ? element.selectionEnd + cursorIndex
            : nextPosition,
          value[element.selectionEnd] === this.separatorThousands
            ? element.selectionEnd + cursorIndex
            : nextPosition,
        );
        return;
      }
    }

    if (event.key === 'ArrowDown') {
      event.preventDefault();
      this.asProps.decrement(event);
      return;
    }
    if (event.key === 'ArrowUp') {
      event.preventDefault();
      this.asProps.increment(event);
      return;
    }
  };

  handleClick = (event) => {
    const element = event.target;
    const value = element.value;

    if (value[element.selectionStart - 1] === this.separatorThousands) {
      element.setSelectionRange(element.selectionStart - 1, element.selectionEnd - 1);
    }
  };

  render() {
    const SValue = Root;
    const SValueHidden = 'div';
    const { styles, min, max, step, valueRef, forwardRef, inputNumberRef } = this.asProps;
    const { value, displayValue } = this.state;

    valueRef.current = {
      setValue: this.setValue,
    };

    return sstyled(styles)(
      <>
        <SValue
          render={Input.Value}
          autoComplete='off'
          onBlur={this.handleValidation}
          use:onChange={this.handleChange}
          onKeyDown={this.handleKeyDown}
          onKeyUp={this.handleKeyUp}
          onClick={this.handleClick}
          use:ref={this.valueInputRef}
          use:value={displayValue}
          inputMode='decimal'
        />
        <input
          type={'number'}
          ref={forkRef(forwardRef, inputNumberRef)}
          hidden={true}
          autoComplete='off'
          onInvalid={this.handleValidation}
          value={value}
          readOnly={true}
          aria-valuenow={value}
          aria-valuemin={min}
          aria-valuemax={max}
          min={min}
          max={max}
          step={step}
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
