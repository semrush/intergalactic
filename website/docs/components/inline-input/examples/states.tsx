import React from 'react';
import InlineInput from 'intergalactic/inline-input';

const Example = () => {
  return (
    <div>
      <InlineInput state='valid'>
        <InlineInput.Value aria-label='valid state inline input' />
        <InlineInput.ConfirmControl />
        <InlineInput.CancelControl />
      </InlineInput>
      <br />
      <br />
      <InlineInput state='invalid'>
        <InlineInput.Value aria-label='invalid state inline input' />
        <InlineInput.ConfirmControl />
        <InlineInput.CancelControl />
      </InlineInput>
      <br />
      <br />
      <InlineInput disabled>
        <InlineInput.Value aria-label='disabled state inline input' />
        <InlineInput.ConfirmControl />
        <InlineInput.CancelControl />
      </InlineInput>
      <br />
      <br />
      <InlineInput loading>
        <InlineInput.Value aria-label='loading state inline input' />
        <InlineInput.ConfirmControl />
        <InlineInput.CancelControl />
      </InlineInput>
    </div>
  );
};

const Demo = Example;

export default Demo;
