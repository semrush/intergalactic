import React from 'react';
import { Flex } from 'intergalactic/flex-box';
import Select from 'intergalactic/select';
import { ButtonTrigger, LinkTrigger } from 'intergalactic/base-trigger';

const options = Array(6)
  .fill('')
  .map((_, index) => ({
    value: index,
    label: `Label ${index}`,
    children: `Option ${index}`,
  }));

const Demo = () => (
  <Flex>
    {/* ButtonTrigger is the default trigger */}
    <Select tag={ButtonTrigger} options={options} placeholder='Select option' m='auto' />
    <Select tag={LinkTrigger} options={options} placeholder='Select option' m='auto' />
  </Flex>
);

export default Demo;
