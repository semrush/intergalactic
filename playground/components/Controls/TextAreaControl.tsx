import { Box } from '@semcore/ui/base-components';
import Textarea from '@semcore/ui/textarea';
import { Text } from '@semcore/ui/typography';
import React from 'react';

import type { TextAreaControlType } from '../../types/Controls';

interface ITextAreaControlProps extends TextAreaControlType {
  onChange: (value: string) => void;
}

function TextAreaControl({ value, onChange, displayName }: ITextAreaControlProps) {
  return (
    <Box tag='label' display='contents'>
      <Text mt={1}>{displayName}</Text>
      <Textarea w='100%' value={value} onChange={onChange} />
    </Box>
  );
}

export default TextAreaControl;
