import React from 'react';
import Checkbox from 'intergalactic/checkbox';

const Demo = () => {
  return (
    <Checkbox>
      <Checkbox.Value>
        <Checkbox.Value.Control data-testid='checkbox_input_tag' />
        <Checkbox.Value.CheckMark />
      </Checkbox.Value>
      <Checkbox.Text>Value</Checkbox.Text>
    </Checkbox>
  );
};

export default Demo;
