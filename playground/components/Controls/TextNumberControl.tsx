import { Box } from '@semcore/ui/base-components';
import InputNumber from '@semcore/ui/input-number';
import { Text } from '@semcore/ui/typography';
import React from 'react';

import type { TextNumberControlType } from '../../types/Controls';

interface ITextNumberControlProps extends TextNumberControlType {
  onChange: (value: string) => void;
}

function TextNumberControl({ value, onChange, min, max, displayName }: ITextNumberControlProps) {
  return (
    <Box tag='label' display='contents'>
      <Text mt={1}>{displayName}</Text>
      <InputNumber w='100%'>
        <InputNumber.Value
          value={value?.toString()}
          onChange={onChange}
          min={min}
          max={max}
        />
        <InputNumber.Controls showControls />
      </InputNumber>
    </Box>
  );
}

export default TextNumberControl;
