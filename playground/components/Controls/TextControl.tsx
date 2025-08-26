import Input from '@semcore/input';
import React from 'react';

import type { TextControlType } from '../../types/Controls';

interface ITextControlProps extends TextControlType {
  onChange: (value: string) => void;
}

function TextControl({ value, onChange }: ITextControlProps) {
  return (
    <Input w='100%'>
      <Input.Value value={value} onChange={onChange} />
    </Input>
  );
}

export default TextControl;
