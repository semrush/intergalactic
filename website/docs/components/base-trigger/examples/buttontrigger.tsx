import React from 'react';
import Select from 'intergalactic/select';
import { ButtonTrigger } from 'intergalactic/base-trigger';
import { Text } from 'intergalactic/typography';
import { Flex } from 'intergalactic/flex-box';

const options = Array(6)
  .fill('')
  .map((_, index) => ({
    value: index,
    label: `Label ${index}`,
    children: `Option ${index}`,
  }));

const Demo = () => (
  <Flex direction='column'>
    <Text tag='label' size={200} htmlFor='button-trigger-select'>
      Button trigger
    </Text>
    <Select
      id='button-trigger-select'
      tag={ButtonTrigger}
      options={options}
      placeholder='Select an option'
      mt={2}
      mr='auto'
    />
  </Flex>
);

export default Demo;
