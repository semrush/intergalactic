import React from 'react';
import { createComponent, Component, sstyled, Root } from '@semcore/core';
import Input from '@semcore/input';
import { IncrementIcon, DecrementIcon } from './buttons';
import { localizedMessages } from './translations/__intergalactic-dynamic-locales';
import i18nEnhance from '@semcore/core/lib/utils/enhances/i18nEnhance';

import style from './style/input-number.shadow.css';
import { forkRef } from '@semcore/core/lib/utils/ref';
import { callAllEventHandlers } from '@semcore/core/lib/utils/assignProps';

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

  increment = (event) => {
    this.inputRef.current?.stepUp?.(event);
  };

  decrement = (event) => {
    this.inputRef.current?.stepDown?.(event);
  };

  getValueProps() {
    const numberFormatter = new Intl.NumberFormat(this.asProps.locale, { style: 'decimal' });

    return {
      inputRef: this.inputRef,
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
  static style = style;
  static defaultProps = {
    defaultValue: '',
    defaultDisplayValue: '',
    step: 1,
  };

  valueInputRef = React.createRef();

  cursorPosition = -1;

  uncontrolledProps() {
    return {
      displayValue: null,
      value: [
        null,
        (newValue) => {
          const { value: prevValue, displayValue: prevDisplayValue } = this.asProps;

          const { parsedValue, displayValue } = this.valueParser(
            newValue,
            prevValue,
            prevDisplayValue,
          );

          this.handlers.displayValue(displayValue);

          return parsedValue;
        },
      ],
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

  getFormattedValue = (value) => {
    return value
      .replace(new RegExp(`[${this.separatorThousands}]`, 'g'), '')
      .replace(this.separatorDecimal, '.');
  };

  valueParser = (value, prevValue, prevDisplayValue) => {
    const { numberFormatter } = this.props;

    const stringNumber = this.getFormattedValue(String(value));

    if (Number.isNaN(Number(stringNumber))) {
      return {
        parsedValue: prevValue,
        displayValue: prevDisplayValue,
      };
    }

    let displayValue = '';

    if (/\.[0-9]*0$/.test(stringNumber)) {
      const [int, decimal] = stringNumber.split(this.separatorDecimal);
      displayValue = numberFormatter.format(int) + this.separatorDecimal + decimal;
    } else if (stringNumber !== '') {
      displayValue = numberFormatter.format(stringNumber);
    }

    return {
      parsedValue: stringNumber,
      displayValue: displayValue,
    };
  };

  round(value, step) {
    const countDecimals = Math.floor(step) === step ? 0 : step.toString().split('.')[1].length || 0;
    return countDecimals === 0
      ? Number.parseFloat(value)
      : Number.parseFloat(value).toPrecision(countDecimals);
  }

  handleValidation = (event) => {
    const { value, displayValue, min, max, step } = this.asProps;
    const { parsedValue } = this.valueParser(event.currentTarget.value, value, displayValue);
    const roundCoefficient = step < 1 ? step.toString().split('.')[1].length : 1;

    if (Number.isNaN(value) || Number.isNaN(Number.parseFloat(parsedValue))) {
      event.currentTarget.value = '';
      this.handlers.value('', event);
    } else {
      let numberValue = parseValueWithMinMax(Number.parseFloat(parsedValue), min, max);
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
    this.valueInputRef.current?.addEventListener('wheel', this.onWheel);

    const { inputRef, value } = this.asProps;

    if (inputRef.current) {
      inputRef.current.stepUp = this.stepUp;
      inputRef.current.stepDown = this.stepDown;
    }

    if (value !== '') {
      const { displayValue } = this.valueParser(value, '', '');
      this.handlers.displayValue(displayValue);
    }
  }

  componentDidUpdate(prevProps) {
    if (prevProps.value !== this.props.value) {
      const { displayValue } = this.valueParser(
        this.props.value,
        prevProps.value,
        prevProps.displayValue,
      );
      this.handlers.displayValue(displayValue);
    }
  }

  componentWillUnmount() {
    this.valueInputRef.current?.removeEventListener('wheel', this.onWheel);
  }

  onWheel = (event) => {
    callAllEventHandlers(this.asProps.onWheel, this.handleWheel)(event);
  };

  handleWheel = (event) => {
    if (event.target !== this.valueInputRef.current) return;
    if (document.activeElement !== this.valueInputRef.current) return;
    event.preventDefault();
    if (event.wheelDelta > 0) {
      this.stepUp(event);
    } else if (event.wheelDelta < 0) {
      this.stepDown(event);
    }
  };

  handleChange = (event) => {
    const value = this.getFormattedValue(event.currentTarget.value);
    const { numberFormatter, value: prevValue } = this.asProps;

    if (value === '.' || value === '-') {
      this.handlers.displayValue(value);
      return false;
    }

    if (value.endsWith('-')) {
      return false;
    }

    if (value.endsWith('.')) {
      if (value.length > prevValue.length) {
        this.handlers.displayValue(numberFormatter.format(value) + this.separatorDecimal);
        return false;
      } else {
        this.handlers.value(value.slice(0, -1), event);
        return false;
      }
    }

    const digits = /[0-9.-]+/.test(value);

    if (digits || value === '') {
      this.handlers.value(value, event);
    }
  };

  handleKeyUp = (event) => {
    if (event.key === 'Shift') {
      this.cursorPosition = -1;
    }
  };

  handleKeyDown = (event) => {
    const element = event.currentTarget;
    const value = element.value;
    const length = value.length;
    const { displayValue } = this.asProps;

    if (event.key === '.' || event.key === ',') {
      // for the first decimal separator we should replace both ',' and '.' to '.' because of how js convert strings to numbers (with ',' it will be NaN)
      if (value.indexOf(this.separatorDecimal) === -1 && event.key === ',') {
        event.currentTarget.value = value + '.';
      }
      // we could press decimal separator second time - prevent this '1.5.'
      else if (value.indexOf(this.separatorDecimal) !== -1) {
        event.preventDefault();
        event.stopPropagation();
        return;
      }
    }

    if (event.key === 'Backspace' && value.endsWith(this.separatorDecimal)) {
      event.preventDefault();
      event.stopPropagation();
      this.handlers.displayValue(displayValue.slice(0, -1));
      return false;
    }

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

    switch (event.key) {
      case 'ArrowLeft': {
        event.preventDefault();
        this.moveSelectionLeft(element, cursorIndex);
        break;
      }
      case 'ArrowRight': {
        event.preventDefault();
        this.moveSelectionRight(element, cursorIndex);
        break;
      }
      case 'ArrowDown': {
        event.preventDefault();
        this.stepDown(event);
        break;
      }
      case 'ArrowUp': {
        event.preventDefault();
        this.stepUp(event);
        break;
      }
    }
  };

  moveSelectionLeft = (element, cursorIndex) => {
    const value = element.value;
    const nextPosition = element.selectionStart - 1 >= 0 ? element.selectionStart - 1 : 0;

    const cursorPosition =
      value[element.selectionStart - cursorIndex] === this.separatorThousands
        ? element.selectionStart - cursorIndex
        : nextPosition;

    if (this.cursorPosition === -1) {
      // without shift
      element.setSelectionRange(cursorPosition, cursorPosition);
    } else {
      if (
        element.selectionStart <= this.cursorPosition &&
        element.selectionEnd === this.cursorPosition
      ) {
        element.setSelectionRange(cursorPosition, element.selectionEnd);
      } else {
        element.setSelectionRange(
          element.selectionStart,
          value[element.selectionEnd - cursorIndex] === this.separatorThousands
            ? element.selectionEnd - cursorIndex
            : element.selectionEnd - 1,
        );
      }
    }
  };

  moveSelectionRight = (element, cursorIndex) => {
    const value = element.value;
    const nextPosition = element.selectionEnd + 1;

    const cursorPosition =
      value[element.selectionEnd] === this.separatorThousands
        ? element.selectionEnd + cursorIndex
        : nextPosition;

    if (this.cursorPosition === -1) {
      // without shift
      element.setSelectionRange(cursorPosition, cursorPosition);
    } else {
      if (
        element.selectionEnd >= this.cursorPosition &&
        element.selectionStart === this.cursorPosition
      ) {
        element.setSelectionRange(element.selectionStart, cursorPosition);
      } else {
        element.setSelectionRange(
          value[element.selectionStart] === this.separatorThousands
            ? element.selectionStart + cursorIndex
            : element.selectionStart + 1,
          element.selectionEnd,
        );
      }
    }
  };

  handleClick = (event) => {
    const element = event.target;
    const value = element.value;

    if (value[element.selectionStart - 1] === this.separatorThousands) {
      element.setSelectionRange(element.selectionStart - 1, element.selectionEnd - 1);
    }
  };

  handleBlur = (event) => {
    this.cursorPosition = -1;
    this.handleValidation(event);
  };

  stepUp = (event) => {
    const { max = Number.MAX_SAFE_INTEGER, min, step, value } = this.asProps;

    let numberValue;

    // https://stackoverflow.com/questions/68010124/safari-number-input-stepup-stepdown-not-functioning-with-empty-value
    if (value === '') {
      numberValue = min ?? 0;
    } else {
      numberValue = Number.parseFloat(value);
    }

    if (!Number.isNaN(numberValue)) {
      const newValue = numberValue + step <= max ? numberValue + step : max;

      this.handlers.value(newValue.toString(), event);
    }
  };

  stepDown = (event) => {
    const { max, min = Number.MIN_SAFE_INTEGER, step, value } = this.asProps;

    let numberValue;

    if (value === '') {
      numberValue = max ?? 0;
    } else {
      numberValue = Number.parseFloat(value);
    }

    if (!Number.isNaN(numberValue)) {
      const newValue = numberValue - step >= min ? numberValue - step : min;

      this.handlers.value(newValue.toString(), event);
    }
  };

  render() {
    const SValue = Root;
    const { styles, min, max, step, forwardRef, inputRef, displayValue } = this.asProps;

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
          use:ref={forkRef(this.valueInputRef, inputRef, forwardRef)}
          use:value={displayValue}
          inputMode={Number.isInteger(step) ? 'numeric' : 'decimal'}
          min={min}
          max={max}
          step={step}
        />
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
Controls.style = style;

export default createComponent(InputNumber, {
  Value,
  Controls,
  Addon: Input.Addon,
});
