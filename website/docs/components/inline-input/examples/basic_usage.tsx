import React from 'react';
import InlineInput from '@semcore/ui/inline-input';

const Example = () => {
  return (
    <InlineInput
      onBlurBehavior='cancel'
      onCancel={console.log}
      onChange={console.log}
      onConfirm={console.log}
    >
      <InlineInput.Addon htmlFor='basic-example' tag='label'>
        user name:
      </InlineInput.Addon>
      <InlineInput.Value id='basic-example' defaultValue='Hello world' />
      <InlineInput.ConfirmControl />
      <InlineInput.CancelControl />
    </InlineInput>
  );
};

const Demo = Example;
