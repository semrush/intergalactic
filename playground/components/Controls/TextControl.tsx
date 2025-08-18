import Input from '@semcore/input';
import React from 'react';

import type { TextControlType } from '../../types/Controls';

interface ITextControlProps extends TextControlType {
  value: string;
  onChange: (value: string) => void;
}

function TextControl({ value, onChange, displayName }: ITextControlProps) {
  return (
    <Input w='100%'>
      <Input.Value aria-label={displayName} value={value} onChange={onChange} />
    </Input>
  );
}

export default TextControl;
