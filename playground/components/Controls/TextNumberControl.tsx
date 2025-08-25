import InputNumber from '@semcore/input-number';
import React from 'react';

import type { TextNumberControlType } from '../../types/Controls';

interface ITextNumberControlProps extends TextNumberControlType {
  onChange: (value: string) => void;
}

function TextNumberControl({ value, onChange, displayName, min, max }: ITextNumberControlProps) {
  return (
    <InputNumber w='100%'>
      <InputNumber.Value
        aria-label={displayName}
        value={value?.toString()}
        onChange={onChange}
        min={min}
        max={max}
      />
      <InputNumber.Controls showControls />
    </InputNumber>
  );
}

export default TextNumberControl;
