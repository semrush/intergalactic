import React from 'react';
import Select from 'intergalactic/select';
import { Text } from 'intergalactic/typography';
import { Flex } from 'intergalactic/flex-box';

const options = Array(5)
  .fill('')
  .map((i, idx) => ({
    value: `Option ${idx}`,
  }));

const Demo = () => (
  <Flex direction='column'>
    <Text tag='label' size={200} htmlFor='render-function-select'>
      Select with custom render function
    </Text>
    <Select placeholder='Select value' multiselect>
      {(props, handlers) => {
        const {
          getTriggerProps, // function encapsulating Select.Trigger logic
          getPopperProps, // function encapsulating Select.Popper logic
          getListProps, // function encapsulating Select.List logic
          getDividerProps, // function encapsulating Select.Divider logic
          getItemHintProps, // function encapsulating Select.Item.Hint logic
          getItemProps, // function encapsulating Select.Item logic,
          getItemTitleProps, // function encapsulating Select.ItemTitle logic
          getGroupProps, // function encapsulating Select.Group logic
          getOptionProps, // function encapsulating Select.Option logic
          getOptionCheckboxProps, // function encapsulating Select.Option.Checkbox logic
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
            <Select.Trigger mt={2} mr='auto' id='render-function-select' />
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
  </Flex>
);

export default Demo;
