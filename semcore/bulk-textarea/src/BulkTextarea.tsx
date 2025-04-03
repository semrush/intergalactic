import React from 'react';
import { createComponent, Component, Root, lastInteraction } from '@semcore/core';
import { Box } from '@semcore/flex-box';

import { BulkTextareaType, BulkTextareaProps } from './BulkTextarea.types';

import { InputField, InputFieldProps } from './components/InputField/InputField';
import { Counter } from './components/Counter';
import { ClearAll } from './components/ClearAll';
import { ErrorsNavigation } from './components/ErrorsNavigation';
import { localizedMessages } from './translations/__intergalactic-dynamic-locales';
import i18nEnhance from '@semcore/core/lib/utils/enhances/i18nEnhance';
import uniqueIdEnhance from '@semcore/core/lib/utils/uniqueID';

type State<T extends string | string[]> = {
  linesCount: number;
  isEmptyText: boolean;
  errorIndex: number;
  highlightErrorIndex: boolean;
  prevError?: InputFieldProps<T>['errors'][number];
};

class BulkTextareaRoot<T extends string | string[]> extends Component<
  BulkTextareaProps<T>,
  {},
  State<T>,
  typeof BulkTextareaRoot.enhance
> {
  static displayName = 'BulkTextarea';
  static defaultProps = {
    defaultValue: '',
    size: 'm',
    defaultState: 'normal',
    minRows: 2,
    maxRows: 10,
    maxLines: 100,
    validateOn: 'blur',
    locale: 'en',
    defaultErrors: [],
    defaultShowErrors: false,
  };

  static enhance = [i18nEnhance(localizedMessages), uniqueIdEnhance()] as const;

  inputFieldRef = React.createRef<HTMLDivElement>();
  clearAllButtonRef = React.createRef<HTMLButtonElement>();
  nextButtonRef = React.createRef<HTMLButtonElement>();
  prevButtonRef = React.createRef<HTMLButtonElement>();
  counterRef = React.createRef<HTMLDivElement>();

  state: State<T> = {
    linesCount: 0,
    isEmptyText: true,
    errorIndex: -1,
    highlightErrorIndex: false,
  };

  uncontrolledProps() {
    return {
      value: null,
      state: null,
      showErrors: null,
      errors: null,
    };
  }

  get counterId() {
    return `${this.asProps.uid}_counter`;
  }

  getInputFieldProps() {
    const {
      value,
      size,
      minRows,
      maxRows,
      lineValidation,
      placeholder,
      validateOn,
      linesDelimiters,
      maxLines,
      disabled,
      readonly,
      pasteProps,
      lineProcessing,
      errors = [],
      showErrors,
    } = this.asProps;
    const { errorIndex, prevError, linesCount, highlightErrorIndex } = this.state;

    return {
      value,
      size,
      state: showErrors && errors?.length > 0 ? 'invalid' : 'normal',
      disabled,
      readonly,
      minRows,
      maxRows,
      maxLines,
      placeholder,
      prevError,
      pasteProps,
      linesCount,
      lineProcessing,
      onChangeLinesCount: this.handleChangeLinesCount,
      onChangeLineIndex: () => {
        if (validateOn?.includes('blurLine')) {
          this.handlers.showErrors(true);
        }
      },
      onBlur: (value: T, event: Event) => {
        if (
          validateOn?.includes('blur') &&
          (lastInteraction.isKeyboard() ||
            (event instanceof FocusEvent && event.relatedTarget !== this.clearAllButtonRef.current))
        ) {
          this.handlers.showErrors(true);
        }

        if (
          this.asProps.showErrors === false &&
          (validateOn?.includes('blur') || validateOn?.includes('blurLine'))
        ) {
          setTimeout(() => {
            this.nextButtonRef.current?.focus();
          }, 250);
        }

        this.props.onChange?.(value, event);
      },
      showErrors,
      validateOn,
      lineValidation: lineValidation,
      errors,
      onErrorsChange: (newErrors: InputFieldProps<T>['errors']) => {
        const prevError = newErrors.length === 0 ? errors[0] : undefined;
        this.handlers.errors(newErrors);
        this.setState({ prevError });
        setTimeout(() => {
          const { showErrors, errors } = this.asProps;
          if (showErrors) {
            const newState = newErrors.length === 0 ? 'normal' : 'invalid';
            this.handlers.state(newState);
          }
          if (errors?.length === 0) {
            this.handlers.showErrors(false);

            setTimeout(() => {
              this.setState({ prevError: undefined });
            }, 150);
          }
        }, 10); // this timeout to be sure that code will be after state change
      },
      highlightErrorIndex,
      errorIndex,
      onErrorIndexChange: (newErrorIndex: number) => {
        const prevError = errors[errorIndex];

        this.setState({ errorIndex: newErrorIndex, prevError, highlightErrorIndex: false });
      },
      linesDelimiters,
      ref: this.inputFieldRef,
      ['aria-describedby']: this.counterId,
    };
  }

  getCounterProps() {
    const { maxLines, getI18nText, size } = this.asProps;
    const { linesCount, isEmptyText } = this.state;

    let counterTheme = '';

    if (linesCount === maxLines) {
      counterTheme = 'warning';
    } else if (linesCount > maxLines!) {
      counterTheme = 'danger';
    }

    return {
      id: this.counterId,
      ref: this.counterRef,
      getI18nText,
      theme: counterTheme,
      linesCount: isEmptyText ? 0 : linesCount,
      maxLines,
      size,
    };
  }

  getClearAllProps() {
    const { size, getI18nText, disabled, readonly } = this.asProps;

    return {
      onClick: this.handleClickClearAll,
      isHidden: this.state.isEmptyText,
      size,
      getI18nText,
      ref: this.clearAllButtonRef,
      disabled: disabled || readonly,
    };
  }

  getErrorsNavigationProps() {
    const { size, getI18nText, disabled, readonly, errors = [], showErrors } = this.asProps;
    const { errorIndex } = this.state;
    return {
      size,
      getI18nText,
      errorIndex: errorIndex,
      onPrevError: this.handleChangeErrorIndex(-1),
      onNextError: this.handleChangeErrorIndex(1),
      errorsCount: errors.map(Boolean).length,
      showErrors,
      disabled: disabled || readonly || false,
      nextButtonRef: this.nextButtonRef,
      prevButtonRef: this.prevButtonRef,
    };
  }

  handleChangeLinesCount = (linesCount: number) => {
    const isEmpty = !linesCount;
    this.setState({ linesCount, isEmptyText: isEmpty });

    if (isEmpty) {
      this.handlers.showErrors(false);
      this.handlers.errors([]);
      this.handlers.state('normal');
    }
  };

  handleClickClearAll = (e: Event) => {
    this.handlers.showErrors(false);
    this.handlers.errors([]);
    this.setState({ errorIndex: -1 });
    this.handlers.value('', e);
    this.handlers.state('normal');

    const textarea = this.inputFieldRef.current?.querySelector('[role="textbox"]');
    textarea instanceof HTMLDivElement && textarea.focus();
  };

  handleChangeErrorIndex = (amount: number) => () => {
    const { errors = [] } = this.asProps;
    const { errorIndex } = this.state;
    const itemsIndex = errors.length - 1;
    let newIndex = errorIndex + amount;

    if (newIndex < 0) {
      newIndex = amount + itemsIndex + 1;
    } else if (newIndex > itemsIndex) {
      newIndex = newIndex - itemsIndex - 1;
    }

    if (!errors[newIndex]) {
      this.handleChangeErrorIndex(amount < 0 ? amount - 1 : amount + 1)();
    } else {
      this.handlers.showErrors(false);
      this.setState({ errorIndex: -1 });

      setTimeout(() => {
        this.handlers.showErrors(true);
        this.setState({ errorIndex: newIndex, highlightErrorIndex: true });
      });
    }
  };

  render() {
    return <Root render={Box} __excludeProps={['onBlur', 'value', 'placeholder']} />;
  }
}

const BulkTextarea = (<T extends string | string[]>() =>
  createComponent(BulkTextareaRoot, {
    InputField,
    Counter,
    ClearAll,
    ErrorsNavigation,
  }) as BulkTextareaType<T>)();

export default BulkTextarea;
