import React from 'react';
import Select from '@semcore/select';
import { LinkTrigger } from '@semcore/base-trigger';

const options = Array(6)
  .fill('')
  .map((_, index) => ({ value: index, children: `Label ${index}` }));

const Demo = () => <Select tag={LinkTrigger} options={options} placeholder='Select' />;

export default Demo;
