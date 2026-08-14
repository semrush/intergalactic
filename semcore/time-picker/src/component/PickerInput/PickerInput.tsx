import { Component, sstyled, Root } from '@semcore/core';
import { callAllEventHandlers } from '@semcore/core/lib/utils/assignProps';
import Input from '@semcore/input';
import Select from '@semcore/select';
import React from 'react';

import style from './picker-input.shadow.css';
import type { PickerInputMinMax, PickerInputProps } from './PickerInput.type';
import type { NSTimePicker } from '../TimePicker/TimePicker.type';

type State = {
  dirtyValue?: string;
  visible: boolean;
};

function getOptions(minMax: PickerInputMinMax, step = 1) {
  const [min, max] = minMax;
  const length = Number(((max + 1 - min) / step).toFixed(0));
  const options = Array(length).fill('');
  let numValue = min;
  return options.map((_i, index) => {
    numValue = index === 0 ? numValue : numValue + step;
    const value = String(numValue).padStart(2, '0');

    return (
      <Select.Option value={value} key={value}>
        {value}
      </Select.Option>
    );
  });
}

abstract class AbstractPickerInput extends Component<PickerInputProps, [], {}, {}, State> {
  static style = style;
  static defaultProps = (_: PickerInputProps) => ({
    placeholder: '00',
    offset: [-8, 4],
  });

  state: State = {
    dirtyValue: undefined,
    visible: false,
  };

  inputRef = React.createRef();

  abstract get field(): NSTimePicker.Field;
  abstract get minMax(): PickerInputMinMax;
  abstract handleKeyDown(event: React.KeyboardEvent<HTMLInputElement>): void;

  parseValueWithMinMax = (value: string) => {
    const [min, max] = this.minMax;

    const numberValue = isNaN(Number(value)) ? min : Number(value);

    return String(Math.max(min, Math.min(max, numberValue)));
  };

  dispatchOnChange(value: string, event: React.SyntheticEvent) {
    this.setState({ dirtyValue: undefined });
    this.asProps.$onValueChange(value, this.field, event);
  }

  submitChanges(event: React.SyntheticEvent) {
    let { dirtyValue } = this.state;
    if (dirtyValue !== undefined) {
      // if changes value
      if (dirtyValue) dirtyValue = this.parseValueWithMinMax(dirtyValue); // if not ""
      this.dispatchOnChange(dirtyValue, event);
    }
  }

  handleChange = (value: string, event: React.SyntheticEvent) => {
    event.stopPropagation();

    const inputValue = value.replace(/[^0-9]/g, '');
    const numberValue = Number(inputValue);

    if (!Number.isNaN(numberValue)) {
      this.setState({ dirtyValue: inputValue.slice(-2) });
    }
  };

  handleBlur = (event: React.SyntheticEvent) => this.submitChanges(event);

  handleSelect = (value: string, event: React.SyntheticEvent) => {
    this.dispatchOnChange(value, event);
  };

  handleVisibleChange = (visible: boolean) => this.setState({ visible });

  render() {
    const SPickerInput = Root;
    const { styles, step, onSelect, time, size, disabled, onVisibleChange, ariaLabel, ...other } = this.asProps;
    const { dirtyValue, visible } = this.state;
    const value = dirtyValue === undefined ? time : dirtyValue;

    return sstyled(styles)(
      <Select
        {...other}
        interaction='focus'
        size={size}
        onChange={callAllEventHandlers(onSelect, this.handleSelect)}
        onVisibleChange={callAllEventHandlers(onVisibleChange, this.handleVisibleChange)}
        visible={visible}
        value={time}
        defaultHighlightedIndex={time ? null : 0}
      >
        <SPickerInput
          render={Select.Trigger}
          tag={Input.Value}
          ref={this.inputRef}
          inputMode='numeric'
          size={size}
          disabled={disabled}
          neighborLocation={false}
          value={value}
          aria-label={ariaLabel}
          onChange={this.handleChange}
          onBlur={this.handleBlur}
          onKeyDown={this.handleKeyDown}
        />
        <Select.Menu hMax={180}>{getOptions(this.minMax, step)}</Select.Menu>
      </Select>,
    );
  }
}

class Hours extends AbstractPickerInput {
  static defaultProps = (props: PickerInputProps) => ({
    ...AbstractPickerInput.defaultProps(props),
    ml: props.size === 'l' ? 3 : undefined,
  });

  get field(): NSTimePicker.Field {
    return 'hours';
  }

  get minMax(): PickerInputMinMax {
    const { is12Hour } = this.asProps;

    return is12Hour ? [1, 12] : [0, 23];
  }

  focusNext() {
    if (this.asProps.minutesInputRef.current) {
      this.setState({ visible: false });
      this.asProps.minutesInputRef.current.focus();
    }
  }

  handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    const { currentTarget } = event;
    if (event.key === 'Enter') {
      this.submitChanges(event);
    }
    if (event.key === 'ArrowRight') {
      if (
        currentTarget.selectionStart &&
        currentTarget.selectionStart >= currentTarget.value.length &&
        currentTarget.selectionStart === currentTarget.selectionEnd
      ) {
        event.preventDefault();
        this.focusNext();
      }
    }
  };

  componentDidUpdate(_: PickerInputProps, prevState: State) {
    const { dirtyValue } = this.state;
    if (prevState.dirtyValue === undefined || dirtyValue === undefined) return;

    if (prevState.dirtyValue.length === 1 && dirtyValue.length === 2) {
      this.focusNext();
    }
  }
}

class Minutes extends AbstractPickerInput {
  static defaultProps = (props: PickerInputProps) => ({
    ...AbstractPickerInput.defaultProps(props),
    mr: props.size === 'l' ? 3 : undefined,
  });

  get field(): NSTimePicker.Field {
    return 'minutes';
  }

  get minMax(): PickerInputMinMax {
    return [0, 59];
  }

  focusPrev() {
    if (this.asProps.hoursInputRef.current) {
      this.setState({ visible: false });
      this.asProps.hoursInputRef.current.focus();
    }
  }

  handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    const { currentTarget } = event;
    if (event.key === 'ArrowLeft') {
      if (
        currentTarget.selectionStart &&
        currentTarget.selectionStart <= 0 &&
        currentTarget.selectionStart === currentTarget.selectionEnd
      ) {
        event.preventDefault();
        this.focusPrev();
      }
    }
    if (event.key === 'Backspace') {
      if (currentTarget.value.length === 0) {
        event.preventDefault();
        this.focusPrev();
      }
    }
    if (event.key === 'Enter') this.submitChanges(event);
  };
}

export { Hours, Minutes };
