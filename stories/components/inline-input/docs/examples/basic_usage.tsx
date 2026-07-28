import InlineInput from '@semcore/ui/inline-input';
import type { InlineInputProps, InlineInputValueProps } from '@semcore/ui/inline-input';
import React from 'react';

const BasicUsage = ({
  disabled = false,
  loading,
  state,
  autoFocus,
  defaultValue = 'John Doe',
}: InlineInputProps & InlineInputValueProps): JSX.Element => {
  return (
    <InlineInput
      onBlurBehavior='cancel'
      onCancel={console.log}
      onChange={console.log}
      onConfirm={console.log}
      disabled={disabled}
      loading={loading}
      state={state}
    >
      <InlineInput.Addon htmlFor='basic-example' tag='label'>
        Display name:
      </InlineInput.Addon>
      <InlineInput.Value id='basic-example' defaultValue={defaultValue} autoFocus={autoFocus} />
      <InlineInput.ConfirmControl />
      <InlineInput.CancelControl />
    </InlineInput>
  );
};

export const basicUsageDefaultProps: InlineInputProps & InlineInputValueProps = {
  disabled: false,
  loading: undefined,
  state: undefined,
  defaultValue: 'John Doe',
};

export default BasicUsage;
