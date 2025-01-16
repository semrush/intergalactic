import React from 'react';
import InlineInput from '@semcore/inline-input';

const Example = () => {
  return (
    <div>
      <InlineInput w={200}>
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
