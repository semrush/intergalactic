import React from 'react';
import { Flex } from 'intergalactic/flex-box';
import Select from 'intergalactic/select';
import { Text } from 'intergalactic/typography';

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
