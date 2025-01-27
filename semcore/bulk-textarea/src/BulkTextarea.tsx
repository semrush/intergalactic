import React from 'react';
import createComponent, { Component, Root } from '@semcore/core';
import { Box } from '@semcore/flex-box';

import { BulkTextareaType, BulkTextareaProps } from './BulkTextarea.types';

import { InputField, InputFieldProps } from './components/InputField/InputField';
import { Counter } from './components/Counter';
import { ClearAllButton } from './components/ClearAllbutton';
import { ErrorsNavigation } from './components/ErrorsNavigation';
import { localizedMessages } from './translations/__intergalactic-dynamic-locales';
import i18nEnhance from '@semcore/utils/lib/enhances/i18nEnhance';
import focusSourceEnhance from '@semcore/utils/lib/enhances/focusSourceEnhance';
import uniqueIdEnhance from '@semcore/utils/lib/uniqueID';

type State = {
  rowsCount: number;
  isEmptyText: boolean;
  errorIndex: number;
  highlightErrorIndex: boolean;
  lastError?: InputFieldProps['errors'][number];
};

class BulkTextareaRoot extends Component<
  BulkTextareaProps,
  {},
  State,
  typeof BulkTextareaRoot.enhance
> {
  static displayName = 'BulkTextarea';
  static defaultProps = {
    defaultValue: '',
    size: 'm',
    defaultState: 'normal',
    minRows: 2,
    maxRows: 10,
    ofRows: 100,
    validateOn: 'blur',
    locale: 'en',
    defaultErrors: [],
    defaultShowErrors: false,
  };

  static enhance = [
    i18nEnhance(localizedMessages),
    focusSourceEnhance(),
    uniqueIdEnhance(),
  ] as const;

  inputFieldRef = React.createRef<HTMLDivElement>();
  clearAllButtonRef = React.createRef<HTMLButtonElement>();
  nextButtonRef = React.createRef<HTMLButtonElement>();
  prevButtonRef = React.createRef<HTMLButtonElement>();
  counterRef = React.createRef<HTMLDivElement>();

  state: State = {
    rowsCount: 0,
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
      rowValidation,
      placeholder,
      validateOn,
      onChange,
      rowsDelimiters,
      ofRows,
      disabled,
      readonly,
      pasteProps,
      rowProcessing,
      errors = [],
      showErrors,
    } = this.asProps;
    const { errorIndex, lastError, rowsCount, highlightErrorIndex } = this.state;

    return {
      value,
      size,
      state: showErrors && errors?.length > 0 ? 'invalid' : 'normal',
      disabled,
      readonly,
      minRows,
      maxRows,
      ofRows,
      placeholder,
      lastError,
      pasteProps,
      rowsCount,
      rowProcessing,
      onChangeRowsCount: this.handleChangeRowsCount,
      onChangeRowIndex: () => {
        if (validateOn?.includes('blurRow')) {
          this.handlers.showErrors(true);
        }
      },
      onBlur: (value: string, event: Event) => {
        if (
          validateOn?.includes('blur') &&
          (this.asProps.focusSourceRef.current === 'keyboard' ||
            (event instanceof FocusEvent && event.relatedTarget !== this.clearAllButtonRef.current))
        ) {
          this.handlers.showErrors(true);
        }

        if (
          this.asProps.showErrors === false &&
          (validateOn?.includes('blur') || validateOn?.includes('blurRow'))
        ) {
          setTimeout(() => {
            this.nextButtonRef.current?.focus();
          }, 250);
        }

        onChange?.(value, event);
      },
      showErrors,
      validateOn,
      rowValidation,
      errors,
      onErrorsChange: (newErrors: InputFieldProps['errors']) => {
        const lastError = newErrors.length === 0 ? errors[0] : undefined;
        this.handlers.errors(newErrors);
        this.setState({ lastError });
        setTimeout(() => {
          const { showErrors, errors } = this.asProps;
          if (showErrors) {
            const newState = newErrors.length === 0 ? 'normal' : 'invalid';
            this.handlers.state(newState);
          }
          if (errors?.length === 0) {
            this.handlers.showErrors(false);

            setTimeout(() => {
              this.setState({ lastError: undefined });
            }, 150);
          }
        }, 10); // this timeout to be sure that code will be after state change
      },
      highlightErrorIndex,
      errorIndex,
      onErrorIndexChange: (errorIndex: number) => {
        this.setState({ errorIndex, highlightErrorIndex: false });
      },
      rowsDelimiters,
      ref: this.inputFieldRef,
      ['aria-describedby']: this.counterId,
    };
  }

  getCounterProps() {
    const { ofRows, getI18nText, size } = this.asProps;
    const { rowsCount, isEmptyText } = this.state;

    let counterTheme = '';

    if (rowsCount === ofRows) {
      counterTheme = 'warning';
    } else if (rowsCount > ofRows!) {
      counterTheme = 'danger';
    }

    return {
      id: this.counterId,
      ref: this.counterRef,
      getI18nText,
      theme: counterTheme,
      rowsCount: isEmptyText ? 0 : rowsCount,
      ofRows,
      size,
    };
  }

  getClearAllButtonProps() {
    const { size, getI18nText, disabled, readonly } = this.asProps;

    return {
      onClick: this.handleClickClearAllButton,
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

  handleChangeRowsCount = (rowsCount: number) => {
    const isEmpty = !rowsCount;
    this.setState({ rowsCount, isEmptyText: isEmpty });

    if (isEmpty) {
      this.handlers.showErrors(false);
      this.handlers.errors([]);
      this.handlers.state('normal');
    }
  };

  handleClickClearAllButton = (e: Event) => {
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

const BulkTextarea = createComponent(BulkTextareaRoot, {
  InputField,
  Counter,
  ClearAllButton,
  ErrorsNavigation,
}) as BulkTextareaType;

export default BulkTextarea;
