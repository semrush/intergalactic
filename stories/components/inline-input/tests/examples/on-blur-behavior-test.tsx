import { Flex } from '@semcore/ui/base-components';
import InlineInput from '@semcore/ui/inline-input';
import React from 'react';

const Example = () => {
  return (
    <Flex direction='row' gap={2}>
      <InlineInput
        data-testid='onBlurBehavior-cancel'
        w={300}
        onBlurBehavior='cancel'
        onCancel={(value: any) => console.log('Cancel:', value)}
        onChange={(value: any) => console.log('Change:', value)}
        onConfirm={(value: any) => console.log('Confirm:', value)}
      >
        <InlineInput.Addon htmlFor='onBlurBehavior-cancel' tag='label'>
          cancel
        </InlineInput.Addon>
        <InlineInput.Value id='onBlurBehavior-cancel' defaultValue='John Doe' />
        <InlineInput.ConfirmControl />
        <InlineInput.CancelControl />
      </InlineInput>

      <InlineInput
        data-testid='onBlurBehavior-confirm'
        w={300}
        onBlurBehavior='confirm'
        onCancel={() => console.log('Cancel')}
        onChange={(value: any) => console.log('Change:', value)}
        onConfirm={() => console.log('Confirm')}
      >
        <InlineInput.Addon htmlFor='onBlurBehavior-confirm' tag='label'>
          confirm
        </InlineInput.Addon>
        <InlineInput.Value id='onBlurBehavior-confirm' defaultValue='John Doe' />
        <InlineInput.ConfirmControl />
        <InlineInput.CancelControl />
      </InlineInput>

      <InlineInput
        data-testid='onBlurBehavior-none'
        w={300}
        onBlurBehavior='none'
        onCancel={() => console.log('Cancel')}
        onChange={(value: any) => console.log('Change:', value)}
        onConfirm={() => console.log('Confirm')}
      >
        <InlineInput.Addon htmlFor='onBlurBehavior-none' tag='label'>
          none
        </InlineInput.Addon>
        <InlineInput.Value id='onBlurBehavior-none' defaultValue='John Doe' />
        <InlineInput.ConfirmControl />
        <InlineInput.CancelControl />
      </InlineInput>
    </Flex>
  );
};

export default Example;
