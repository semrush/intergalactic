import Textarea from '@semcore/textarea';
import React from 'react';

import type { TextAreaControlType } from '../../types/Controls';

interface ITextAreaControlProps extends TextAreaControlType {
  onChange: (value: string) => void;
}

function TextAreaControl({ value, onChange, displayName }: ITextAreaControlProps) {
  return <Textarea aria-label={displayName} w='100%' value={value} onChange={onChange} />;
}

export default TextAreaControl;
