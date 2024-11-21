import React from 'react';
import { Flex } from '@semcore/flex-box';
import Select from '@semcore/select';
import { ButtonTrigger, LinkTrigger } from '@semcore/base-trigger';
import { Text } from '@semcore/typography';

const options = Array(6)
  .fill('')
  .map((_, index) => ({
    value: index,
    label: `Option ${index}`,
    children: `Option ${index}`,
  }));

const Demo = () => (
  <Flex gap={4} flexWrap direction='column'>
    <Flex direction='column'>
      <Text tag='label' size={200} htmlFor='button-trigger-select'>
        Button trigger select
      </Text>
      {/* ButtonTrigger is the default trigger */}
      <Select
        tag={ButtonTrigger}
        options={options}
        id='button-trigger-select'
        placeholder='Select option'
        mt={2}
        mr='auto'
        w='100%'
      />
    </Flex>
    <Flex direction='column'>
      <Select tag={LinkTrigger} options={options} placeholder='Select option' mt={2} mr='auto' />
    </Flex>
  </Flex>
);

export default Demo;
