import React, { useState } from 'react';
import { Flex } from '@semcore/flex-box';
import Select from '@semcore/select';

const options = Array(6)
  .fill('')
  .map((_, index) => ({
    value: index,
    label: `Label ${index}`,
    children: `Option ${index}`,
  }));

const { value: initialValue } = options[0];

export default () => {
  const [value, setValue] = useState(initialValue);

  return (
    <Flex>
      <Select
        value={value}
        onChange={setValue}
        options={options}
        placeholder="Select an option, sir 🧐"
        m="auto"
      />
      <Select
        defaultValue={initialValue}
        onChange={setValue}
        options={options}
        placeholder="Select an option, sir 🧐"
        m="auto"
      />
    </Flex>
  );
};
