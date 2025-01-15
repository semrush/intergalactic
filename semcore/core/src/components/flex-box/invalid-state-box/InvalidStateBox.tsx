import React from 'react';
import { createComponent } from '../../../coreFactory';
import { sstyled } from '../../../styled';
import { Root } from '../../../types/Component';
import style from './invalidStateBox.shadow.css';
import Box from '../Box';

const InvalidStatePatternComponent = () => {
  const SPattern = Root;

  return sstyled(style)(<SPattern render={Box} />);
};

export const InvalidStateBox = createComponent(InvalidStatePatternComponent);

export default InvalidStateBox;
