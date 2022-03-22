import React from 'react';
import InlineInput from '@semcore/inline-input';

const Example = () => {
  return (
    <InlineInput
      onBlurBehavior="cancel"
      defaultValue="Hello world"
      onCancel={console.log}
      onChange={console.log}
      onConfirm={console.log}
    />
  );
};

export default Example;
