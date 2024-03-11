import React from 'react';
import { Flex } from 'intergalactic/flex-box';
import Select from 'intergalactic/select';

const options = Array(20)
  .fill('')
  .map((_, index) => ({
    value: index,
    label: `Label ${index}`,
    children: `Option ${index}`,
  }));

const Demo = () => (
  <Flex>
    <Select options={options} multiselect m='auto' />
  </Flex>
);

export default Demo;
