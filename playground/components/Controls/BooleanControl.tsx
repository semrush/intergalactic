import Checkbox from '@semcore/checkbox';
import React from 'react';

import type { BooleanControlType } from '../../types/Controls';

interface IBooleanControlProps extends BooleanControlType {
  value: boolean;
  onChange: (value: boolean) => void;
}

function BooleanControl({ value, onChange, displayName }: IBooleanControlProps) {
  return <Checkbox aria-label={displayName} checked={value} onChange={onChange} />;
}

export default BooleanControl;
