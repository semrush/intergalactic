import React from 'react';
import Radio from '@semcore/ui/radio';
import { inputProps } from '@semcore/ui/utils/lib/inputProps';

const Demo = () => {
  const includeInputProps = [...inputProps, 'data-test-id'];
  return (
    <Radio>
      <Radio.Value includeInputProps={includeInputProps} data-test-id='value' />
      <Radio.Text>Value</Radio.Text>
    </Radio>
  );
};

export default Demo;
