import Pills from '@semcore/pills';
import React from 'react';

import type { InlineRadioControlType } from '../../types/Controls';

interface InlineRadioControlProps extends InlineRadioControlType {
  onChange: (value: string) => void;
}

function InlineRadioControl({
  value,
  onChange,
  options,
}: InlineRadioControlProps) {
  if (!Array.isArray(options)) return null;

  return (
    <Pills value={value} onChange={onChange}>
      {options.map((option) => (
        <Pills.Item key={option} value={option}>
          {option}
        </Pills.Item>
      ))}
    </Pills>
  );
}

export default InlineRadioControl;
