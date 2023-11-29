import React from 'react';
import createComponent, { sstyled, Root } from '@semcore/core';
import style from './invalidStatePattern.shadow.css';

const InvalidStatePatternComponent = () => {
  const SPattern = Root;

  return sstyled(style)(<SPattern render={'div'} />);
};

export const InvalidStatePattern = createComponent(InvalidStatePatternComponent);

export default InvalidStatePattern;
