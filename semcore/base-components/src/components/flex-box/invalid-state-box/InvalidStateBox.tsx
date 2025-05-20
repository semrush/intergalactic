import React from 'react';
import { createComponent, sstyled, Root } from '@semcore/core';
import style from './invalidStateBox.shadow.css';
import Box from '../Box';

const InvalidStatePatternComponent = () => {
  const SPattern = Root;

  return sstyled(style)(<SPattern render={Box} />);
};

export const InvalidStateBox = createComponent(InvalidStatePatternComponent);

export default InvalidStateBox;
