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
    <div>
      <div>
        <label htmlFor='select'>Label</label>
      </div>
      {/* @ts-ignore */}
      <Select placeholder='Select something' options={options} id='select' />
    </div>
  );
};

export default Demo;
