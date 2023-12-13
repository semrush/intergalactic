import React from 'react';
import Select from '@semcore/ui/select';
import { LinkTrigger } from '@semcore/ui/base-trigger';

const options = Array(6)
  .fill('')
  .map((_, index) => ({
    value: index,
    label: `Label ${index}`,
    children: `Option ${index}`,
  }));

export default () => (
  <Select tag={LinkTrigger} options={options} placeholder='Select an option' m='auto' />
);
