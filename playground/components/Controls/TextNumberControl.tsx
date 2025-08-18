import InputNumber from '@semcore/input-number';
import React from 'react';

import type { TextNumberControlType } from '../../types/Controls';

interface ITextNumberControlProps extends TextNumberControlType {
  value: number;
  onChange: (value: string) => void;
}

function TextNumberControl({ value, onChange, displayName }: ITextNumberControlProps) {
  return (
    <InputNumber w='100%'>
      <InputNumber.Value aria-label={displayName} value={`${value}`} onChange={onChange} />
    </InputNumber>
  );
}

export default TextNumberControl;
