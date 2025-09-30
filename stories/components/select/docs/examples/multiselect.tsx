import { Flex } from '@semcore/ui/base-components';
import Select from '@semcore/ui/select';
import { Text } from '@semcore/ui/typography';
import React from 'react';

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
