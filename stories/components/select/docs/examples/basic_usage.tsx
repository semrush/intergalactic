import React from 'react';
import { Flex } from '@semcore/flex-box';
import Select from '@semcore/select';
import { Text } from '@semcore/typography';

const options = Array(6)
  .fill('')
  .map((_, index) => ({
    value: index, // value of the selected option
    label: `Option ${index}`, // the value displayed in the trigger when the option is selected
    children: `Option ${index}`, // option's children displayed in the dropdown
  }));

const Demo = () => (
  <Flex direction='column'>
    <Text tag='label' size={200} htmlFor='basic-select'>
      Basic select
    </Text>
    <Select mt={2} mr='auto' options={options} placeholder='Select option' id='basic-select' />
  </Flex>
);

export default Demo;
