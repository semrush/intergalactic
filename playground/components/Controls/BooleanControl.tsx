import Checkbox from '@semcore/ui/checkbox';
import React from 'react';

import type { BooleanControlType } from '../../types/Controls';

interface IBooleanControlProps extends BooleanControlType {
  onChange: (value: boolean) => void;
}

function BooleanControl({ value, onChange, displayName }: IBooleanControlProps) {
  return (
    <Checkbox mt={1} checked={value} onChange={onChange} display='contents'>
      <Checkbox.Text ml={0}>
        {displayName}
      </Checkbox.Text>
      <Checkbox.Value />
    </Checkbox>
  );
}

export default BooleanControl;
