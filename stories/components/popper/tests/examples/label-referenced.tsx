import React from 'react';
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
    <div>
      <div>
        <label htmlFor='select'>Label</label>
      </div>
      {/* @ts-ignore */}
      <Select placeholder={'Select something'} options={options} id='select' />
    </div>
  );
};

export default Demo;
