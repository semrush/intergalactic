import React from 'react';
import InlineInput from '@semcore/inline-input';

const Example = () => {
  return (
    <InlineInput
      w={300}
      onBlurBehavior='cancel'
      onCancel={console.log}
      onChange={console.log}
      onConfirm={console.log}
    >
      <InlineInput.Addon htmlFor='basic-example' tag='label'>
        User name:
      </InlineInput.Addon>
      <InlineInput.Value id='basic-example' defaultValue='John Doe' />
      <InlineInput.ConfirmControl />
      <InlineInput.CancelControl />
    </InlineInput>
  );
};

const Demo = Example;

export default Demo;
