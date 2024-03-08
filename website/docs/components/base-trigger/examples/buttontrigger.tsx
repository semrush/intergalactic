import React from 'react';
import Select from 'intergalactic/select';
import { ButtonTrigger } from 'intergalactic/base-trigger';

const options = Array(6)
  .fill('')
  .map((_, index) => ({
    value: index,
    label: `Label ${index}`,
    children: `Option ${index}`,
  }));

const Demo = () => (
  <Select tag={ButtonTrigger} options={options} placeholder='Select an option' m='auto' />
);

export default Demo;
