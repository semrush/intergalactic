import React from 'react';
import Select from '@semcore/select';
import { Text } from '@semcore/typography';

const options = Array(5)
  .fill('')
  .map((i, idx) => ({
    value: `Option ${idx}`,
  }));

export default () => (
  <Select placeholder="Select value" multiselect>
    {(props, handlers) => {
      const {
        getTriggerProps, // function encapsulating Select.Trigger logic
        getPopperProps, // function encapsulating Select.Popper logic
        getListProps, // function encapsulating Select.List logic
        getInputSearchProps, // function encapsulating Select.InputSearch logic
        getOptionProps, // function encapsulating Select.Option logic
        getOptionCheckboxProps, // function encapsulating Select.OptionCheckbox logic
        value: currentValue, // the current value of the select
      } = props;
      const {
        visible, // function that controls the internal state of visibility
        value, // function that controls the internal state of the selected value
      } = handlers;

      const handleClick = () => {
        const newValue = currentValue.length ? [] : options.map(({ value }) => value);
        value(newValue);
        return false; // cancel the default handler
      };

      return (
        <React.Fragment>
          <Select.Trigger />
          <Select.Menu>
            <Select.Option onClick={handleClick}>
              <Text color="denim-blue">{currentValue.length ? 'Deselect all' : 'Select all'}</Text>
            </Select.Option>
            {options.map((option) => (
              <Select.OptionCheckbox value={option.value} key={option.value}>
                {option.value}
              </Select.OptionCheckbox>
            ))}
          </Select.Menu>
        </React.Fragment>
      );
    }}
  </Select>
);
