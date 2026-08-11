import type { Intergalactic } from '@semcore/core';
import { Component, createComponent, Root, sstyled } from '@semcore/core';
import propsObserver from '@semcore/core/lib/decorators/propsObserver';
import { callAllEventHandlers } from '@semcore/core/lib/utils/assignProps';
import type { WithI18nEnhanceProps } from '@semcore/core/lib/utils/enhances/i18nEnhance';
import i18nEnhance from '@semcore/core/lib/utils/enhances/i18nEnhance';
import { forkRef } from '@semcore/core/lib/utils/ref';
import Input from '@semcore/input';
import React from 'react';

import { DecrementIcon, IncrementIcon } from './buttons';
import type { NSInputNumber } from './InputNumber.type';
import style from './style/input-number.shadow.css';
import { localizedMessages } from './translations/__intergalactic-dynamic-locales';

/** Events that can trigger a value step (buttons, keyboard arrows, mouse wheel). */
type StepEvent =
  | React.MouseEvent
  | React.KeyboardEvent
  | WheelEvent;

/**
 * The input DOM node whose native `stepUp`/`stepDown` methods are replaced at runtime
 * (see `Value.componentDidMount`) with event-aware versions.
 */
type InputElement = Omit<HTMLInputElement, 'stepUp' | 'stepDown'> & {
  stepUp: (event: StepEvent) => void;
  stepDown: (event: StepEvent) => void;
};

export function parseValueWithMinMax(
  value: number,
  min = Number.MIN_SAFE_INTEGER,
  max = Number.MAX_SAFE_INTEGER,
) {
  return Math.max(min, Math.min(max, value));
}

class InputNumber extends Component<
  Intergalactic.InternalTypings.InferComponentProps<NSInputNumber.Component>,
  typeof InputNumber.enhance,
  {},
  WithI18nEnhanceProps,
  {},
  NSInputNumber.DefaultProps
