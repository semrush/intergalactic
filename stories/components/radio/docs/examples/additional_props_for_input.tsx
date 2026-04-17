import Radio, { RadioGroup } from '@semcore/ui/radio';
import type { NSRadio } from '@semcore/ui/radio';
import React from 'react';

const Demo = (props: NSRadio.Group.Props) => {
  return (
    <RadioGroup
      name='radio'
      aria-label='radiogroup with custom properties'
      size={props.size}
      disabled={props.disabled}
      theme={props.theme}
    >
      <Radio mb={3} value='1'>
        <Radio.Value>
          <Radio.Value.Control data-test-id='TEST_ID' />
          <Radio.Value.RadioMark />
        </Radio.Value>
        <Radio.Text>First value</Radio.Text>
      </Radio>
      <Radio mb={3} value='2' label='Second value' />
    </RadioGroup>
  );
};
export const defaultAdditionalInputProps: NSRadio.Group.Props = {
  size: 'm',
  theme: undefined,
  disabled: false,
};

Demo.defaultProps = defaultAdditionalInputProps;
export default Demo;
