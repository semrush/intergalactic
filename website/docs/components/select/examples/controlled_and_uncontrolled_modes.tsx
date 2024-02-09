import React from 'react';
import { Flex } from '@semcore/ui/flex-box';
import Select from '@semcore/ui/select';

const options = Array(6)
  .fill('')
  .map((_, index) => ({
    value: index,
    label: `Label ${index}`,
    children: `Option ${index}`,
  }));

const { value: initialValue } = options[0];

const Demo = () => {
  const [value, setValue] = React.useState(initialValue);

  return (
    <Flex>
      <Select
        value={value}
        onChange={setValue}
        options={options}
        placeholder='Select option'
        m='auto'
      />
      <Select
        defaultValue={initialValue}
        onChange={setValue}
        options={options}
        placeholder='Select option'
        m='auto'
      />
    </Flex>
  );
};

export default Demo;
