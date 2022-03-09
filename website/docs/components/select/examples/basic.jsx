import React from 'react';
import { Flex } from '@semcore/flex-box';
import Select from '@semcore/select';

const options = Array(6)
  .fill('')
  .map((_, index) => ({
    value: index, // value of the selected option
    label: `Label ${index}`, // the value displayed in the trigger when the option is selected
    children: `Option ${index}`, // option's children displayed in the dropdown
  }));

export default () => (
  <Flex>
    <Select options={options} placeholder="Select an option, sir 🧐" m="auto" />
  </Flex>
);