> {
  static displayName = 'InputNumber';
  static style = style;
  static enhance = [i18nEnhance(localizedMessages)] as const;
  static defaultProps = {
    size: 'm',
    i18n: localizedMessages,
    locale: 'en',
  } as const;

  inputRef = React.createRef<InputElement>();

  increment = (event: React.MouseEvent) => {
    (this.inputRef.current)?.stepUp?.(event);
  };

  decrement = (event: React.MouseEvent) => {
    (this.inputRef.current)?.stepDown?.(event);
  };

  getValueProps() {
    const numberFormatter = new Intl.NumberFormat(this.asProps.locale, {
      style: 'decimal',
      maximumFractionDigits: 100,
    });

    return {
      inputRef: this.inputRef,
      increment: this.increment,
      decrement: this.decrement,
      numberFormatter,
    };
  }

  getControlsProps() {
    const { getI18nText } = this.asProps;
    return {
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

@propsObserver(['value'])
class Value extends Component<
    Intergalactic.InternalTypings.InferChildComponentProps<NSInputNumber.Value.Component, typeof InputNumber, 'Value'>,
    [],
    NSInputNumber.Value.Handlers,
    {},
    NSInputNumber.Value.State,
    NSInputNumber.Value.DefaultProps
  > {
  static style = style;
  static defaultProps = {
    defaultValue: '',
    defaultDisplayValue: '',
    step: 1,
  } as const;

  valueType: 'string' | 'number' = (typeof this.props.value === 'number' || this.props.value === null) ? 'number' : 'string';

  state: NSInputNumber.Value.State = {
    displayValue: '',
  };

  valueInputRef = React.createRef<HTMLInputElement>();

  cursorPosition: number | null = -1;

  uncontrolledProps(): NSInputNumber.Value.Handlers {
    return {
      value: [
        null,
        (newValue) => {
          const { displayValue: prevDisplayValue } = this.state;
          const { value: prevValue } = this.asProps;

          const { parsedValue, displayValue } = this.valueParser(
            newValue ?? '',
            prevValue,
            prevDisplayValue,
          );

          this.setState({ displayValue });

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

  onPropsChange(changedProps: { value?: string | number | null }) {
    const { value } = changedProps;

    if (value !== undefined) {
      if (typeof value === 'number' || value === null) {
        this.valueType = 'number';
      } else {
        this.valueType = 'string';
      }
    }
  }

  getFormattedValue = (value: string) => {
    return value
      .replace(new RegExp(`[${this.separatorThousands}]`, 'g'), '')
      .replace(this.separatorDecimal, '.');
  };

  valueParser = (
    value: string | number,
    prevValue: string,
    prevDisplayValue: NSInputNumber.Value.State['displayValue'],
  ) => {
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
      displayValue = numberFormatter.format(+int) + this.separatorDecimal + decimal;
    } else if (stringNumber !== '') {
      displayValue = numberFormatter.format(+stringNumber);
    }

    return {
      parsedValue: stringNumber,
      displayValue: displayValue,
    };
  };

  get stepPrecision() {
    const { step } = this.asProps;
    const [_, decimals] = step?.toString().split('.') ?? [];

    return decimals?.length ?? 0;
  }

  getDisplayValue(value: number): string {
    return value === 0 ? `${value}` : value.toFixed(this.stepPrecision);
  }

  limitDecimals(value: string) {
    const { stepPrecision } = this;
    if (stepPrecision === 0) return value;

    const dotIndex = value.indexOf('.');
    if (dotIndex === -1 || value.length - dotIndex - 1 <= stepPrecision) return value;

    return value.slice(0, dotIndex + 1 + stepPrecision);
  }

  round(value: number): number {
    const { stepPrecision } = this;

    return stepPrecision === 0
      ? value
      : Number(value.toPrecision(stepPrecision));
  }

  handleValidation = (event: React.FocusEvent<HTMLInputElement>) => {
    const { value, min, max, step } = this.asProps;
    const { displayValue } = this.state;
    const { parsedValue } = this.valueParser(event.currentTarget.value, value, displayValue);

    if (Number.isNaN(value) || Number.isNaN(Number.parseFloat(parsedValue))) {
      event.currentTarget.value = '';
      this.handlers.value(this.processedValue(''), event);
    } else {
      let numberValue = parseValueWithMinMax(Number.parseFloat(parsedValue), min, max);
      const rounded = this.round(numberValue % step);
      if (rounded !== 0) {
        if (rounded >= step / 2) {
          numberValue += step - rounded;
        } else if (Math.abs(rounded) < step) {
          numberValue -= rounded;
        }
      }

      this.handlers.value(this.processedValue(this.getDisplayValue(numberValue)), event);
    }
  };

  // https://stackoverflow.com/questions/57358640/cancel-wheel-event-with-e-preventdefault-in-react-event-bubbling
  componentDidMount() {
    this.valueInputRef.current?.addEventListener('wheel', this.onWheel);

    const { inputRef, value, autoFocus } = this.asProps;

    if (autoFocus) {
      setTimeout(() => {
        this.valueInputRef.current?.focus();
      });
    }

    if (inputRef.current) {
      inputRef.current.stepUp = this.stepUp;
      inputRef.current.stepDown = this.stepDown;
    }

    if (value !== '') {
      const { displayValue } = this.valueParser(value, '', '');
      this.setState({ displayValue });
    }
  }

  componentDidUpdate(prevProps: typeof this.asProps, prevState: typeof this.state) {
    if (prevProps.value !== this.props.value) {
      const { displayValue } = this.valueParser(
        this.props.value ?? '',
        prevProps.value,
        prevState.displayValue,
      );
      this.setState({ displayValue });
    }
  }

  componentWillUnmount() {
    this.valueInputRef.current?.removeEventListener('wheel', this.onWheel);
  }

  onWheel = (event: WheelEvent) => {
    callAllEventHandlers(this.asProps.onWheel, this.handleWheel)(event);
  };

  handleWheel = (event: WheelEvent) => {
    if (event.target !== this.valueInputRef.current) return;
    if (document.activeElement !== this.valueInputRef.current) return;
    event.preventDefault();
    if (event.deltaY < 0) {
      this.stepUp(event);
    } else if (event.deltaY > 0) {
      this.stepDown(event);
    }
  };

  handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = this.getFormattedValue(event.currentTarget.value);
    const { numberFormatter, value: prevValue } = this.asProps;

    if (value === '.' || value === '-') {
      this.setState({ displayValue: value });
      return false;
    }

    if (value.endsWith('-')) {
      return false;
    }

    if (value.endsWith('.')) {
      if (prevValue !== null && value.length > prevValue.toString().length) {
        this.setState({ displayValue: numberFormatter.format(value as `${number}`) + this.separatorDecimal });
        return false;
      } else {
        this.handlers.value(this.processedValue(value.slice(0, -1)), event);
        return false;
      }
    }

    const digits = /^[0-9.-]+$/.test(value);

    if (digits || value === '') {
      const newValue = this.limitDecimals(value);
      this.handlers.value(this.processedValue(newValue), event);
      if (newValue === prevValue) {
        const { displayValue } = this.valueParser(
          newValue ?? '',
          prevValue,
          this.state.displayValue,
        );
        this.setState({ displayValue });
      }
    }
  };

  handleKeyUp = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Shift') {
      this.cursorPosition = -1;
    }
  };

  handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    const element = event.currentTarget;
    const value = element.value;
    const length = value.length;
    const { displayValue } = this.state;

    if (event.key === '.' || event.key === ',') {
      // for the first decimal separator we should replace both ',' and '.' to '.' because of how js convert strings to numbers (with ',' it will be Number.NaN)
      if (value.indexOf(this.separatorDecimal) === -1 && event.key === ',') {
        event.currentTarget.value = value + '.';
      } else if (value.indexOf(this.separatorDecimal) !== -1) { // we could press decimal separator second time - prevent this '1.5.'
        event.preventDefault();
        event.stopPropagation();
        return;
      }
    }

    if (event.key === 'Backspace' && value.endsWith(this.separatorDecimal)) {
      event.preventDefault();
      event.stopPropagation();
      this.setState({ displayValue: displayValue?.slice(0, -1) });
      return false;
    }

    if (
      element.selectionStart !== length &&
      (event.key === 'Backspace' ||
        event.key === this.separatorDecimal ||
        ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'].includes(event.key))
    ) {
      const afterSelection = value.slice(element.selectionEnd ?? undefined);

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

  moveSelectionLeft = (element: React.KeyboardEvent<HTMLInputElement>['currentTarget'], cursorIndex: number) => {
    if (element.selectionStart === null) return;

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
        this.cursorPosition &&
        element.selectionStart <= this.cursorPosition &&
        element.selectionEnd === this.cursorPosition
      ) {
        element.setSelectionRange(cursorPosition, element.selectionEnd);
      } else if (element.selectionEnd !== null) {
        element.setSelectionRange(
          element.selectionStart,
          value[element.selectionEnd - cursorIndex] === this.separatorThousands
            ? element.selectionEnd - cursorIndex
            : element.selectionEnd - 1,
        );
      }
    }
  };

  moveSelectionRight = (element: React.KeyboardEvent<HTMLInputElement>['currentTarget'], cursorIndex: number) => {
    if (element.selectionEnd === null) return;

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
        this.cursorPosition &&
        element.selectionEnd >= this.cursorPosition &&
        element.selectionStart === this.cursorPosition
      ) {
        element.setSelectionRange(element.selectionStart, cursorPosition);
      } else if (element.selectionStart !== null) {
        element.setSelectionRange(
          value[element.selectionStart] === this.separatorThousands
            ? element.selectionStart + cursorIndex
            : element.selectionStart + 1,
          element.selectionEnd,
        );
      }
    }
  };

  handleClick = (event: React.MouseEvent<HTMLInputElement>) => {
    const element = event.currentTarget;
    const value = element.value;

    if (element.selectionStart !== null && value[element.selectionStart - 1] === this.separatorThousands) {
      element.setSelectionRange(element.selectionStart - 1, element.selectionEnd! - 1);
    }
  };

  stepUp = (event: StepEvent) => {
    const { max = Number.MAX_SAFE_INTEGER, min, step, value } = this.asProps;

    let numberValue;

    // https://stackoverflow.com/questions/68010124/safari-number-input-stepup-stepdown-not-functioning-with-empty-value
    if (value === '') {
      numberValue = min ?? 0;
    } else {
      numberValue = Number.parseFloat(value);
    }

    if (Number.isNaN(numberValue)) return;

    const nextValue = Math.min(numberValue + step, max);

    this.handlers.value(this.processedValue(this.getDisplayValue(nextValue)), event);
  };

  stepDown = (event: StepEvent) => {
    const { max, min = Number.MIN_SAFE_INTEGER, step, value } = this.asProps;

    let numberValue;

    if (value === '') {
      numberValue = max ?? 0;
    } else {
      numberValue = Number.parseFloat(value);
    }

    if (Number.isNaN(numberValue)) return;

    const nextValue = Math.max(numberValue - step, min);

    this.handlers.value(this.processedValue(this.getDisplayValue(nextValue)), event);
  };

  processedValue(value: string): NSInputNumber.Value | NSInputNumber.ValueNumber {
    if (this.valueType === 'string') {
      return value;
    }

    if (value === '') {
      return null;
    }

    return Number(value);
  }

  render() {
    const SValue = Root;
    const { styles, min, max, step, forwardRef, inputRef } = this.asProps;
    const { displayValue } = this.state;

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
          use:ref={forkRef(this.valueInputRef, inputRef, forwardRef ?? null)}
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

function Controls(
  props: Intergalactic.InternalTypings.InferChildComponentProps<NSInputNumber.Controls.Component, typeof InputNumber, 'Controls'>,
) {
  const { Children, increment, decrement, styles, getI18nText } = props;
  const SControls = Root;
  const SUp = 'button';
  const SDown = 'button';

  return sstyled(styles)(
    <SControls render={Input.Addon} aria-hidden='true'>
      <SUp
        onClick={increment}
        tabIndex={-1}
        type='button'
        aria-label={getI18nText('increment')}
      >
        <IncrementIcon />
      </SUp>
      <SDown
        onClick={decrement}
        tabIndex={-1}
        type='button'
        aria-label={getI18nText('decrement')}
      >
        <DecrementIcon />
      </SDown>
      <Children />
    </SControls>,
  );
}
Controls.style = style;

/**
 * InputNumber
 *
 * {@link https://developer.semrush.com/intergalactic/components/input-number/input-number-api/|API} | {@link https://developer.semrush.com/intergalactic/components/input-number/input-number-code/|Examples}
 */
export default createComponent<
  NSInputNumber.Component,
  typeof InputNumber
>(InputNumber, {
  Value,
  Controls,
  Addon: Input.Addon,
});
