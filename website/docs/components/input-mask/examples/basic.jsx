import React from 'react';
import InputMask from '@semcore/ui/input-mask';

export default () => {
  return (
    <InputMask w={300}>
      <InputMask.Value
        mask="9999 9999 9999 9999"
        placeholder="____ ____ ____ ____"
        title="16-digit number"
      />
    </InputMask>
  );
};
