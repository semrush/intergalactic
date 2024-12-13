import React from 'react';
import createComponent, { Component, Root } from '@semcore/core';
import { Box } from '@semcore/flex-box';

import { BulkTextareaType, BulkTextareaProps } from './BulkTextarea.types';

import { InputField, InputFieldProps } from './components/InputField/InputField';
import { Counter } from './components/Counter';
import { ClearAllButton } from './components/ClearAllbutton';
import { ErrorsNavigation } from './components/ErrorsNavigation';

type State = {
  rowsCount: number;
  isEmptyText: boolean;
  errorIndex: number;
  errors: InputFieldProps['errors'];
  showErrors: boolean;
};

class BulkTextareaRoot extends Component<BulkTextareaProps, {}, State> {
  static displayName = 'BulkTextarea';
  static defaultProps = {
    defaultValue: '',
    size: 'm',
    defaultState: 'normal',
    minRows: 2,
    maxRows: 10,
    ofRows: 100,
    validateOn: 'blur',
  };

  state = {
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
      onBlur,
      rowsDelimiters,
      ofRows,
    } = this.asProps;
    const { errors, errorIndex, showErrors } = this.state;

    return {
      value,
      size,
      state,
      minRows,
      maxRows,
      ofRows,
      placeholder,
      onChangeRows: this.handleChangeRows,
      onEnterNextRow: () => {
        if (validateOn?.includes('enterNextRow')) {
          this.setState({ showErrors: true });
        }
      },
      onBlur: (value: string, event: Event) => {
        if (validateOn?.includes('blur')) {
          this.setState({ showErrors: true });
        }
        onBlur?.(value, event);
      },
      onIsEmptyValueChange: (isEmpty: boolean) => {
        this.setState({ isEmptyText: isEmpty });
      },
      showErrors,
      validateOn,
      rowValidation,
      errors,
      errorIndex,
      onErrorsChange: (errors: InputFieldProps['errors']) => {
        const currentLength = this.state.errors.length;
        this.setState({ errors: errors });
        if (currentLength !== errors.length) {
          this.setState({ errorIndex: -1 });
        }
        setTimeout(() => {
          if (this.state.showErrors) {
            this.handlers.state(errors.length === 0 ? 'normal' : 'invalid');
          }
        });
      },
      rowsDelimiters,
    };
  }

  getCounterProps() {
    const { ofRows } = this.asProps;
    const { rowsCount, isEmptyText } = this.state;

    let counterTheme = '';

    if (rowsCount === ofRows) {
      counterTheme = 'warning';
    } else if (rowsCount > ofRows!) {
      counterTheme = 'danger';
    }

    return {
      theme: counterTheme,
      rowsCount: isEmptyText ? 0 : rowsCount,
      ofRows,
    };
  }

  getClearAllButtonProps() {
    const { size } = this.asProps;
    return {
      onClick: this.handleClickClearAllButton,
      isHidden: this.state.isEmptyText,
      size,
    };
  }

  getErrorsNavigationProps() {
    const { size } = this.asProps;
    const { errors, errorIndex, showErrors } = this.state;
    return {
      size,
      errorIndex: errorIndex,
      onPrevError: this.handleChangeErrorIndex(-1),
      onNextError: this.handleChangeErrorIndex(1),
      errorsCount: errors.map(Boolean).length,
      showErrors,
    };
  }

  handleChangeRows = (rowsCount: number) => {
    this.setState({ rowsCount });
  };

  handleClickClearAllButton = (e: Event) => {
    this.asProps.onBlur?.('', e);
    this.setState({ showErrors: false, errorIndex: -1, errors: [] });
    this.handlers.state('normal');
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
      this.setState({ errorIndex: newIndex });
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
