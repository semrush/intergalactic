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

type State = {
  rowsCount: number;
  isEmptyText: boolean;
  errorIndex: number;
  errors: InputFieldProps['errors'];
  showErrors: boolean;
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
  };

  static enhance = [i18nEnhance(localizedMessages), focusSourceEnhance()] as const;

  inputFieldRef = React.createRef<HTMLDivElement>();
  clearAllButtonRef = React.createRef<HTMLButtonElement>();

  state: State = {
    rowsCount: 0,
    isEmptyText: true,
    errorIndex: -1,
    errors: [],
    showErrors: false,
  };

  uncontrolledProps() {
    return {
      value: null,
      state: null,
    };
  }

  getInputFieldProps() {
    const {
      value,
      size,
      state,
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
    } = this.asProps;
    const { errors, errorIndex, showErrors, lastError, rowsCount } = this.state;

    return {
      value,
      size,
      state,
      disabled,
      readonly,
      minRows,
      maxRows,
      ofRows,
      placeholder,
      lastError,
      pasteProps,
      rowsCount,
      onChangeRowsCount: this.handleChangeRowsCount,
      onEnterNextRow: () => {
        if (validateOn?.includes('enterNextRow')) {
          this.setState({ showErrors: true });
        }
      },
      onBlur: (value: string, event: Event) => {
        if (
          validateOn?.includes('blur') &&
          (this.asProps.focusSourceRef.current === 'keyboard' ||
            (event instanceof FocusEvent && event.relatedTarget !== this.clearAllButtonRef.current))
        ) {
          this.setState({ showErrors: true });
        }

        onChange?.(value, event);
      },
      showErrors,
      validateOn,
      rowValidation,
      errors,
      errorIndex,
      onErrorsChange: (errors: InputFieldProps['errors']) => {
        const lastError = errors.length === 0 ? this.state.errors[0] : undefined;
        const currentLength = this.state.errors.length;
        this.setState({ errors: errors, lastError });
        if (currentLength !== errors.length) {
          this.setState({ errorIndex: -1 });
        }
        setTimeout(() => {
          if (this.state.showErrors) {
            this.handlers.state(errors.length === 0 ? 'normal' : 'invalid');
          }
          if (errors.length === 0) {
            this.setState({ showErrors: false });

            setTimeout(() => {
              this.setState({ lastError: undefined });
            }, 150);
          }
        }, 10); // this timeout to be sure that code will be after state change
      },
      rowsDelimiters,
      ref: this.inputFieldRef,
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
    const { size, getI18nText, disabled, readonly } = this.asProps;
    const { errors, errorIndex, showErrors } = this.state;
    return {
      size,
      getI18nText,
      errorIndex: errorIndex,
      onPrevError: this.handleChangeErrorIndex(-1),
      onNextError: this.handleChangeErrorIndex(1),
      errorsCount: errors.map(Boolean).length,
      showErrors,
      disabled: disabled || readonly || false,
    };
  }

  handleChangeRowsCount = (rowsCount: number) => {
    const isEmpty = !rowsCount;
    this.setState({ rowsCount, isEmptyText: isEmpty });

    if (isEmpty) {
      this.setState({ showErrors: false, errors: [] });
      this.handlers.state('normal');
    }
  };

  handleClickClearAllButton = (e: Event) => {
    this.setState({ showErrors: false, errorIndex: -1, errors: [] });
    this.handlers.value('', e);
    this.handlers.state('normal');
    if (this.asProps.focusSourceRef.current === 'keyboard') {
      const textarea = this.inputFieldRef.current?.querySelector('[role="textbox"]');
      textarea instanceof HTMLDivElement && textarea.focus();
    }
  };

  handleChangeErrorIndex = (amount: number) => () => {
    const { errors, errorIndex } = this.state;
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
      this.setState({ showErrors: false, errorIndex: -1 }, () => {
        this.setState({ showErrors: true, errorIndex: newIndex });
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
