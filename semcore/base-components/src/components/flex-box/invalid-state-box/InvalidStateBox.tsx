import { createComponent, sstyled, Root } from '@semcore/core';
import React from 'react';

import style from './invalidStateBox.shadow.css';
import type { NSInvalidStateBox } from './InvalidStateBox.type';
import Box from '../Box/Box';

function InvalidStatePatternRoot() {
  const SPattern = Root;

  return sstyled(style)(<SPattern render={Box} />);
};

export const InvalidStateBox = createComponent<
  NSInvalidStateBox.Component,
  typeof InvalidStatePatternRoot
>(InvalidStatePatternRoot);

export default InvalidStateBox;
