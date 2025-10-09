import Select from '@semcore/ui/select';
import React from 'react';

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
      <Select placeholder='Select something' options={options} />
    </label>
  );
};

export default Demo;
