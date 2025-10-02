import InlineInput from '@semcore/ui/inline-input';
import type { InlineInputProps } from '@semcore/ui/inline-input';
import React from 'react';

const BasicUsage = (props: InlineInputProps) => {
  const { disabled, loading, state, autoFocus, defaultValue, placeholder } = props;

  return (
    <InlineInput
      w={300}
      onBlurBehavior='cancel'
      onCancel={console.log}
      onChange={console.log}
      onConfirm={console.log}
      disabled={disabled}
      loading={loading}
      state={state}
    >
      <InlineInput.Addon htmlFor='basic-example' tag='label'>
        User name:
      </InlineInput.Addon>
      <InlineInput.Value id='basic-example' defaultValue={defaultValue} autoFocus={autoFocus} />
      <InlineInput.ConfirmControl />
      <InlineInput.CancelControl />
    </InlineInput>
  );
};

export const basicUsageDefaultProps: InlineInputProps = {
  disabled: false,
  loading: undefined,
  state: undefined,
  autoFocus: undefined,
  defaultValue: 'John Doe',
};

BasicUsage.defaultProps = basicUsageDefaultProps;

export default BasicUsage;
