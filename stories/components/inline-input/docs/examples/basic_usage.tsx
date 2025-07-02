import InlineInput from '@semcore/inline-input';
import type { InlineInputProps } from 'inline-input/lib/types';
import React from 'react';

const BasicUsage = (props: InlineInputProps) => {
  const { disabled } = props;

  return (
    <InlineInput
      w={300}
      onBlurBehavior='cancel'
      onCancel={console.log}
      onChange={console.log}
      onConfirm={console.log}
      disabled={disabled}
    >
      <InlineInput.Addon htmlFor='basic-example' tag='label'>
        User name:
      </InlineInput.Addon>
      <InlineInput.Value id='basic-example' defaultValue='John Doe' />
      <InlineInput.ConfirmControl />
      <InlineInput.CancelControl />
    </InlineInput>
  );
};

export const basicUsageDefaultProps: InlineInputProps = {
  disabled: false,
};

BasicUsage.defaultProps = basicUsageDefaultProps;

export default BasicUsage;
