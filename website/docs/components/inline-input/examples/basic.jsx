import React from 'react';
import InlineInput from '@semcore/ui/inline-input';

const Example = () => {
  return (
    <InlineInput onBlurBehavior="cancel" onCancel={console.log} onChange={console.log}>
      <InlineInput.Addon id="label" la>user name:</InlineInput.Addon>
      <InlineInput.Value aria-labelledby="label" defaultValue="Hello world" onConfirm={console.log} />
      <InlineInput.ConfirmControl />
      <InlineInput.CancelControl />
    </InlineInput>
  );
};

export default Example;
