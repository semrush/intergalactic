import React from 'react';
import Input from '@semcore/input';
import Select from '@semcore/select';
import { intOrDefault, withLeadingZero } from './TimePicker';
import { Component, sstyled, Root } from '@semcore/core';
import { callAllEventHandlers } from '@semcore/core/lib/utils/assignProps';

const MAP_FIELD_TO_TIME = {
  hours: 0,
  minutes: 1,
};

const MAP_SIZE_SELECT = {
  m: 'm',
  l: 'l',
};

function getOptions(min, max, step = 1) {
  const length = Number(((max + 1 - min) / step).toFixed(0));
  const options = Array(length).fill('');
  let numValue = min;
  return options.map((i, index) => {
    numValue = index === 0 ? numValue : numValue + step;
    const value = withLeadingZero(String(numValue));
    return (
      <Select.Option value={value} key={value}>
        {value}
      </Select.Option>
    );
  });
}

const defaultPopperOffset = [-8, 4];

class ItemPicker extends Component {
  static defaultProps = {
    placeholder: '00',
    offset: defaultPopperOffset,
  };

  inputRef = React.createRef();

  minMax() {
    return [];
  }

  state = {
    dirtyValue: undefined,
    visible: false,
  };

  parseValueWithMinMax = (value) => {
    const [min, max] = this.minMax();
    return String(Math.max(min, Math.min(max, value)));
  };

  dispatchOnChange(value, event) {
    this.setState({ dirtyValue: undefined });
    this.asProps.$onValueChange(value, this.field, event);
  }

  submitChanges(event) {
    let { dirtyValue } = this.state;
    if (dirtyValue !== undefined) {
      // if changes value
      if (dirtyValue) dirtyValue = this.parseValueWithMinMax(dirtyValue); // if not ""
      this.dispatchOnChange(dirtyValue, event);
    }
  }

  handleChange = (value, event) => {
    /* hide props for bubbling events */
    event.stopPropagation();
    const numberValue = intOrDefault(Number(value), NaN);

    if (!Number.isNaN(numberValue)) {
      this.setState({ dirtyValue: value.slice(-2) });
    }
  };

  handleBlur = (event) => this.submitChanges(event);

  /* rewrite method */
  handleKeyDown = () => {};

  handleSelect = (value, event) => {
    this.dispatchOnChange(value, event);
  };

  handleVisibleChange = (visible) => this.setState({ visible });

  getAriaLabel = () => {
    const { _getI18nText: getI18nText } = this.asProps;
    if (this.field === 'hours') return getI18nText('hours');
    if (this.field === 'minutes') return getI18nText('minutes');
    return undefined;
  };

  render() {
    const SPickerInput = Root;
    const { styles, step, onSelect, time, size, disabled, onVisibleChange, ...other } =
      this.asProps;
    const { dirtyValue, visible } = this.state;
    const timeValue = time[MAP_FIELD_TO_TIME[this.field]];
    const value = dirtyValue === undefined ? timeValue : dirtyValue;
    const [min, max] = this.minMax();

    return sstyled(styles)(
      <Select
        {...other}
        interaction='focus'
        size={size ? MAP_SIZE_SELECT[size] : false}
        onChange={callAllEventHandlers(onSelect, this.handleSelect)}
        onVisibleChange={callAllEventHandlers(onVisibleChange, this.handleVisibleChange)}
        visible={visible}
        value={timeValue}
      >
        <SPickerInput
          render={Select.Trigger}
          tag={Input.Value}
          ref={this.inputRef}
          inputMode={'numeric'}
          size={size}
          disabled={disabled}
          neighborLocation={false}
          value={value}
          aria-label={this.getAriaLabel()}
          onChange={this.handleChange}
          onBlur={this.handleBlur}
          onKeyDown={this.handleKeyDown}
        />
        <Select.Menu hMax={180}>{getOptions(min, max, step)}</Select.Menu>
      </Select>,
    );
  }
}

class Hours extends ItemPicker {
  field = 'hours';
  static defaultProps = ({ size }) => ({
    ...ItemPicker.defaultProps,
    ml: size === 'l' ? 3 : undefined,
  });

  minMax() {
    const { is12Hour } = this.asProps;
    if (is12Hour) {
      return [1, 12];
    } else {
      return [0, 23];
    }
  }

  focusNext() {
    if (this.asProps.minutesInputRef.current) {
      this.setState({ visible: false });
      this.asProps.minutesInputRef.current.focus();
    }
  }

  handleKeyDown = (event) => {
    const { currentTarget } = event;
    if (event.key === 'Enter') {
      this.submitChanges(event);
    }
    if (event.key === 'ArrowRight') {
      if (
        currentTarget.selectionStart >= currentTarget.value.length &&
        currentTarget.selectionStart === currentTarget.selectionEnd
      ) {
        event.preventDefault();
        this.focusNext();
      }
    }
  };

  componentDidUpdate(_prevProps, prevState) {
    const { dirtyValue } = this.state;
    if (prevState.dirtyValue === undefined || dirtyValue === undefined) return;

    if (prevState.dirtyValue.length === 1 && dirtyValue.length === 2) {
      this.focusNext();
    }
  }
}

class Minutes extends ItemPicker {
  field = 'minutes';
  static defaultProps = ({ size }) => ({
    ...ItemPicker.defaultProps,
    mr: size === 'l' ? 3 : undefined,
  });

  minMax() {
    return [0, 59];
  }

  focusPrev() {
    if (this.asProps.hoursInputRef.current) {
      this.setState({ visible: false });
      this.asProps.hoursInputRef.current.focus();
    }
  }

  handleKeyDown = (event) => {
    const { currentTarget } = event;
    if (event.key === 'ArrowLeft') {
      if (
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
