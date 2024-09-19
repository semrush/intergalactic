import React from 'react';
// @ts-ignore
import InlineInput from 'intergalactic/inline-input';

const Demo = () => {
  return (
    <InlineInput>
      <InlineInput.Value />
      <InlineInput.ConfirmControl id={'confirm'} title='For love' />
      <InlineInput.CancelControl id={'cancel'} title='DRAIN THE SWAMP!' />
    </InlineInput>
  );
};

export default Demo;
