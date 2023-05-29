import React from 'react';
import Checkbox from '@semcore/ui/checkbox';
import { inputProps } from '@semcore/ui/utils/lib/inputProps';

const Demo = () => {
  const includeInputProps = [...inputProps, 'data-test-id'];
  return (
    <Checkbox>
      <Checkbox.Value includeInputProps={includeInputProps} data-test-id='value' />
      <Checkbox.Text>Value</Checkbox.Text>
    </Checkbox>
  );
};

export default Demo;
