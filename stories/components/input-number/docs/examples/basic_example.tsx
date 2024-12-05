import React from 'react';
import InputNumber from '@semcore/input-number';

const Demo = () => {
  return (
    <InputNumber size='m' state='normal'>
      <InputNumber.Value disabled={false} max={100000} min={undefined} step={1} />
      <InputNumber.Controls showControls={false} />
    </InputNumber>
  );
};

export default Demo;
