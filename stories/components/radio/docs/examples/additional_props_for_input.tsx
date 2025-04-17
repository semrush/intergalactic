import React from 'react';
import Radio, { RadioGroup } from '@semcore/radio';

const Demo = () => {
  return (
    <RadioGroup aria-label='radiogroup with custom properties'>
      <Radio mb={3} value={'1'}>
        <Radio.Value>
          <Radio.Value.Control data-test-id={'TEST_ID'} />
          <Radio.Value.RadioMark />
        </Radio.Value>
        <Radio.Text>First value</Radio.Text>
      </Radio>
      <Radio mb={3} value={'2'} label={'Second value'} />
    </RadioGroup>
  );
};

export default Demo;
