import Checkbox from '@semcore/checkbox';
import React from 'react';

import type { BooleanControlType } from '../../types/Controls';

interface IBooleanControlProps extends BooleanControlType {
  onChange: (value: boolean) => void;
}

function BooleanControl({ value, onChange, displayName }: IBooleanControlProps) {
  return <Checkbox mt={1} aria-label={displayName} checked={value} onChange={onChange} />;
}

export default BooleanControl;
