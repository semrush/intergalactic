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
  <Flex gap={2} direction='column' alignItems='start'>
    <Text tag='label' size={200} htmlFor='button-trigger-select'>
      ButtonTrigger Select
    </Text>
    {/* ButtonTrigger is the default trigger */}
    <Select tag={ButtonTrigger} options={options} id='button-trigger-select' />
    <Text tag='label' size={200} htmlFor='link-trigger-select' mt={2}>
      LinkTrigger Select
    </Text>
    <Select tag={LinkTrigger} options={options} id='link-trigger-select' />
  </Flex>
);

export default Demo;
