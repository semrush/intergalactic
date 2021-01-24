import React from 'react';
import Select from '@semcore/select';
import { Flex } from '@semcore/flex-box';

const options = Array(6)
  .fill()
  .map((i, idx) => ({
    value: idx,
    title: `Awesome option ${idx}`,
  }));

const Demo = () => (
  <Flex p={10} alignItems="center" justifyContent="center">
    <Select multiselect placeholder="Select values">
      <Select.Trigger />
      <Select.Menu>
        {options.map((option, idx) => {
          const { value, title } = option;
          return (
            <Select.OptionCheckbox value={value} key={idx}>
              {title}
            </Select.OptionCheckbox>
          );
        })}
      </Select.Menu>
    </Select>
  </Flex>
);

export default Demo;
