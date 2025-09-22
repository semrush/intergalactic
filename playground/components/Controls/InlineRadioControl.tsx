import { Box } from '@semcore/base-components';
import Pills from '@semcore/pills';
import { Text } from '@semcore/typography';
import React, { useId } from 'react';

import type { InlineRadioControlType } from '../../types/Controls';

interface InlineRadioControlProps extends InlineRadioControlType {
  onChange: (value: string) => void;
}

function InlineRadioControl({
  value,
  onChange,
  options,
  displayName,
}: InlineRadioControlProps) {
  if (!Array.isArray(options)) return null;

  const labelId = displayName ? `${displayName.toLocaleLowerCase().replace(/\s/g, '_')}_control_label_${useId().replace(/:/g, '_')}` : undefined;

  return (
    <Box tag='label' display='contents'>
      <Text id={labelId} mt={1}>{displayName}</Text>
      <Pills aria-labelledby={labelId} value={value} onChange={onChange}>
        {options.map((option) => (
          <Pills.Item key={option} value={option}>
            {option}
          </Pills.Item>
        ))}
      </Pills>
    </Box>

  );
}

export default InlineRadioControl;
