import React from 'react';
import Select from 'intergalactic/select';
import { Text } from 'intergalactic/typography';

const options = Array(5)
  .fill('')
  .map((i, idx) => ({
    value: `Option ${idx}`,
  }));

const Demo = () => (
  <Select placeholder='Select value' multiselect>
    {(props, handlers) => {
      const {
        getTriggerProps, // function encapsulating Select.Trigger logic
        getPopperProps, // function encapsulating Select.Popper logic
        getListProps, // function encapsulating Select.List logic
        getDividerProps, // function encapsulating Select.Divider logic
        getItemHintProps, // function encapsulating Select.ItemHint logic
        getItemProps, // function encapsulating Select.Item logic,
        getItemTitleProps, // function encapsulating Select.ItemTitle logic
        getOptionProps, // function encapsulating Select.Option logic
        getOptionCheckboxProps, // function encapsulating Select.OptionCheckbox logic
        value: currentValue, // the current value of the select
      } = props;
      const {
        visible, // function that controls the internal state of visibility
        value, // function that controls the internal state of the selected value
      } = handlers;

      const handleClick = () => {
        const newValue = (currentValue as any).length ? [] : options.map(({ value }) => value);
        value(newValue);
        return false; // cancel the default handler
      };

      return (
        <React.Fragment>
          <Select.Trigger />
          <Select.Menu>
            <Select.Option value='%all%' onClick={handleClick}>
              <Text color='text-link'>
                {(currentValue as any).length ? 'Deselect all' : 'Select all'}
              </Text>
            </Select.Option>
            {options.map((option) => (
              <Select.Option value={option.value} key={option.value}>
                <Select.Option.Checkbox />
                {option.value}
              </Select.Option>
            ))}
          </Select.Menu>
        </React.Fragment>
      );
    }}
  </Select>
);

export default Demo;
