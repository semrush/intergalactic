import InlineInput from '@semcore/inline-input';
import React from 'react';

const Example = () => {
  return (
    <>
      <InlineInput
        w={300}
        onBlurBehavior='cancel'
        onCancel={() => console.log('Cancel')}
        onChange={(value: any) => console.log('Change:', value)}
        onConfirm={(value: any) => console.log('Confirm:', value)}
      >
        <InlineInput.Addon htmlFor='basic-example' tag='label'>
          cancel
        </InlineInput.Addon>
        <InlineInput.Value id='basic-example' defaultValue='John Doe' />
        <InlineInput.ConfirmControl />
        <InlineInput.CancelControl />
      </InlineInput>

      <InlineInput
        w={300}
        onBlurBehavior='confirm'
        onCancel={() => console.log('Cancel')}
        onChange={(value: any) => console.log('Change:', value)}
        onConfirm={() => console.log('Confirm')}
      >
        <InlineInput.Addon htmlFor='basic-example' tag='label'>
          confirm
        </InlineInput.Addon>
        <InlineInput.Value id='basic-example' defaultValue='John Doe' />
        <InlineInput.ConfirmControl />
        <InlineInput.CancelControl />
      </InlineInput>

      <InlineInput
        w={300}
        onBlurBehavior='none'
        onCancel={() => console.log('Cancel')}
        onChange={(value) => console.log('Change:', value)}
        onConfirm={() => console.log('Confirm')}
      >
        <InlineInput.Addon htmlFor='basic-example' tag='label'>
          none
        </InlineInput.Addon>
        <InlineInput.Value id='basic-example' defaultValue='John Doe' />
        <InlineInput.ConfirmControl />
        <InlineInput.CancelControl />
      </InlineInput>
    </>
  );
};

export default Example;
