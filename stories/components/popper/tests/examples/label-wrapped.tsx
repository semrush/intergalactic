import React from 'react';
// @ts-ignore
import Select from '@semcore/select';

const options = Array(5)
  .fill('')
  .map((_, index) => ({
    label: `Option ${index}`,
    children: `Option ${index}`,
    value: index,
  }));

const Demo = () => {
  return (
    <label>
      <div>Label</div>
      <Select placeholder={'Select something'} options={options} />
    </label>
  );
};

export default Demo;
