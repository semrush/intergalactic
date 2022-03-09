import React from 'react';
import Input from '@semcore/input';
import Select from '@semcore/select';
import { intOrDefault, nextInput, prevInput, withLeadingZero } from './TimePicker';
import { Component, sstyled, Root } from '@semcore/core';
import { callAllEventHandlers } from '@semcore/utils/lib/assignProps';

const MAP_FIELD_TO_TIME = {
  hours: 0,
  minutes: 1,
};

const MAP_SIZE_SELECT = {
  m: 'm',
  l: 'l',
  xl: 'l',
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

class ItemPicker extends Component {
  static defaultProps = {
    placeholder: '00',
  };

  $input = React.createRef();

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

  handleChange = (value, e) => {
    /* hide props for bubbling events */
    e.stopPropagation();
    const numberValue = intOrDefault(Number(value), NaN);

    if (!Number.isNaN(numberValue)) {
      this.setState({ dirtyValue: value.slice(-2) });
    }
  };

  handleBlur = (e) => this.submitChanges(e);

  handleFocus = () => {
    this.$input?.current.select();
  };

  /* rewrite method */
  handleKeyDown = () => {};

  handleSelect = (value, e) => {
    this.dispatchOnChange(value, e);
  };

  handleVisibleChange = (visible) => this.setState({ visible });

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
        interaction="focus"
        size={size ? MAP_SIZE_SELECT[size] : false}
        onChange={callAllEventHandlers(onSelect, this.handleSelect)}
        onVisibleChange={callAllEventHandlers(onVisibleChange, this.handleVisibleChange)}
        visible={visible}
        value={timeValue}
      >
        <SPickerInput
          interaction="focus"
          render={Select.Trigger}
          tag={Input.Value}
          ref={this.$input}
          size={size}
          disabled={disabled}
          neighborLocation={false}
          value={value}
          aria-label={`Search ${this.field}`}
          onChange={this.handleChange}
          onBlur={this.handleBlur}
          onFocus={this.handleFocus}
          onKeyDown={this.handleKeyDown}
        />
        <Select.Menu hMax={180}>{getOptions(min, max, step)}</Select.Menu>
      </Select>,
    );
  }
}

class Hours extends ItemPicker {
  field = 'hours';

  minMax() {
    const { is12Hour } = this.asProps;
    if (is12Hour) {
      return [1, 12];
    } else {
      return [0, 23];
    }
  }

  nextInput() {
    if (this.$input.current) {
      const $input = nextInput(this.$input.current);
      if ($input) {
        this.setState({ visible: false });
        $input.focus();
      }
    }
  }

  handleKeyDown = (e) => {
    const { currentTarget } = e;
    if (e.keyCode === 13) this.submitChanges(e);
    if (e.keyCode === 39) {
      if (
        currentTarget.selectionStart >= currentTarget.value.length &&
        currentTarget.selectionStart === currentTarget.selectionEnd
      ) {
        e.preventDefault();
        this.nextInput();
      }
    }
  };

  componentDidUpdate(prevProps, prevState) {
    const { dirtyValue } = this.state;
    if (prevState.dirtyValue === undefined || dirtyValue === undefined) return;

    if (prevState.dirtyValue.length === 1 && dirtyValue.length === 2) {
      this.nextInput();
    }
  }
}

class Minutes extends ItemPicker {
  field = 'minutes';

  minMax() {
    return [0, 59];
  }

  prevFocus() {
    if (this.$input.current) {
      const $input = prevInput(this.$input.current);
      if ($input) {
        this.setState({ visible: false });
        $input.focus();
      }
    }
  }

  handleKeyDown = (e) => {
    const { currentTarget } = e;
    if (e.keyCode === 13) this.submitChanges(e);
    if (e.keyCode === 37) {
      if (
        currentTarget.selectionStart <= 0 &&
        currentTarget.selectionStart === currentTarget.selectionEnd
      ) {
        e.preventDefault();
        this.prevFocus();
      }
    }
    if (e.keyCode === 8) {
      if (currentTarget.value.length === 0) {
        e.preventDefault();
        this.prevFocus();
      }
    }
  };
}

export { Hours, Minutes };
