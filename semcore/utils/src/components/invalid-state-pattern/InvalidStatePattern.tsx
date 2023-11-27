import React from 'react';
import { Box, BoxProps } from '@semcore/flex-box';
import createComponent, { sstyled, Root } from '@semcore/core';
import style from './invalidStatePattern.shadow.css';

type InvalidStatePatternProps = Pick<BoxProps, 'w' | 'm' | 'mt' | 'ml' | 'mr' | 'mb'>;

const InvalidStatePatternComponent = (props: InvalidStatePatternProps) => {
  const SPattern = Root;

  return sstyled(style)(<SPattern render={Box} />);
};

export const InvalidStatePattern = createComponent(InvalidStatePatternComponent);

export default InvalidStatePattern;
