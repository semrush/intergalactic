import React from 'react';
import InlineInput from '@semcore/inline-input';

const Example = () => {
  return (
    <InlineInput>
      <InlineInput.Addon>user name:</InlineInput.Addon>
      <InlineInput.Value />
      <InlineInput.ConfirmIcon />
      <InlineInput.CancelIcon />
    </InlineInput>
  );
};

export default Example;
