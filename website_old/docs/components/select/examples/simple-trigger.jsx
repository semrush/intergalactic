import React from 'react';
import { Flex } from '@semcore/flex-box';
import Select from '@semcore/select';
import { ButtonTrigger, LinkTrigger } from '@semcore/base-trigger';

const options = Array(6)
  .fill('')
  .map((_, index) => ({
    value: index,
    label: `Label ${index}`,
    children: `Option ${index}`,
  }));

export default () => (
  <Flex>
    {/* ButtonTrigger is the default trigger */}
    <Select tag={ButtonTrigger} options={options} placeholder="Select an option, sir 🧐" m="auto" />
    <Select tag={LinkTrigger} options={options} placeholder="Select an option, sir 🧐" m="auto" />
  </Flex>
);
