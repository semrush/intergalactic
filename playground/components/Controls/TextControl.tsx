import Input from '@semcore/input';
import { Text } from '@semcore/typography';
import React from 'react';

import type { TextControlType } from '../../types/Controls';

interface ITextControlProps extends TextControlType {
  onChange: (value: string) => void;
}

function TextControl({ value, onChange, displayName }: ITextControlProps) {
  return (
    <label style={{ display: 'contents' }}>
      <Text mt={1}>{displayName}</Text>
      <Input w='100%'>
        <Input.Value value={value} onChange={onChange} />
      </Input>
    </label>
  );
}

export default TextControl;
