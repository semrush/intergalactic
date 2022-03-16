import React from 'react';
import UserM from '@semcore/icon/User/m';
import InlineInput from '@semcore/inline-input';

const Example = () => {
  return (
    <InlineInput>
      <InlineInput.Addon tag={UserM} />
      <InlineInput.Outline>
        <InlineInput.Addon>user name:</InlineInput.Addon>
        <InlineInput.Value />
      </InlineInput.Outline>
      <InlineInput.ControlButtons />
    </InlineInput>
  );
};

export default Example;
