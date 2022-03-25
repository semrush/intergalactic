import React from 'react';
import UserM from '@semcore/icon/User/m';
import InlineInput from '@semcore/inline-input';

const Example = () => {
  return (
    <InlineInput>
      <InlineInput.Addon tag={UserM} />
      <InlineInput.Underline>
        <InlineInput.Addon>user name:</InlineInput.Addon>
        <InlineInput.Value />
      </InlineInput.Underline>
      <InlineInput.ConfirmIcon />
      <InlineInput.CancelIcon />
    </InlineInput>
  );
};

export default Example;
