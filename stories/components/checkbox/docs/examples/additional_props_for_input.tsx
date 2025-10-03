import Checkbox from '@semcore/ui/checkbox';
import React from 'react';

const Demo = () => {
  return (
    <Checkbox>
      <Checkbox.Value>
        <Checkbox.Value.Control data-testid='checkbox_input_tag' />
        <Checkbox.Value.CheckMark />
      </Checkbox.Value>
      <Checkbox.Text>Checkbox with custom properties</Checkbox.Text>
    </Checkbox>
  );
};

export default Demo;
