import React, { useState } from 'react';
import Radio, { RadioGroup } from '@semcore/ui/radio';
import { Text } from '@semcore/ui/typography';

const Demo = () => {
  const [value, setValue] = useState('1');
  return (
    <div>
      <RadioGroup name="radio" value={value} onChange={(v) => setValue(v)}>
        <div role="radiogroup" aria-labelledby="radioGroup">
          <p id="radioGroup" style={{ fontSize: '16px' }}>
            Select value:
          </p>
          <Radio mr={3}>
            <Radio.Value value="1" />
            <Radio.Text>Value 1</Radio.Text>
          </Radio>
          <Radio mr={3}>
            <Radio.Value value="2" />
            <Radio.Text>Value 2</Radio.Text>
          </Radio>
          <Radio mr={3}>
            <Radio.Value value="3" />
            <Radio.Text>Value 3</Radio.Text>
          </Radio>
        </div>
      </RadioGroup>
    </div>
  );
};

export default Demo;
