import React from 'react';
import Select from '@semcore/select';
import { Flex } from '@semcore/flex-box';

const Demo = () => {
  const options = Array(6)
    .fill()
    .map((i, idx) => ({
      value: idx,
      children: `Option ${idx}`,
      label: `Label ${idx}`,
    }));

  return (
    <Flex p={10} alignItems="center" justifyContent="center">
      <Select options={options} placeholder="Select an option, sir!" m="auto" />
    </Flex>
  );
};

export default Demo;
