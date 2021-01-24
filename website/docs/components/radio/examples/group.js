import React, { useState } from 'react';
import Radio, { RadioGroup } from '@semcore/radio';

function Demo() {
  const [value, setValue] = useState('1');
  return (
    <div>
      <RadioGroup name="radio" value={value} onChange={(v) => setValue(v)}>
        <Radio mr={2}>
          <Radio.Value value="1" />
          <Radio.Text>Value 1</Radio.Text>
        </Radio>
        <Radio mr={2}>
          <Radio.Value value="2" />
          <Radio.Text>Value 2</Radio.Text>
        </Radio>
        <Radio mr={2}>
          <Radio.Value value="3" />
          <Radio.Text>Value 3</Radio.Text>
        </Radio>
      </RadioGroup>
    </div>
  );
}

export default Demo;
