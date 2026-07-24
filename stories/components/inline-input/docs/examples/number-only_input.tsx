import InlineInput from '@semcore/ui/inline-input';
import React from 'react';

const Example = () => {
  return (
    <div>
      <InlineInput>
        <InlineInput.Addon htmlFor='number-example' tag='label'>
          Number:
        </InlineInput.Addon>
        <InlineInput.NumberValue id='number-example' defaultValue={100} />
        <InlineInput.NumberControls />
        <InlineInput.ConfirmControl />
      </InlineInput>
    </div>
  );
};

const Demo = Example;

export default Demo;
