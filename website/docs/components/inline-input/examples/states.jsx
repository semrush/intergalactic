import React from 'react';
import InlineInput from '@semcore/inline-input';

const Example = () => {
  return (
    <div>
      <InlineInput state="valid">
        <InlineInput.Value />
        <InlineInput.ConfirmControl />
        <InlineInput.CancelControl />
      </InlineInput>
      <br />
      <br />
      <InlineInput state="invalid">
        <InlineInput.Value />
        <InlineInput.ConfirmControl />
        <InlineInput.CancelControl />
      </InlineInput>
      <br />
      <br />
      <InlineInput disabled>
        <InlineInput.Value />
        <InlineInput.ConfirmControl />
        <InlineInput.CancelControl />
      </InlineInput>
      <br />
      <br />
      <InlineInput loading>
        <InlineInput.Value />
        <InlineInput.ConfirmControl />
        <InlineInput.CancelControl />
      </InlineInput>
    </div>
  );
};

export default Example;
