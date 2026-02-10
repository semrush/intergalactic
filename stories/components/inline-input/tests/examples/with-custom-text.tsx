import SerpM from '@semcore/icon/Serp/m';
import InlineInput from '@semcore/ui/inline-input';
import React from 'react';

const Demo = () => {
  return (
    <InlineInput>
      <InlineInput.Value />
      <InlineInput.ConfirmControl id='confirm' title='For love' icon={SerpM} />
      <InlineInput.CancelControl id='cancel' title='DRAIN THE SWAMP!' icon={SerpM} />
    </InlineInput>
  );
};

export default Demo;
