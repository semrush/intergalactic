import React, { useState } from 'react';
import InputMask from '@semcore/ui/input-mask';

export default () => {
  const [value, changeValue] = useState('99');
  return (
    <InputMask w={300}>
      <InputMask.Value
        aliases={{ x: /[0-9]/ }}
        mask="99xxxx"
        value={value}
        onChange={changeValue}
        title="4-digit number"
      />
    </InputMask>
  );
};
