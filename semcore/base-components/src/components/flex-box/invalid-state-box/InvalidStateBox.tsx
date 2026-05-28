import { createComponent, sstyled, Root } from '@semcore/core';
import React from 'react';

import style from './invalidStateBox.shadow.css';
import Box from '../Box';

type InvalidStatePatternComponent = typeof Box;

function InvalidStatePatternRoot() {
  const SPattern = Root;

  return sstyled(style)(<SPattern render={Box} />);
};

export const InvalidStateBox = createComponent<
  InvalidStatePatternComponent,
  typeof InvalidStatePatternRoot
>(InvalidStatePatternRoot);

export default InvalidStateBox;
