import InputNumber from '@semcore/input-number';
import { Text } from '@semcore/typography';
import React from 'react';

const Demo = () => {
  return (
    <>
      <Text tag='label' htmlFor='basic-example'>
        Numeric input
      </Text>
      <InputNumber size='m' state='normal'>
        <InputNumber.Value disabled={false} max={100000} min={undefined} step={1} id='basic-example' />
        <InputNumber.Controls showControls={false} />
      </InputNumber>
    </>
  );
};

export default Demo;
