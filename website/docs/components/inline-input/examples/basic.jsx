import React from 'react';
import InlineInput from '@semcore/inline-input';

const Example = () => {
  return (
    <InlineInput onBlurBehavior="cancel" onCancel={console.log} onChange={console.log}>
      <InlineInput.Addon>user name:</InlineInput.Addon>
      <InlineInput.Value defaultValue="Hello world" onConfirm={console.log} />
      <InlineInput.ConfirmControl />
      <InlineInput.CancelControl />
    </InlineInput>
  );
};

export default Example;
