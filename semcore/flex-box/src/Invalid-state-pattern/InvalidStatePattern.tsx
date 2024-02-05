import React from 'react';
import createComponent, { sstyled, Root } from '@semcore/core';
import style from './invalidStatePattern.shadow.css';
import Box from '../Box';

const InvalidStatePatternComponent = () => {
  const SPattern = Root;

  return sstyled(style)(<SPattern render={Box} />);
};

export const InvalidStatePattern = createComponent(InvalidStatePatternComponent);

export default InvalidStatePattern;
