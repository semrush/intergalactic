import React from 'react';
import { Flex } from '@semcore/ui/flex-box';
import Select from '@semcore/ui/select';

const options = Array(20)
  .fill('')
  .map((_, index) => ({
    value: index,
    label: `Label ${index}`,
    children: `Option ${index}`,
  }));

export default () => (
  <Flex>
    <Select options={options} multiselect m="auto" />
  </Flex>
);
