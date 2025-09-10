import Textarea from '@semcore/textarea';
import { Text } from '@semcore/typography';
import React from 'react';

import type { TextAreaControlType } from '../../types/Controls';

interface ITextAreaControlProps extends TextAreaControlType {
  onChange: (value: string) => void;
}

function TextAreaControl({ value, onChange, displayName }: ITextAreaControlProps) {
  return (
    <label style={{ display: 'contents' }}>
      <Text mt={1}>{displayName}</Text>
      <Textarea w='100%' value={value} onChange={onChange} />
    </label>
  );
}

export default TextAreaControl;
