import React from 'react';
import { Flex } from '@semcore/flex-box';
import Select from '@semcore/select';
import { Text } from '@semcore/typography';

const options = Array(20)
  .fill('')
  .map((_, index) => ({
    value: index,
    label: `Option ${index}`,
    children: `Option ${index}`,
  }));

const Demo = () => (
  <Flex direction='column'>
    <Text tag='label' size={200} htmlFor='multiselect-select'>
      Multiselect
    </Text>
    <Select mt={2} mr='auto' id='multiselect-select' options={options} multiselect />
  </Flex>
);

export default Demo;
