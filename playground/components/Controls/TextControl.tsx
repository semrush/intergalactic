import { Box } from '@semcore/ui/base-components';
import Input from '@semcore/ui/input';
import { Text } from '@semcore/ui/typography';
import React from 'react';

import type { TextControlType } from '../../types/Controls';

interface ITextControlProps extends TextControlType {
  onChange: (value: string) => void;
}

function TextControl({ value, onChange, displayName }: ITextControlProps) {
  return (
    <Box tag='label' display='contents'>
      <Text mt={1}>{displayName}</Text>
      <Input w='100%'>
        <Input.Value value={value} onChange={onChange} />
      </Input>
    </Box>
  );
}

export default TextControl;
