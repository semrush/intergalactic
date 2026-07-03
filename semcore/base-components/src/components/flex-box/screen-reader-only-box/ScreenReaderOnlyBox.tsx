import { createComponent, sstyled, Root } from '@semcore/core';
import React from 'react';

import style from './screenReaderOnlyBox.shadow.css';
import type { NSScreenReaderOnly } from './ScreenReaderOnlyBox.type';
import Box from '../Box/Box';

function ScreenReaderOnlyComponent() {
  const SScreenReaderOnly = Root;

  return sstyled(style)(<SScreenReaderOnly render={Box} tag='span' />);
};

export const ScreenReaderOnly = createComponent<
  NSScreenReaderOnly.Component,
  typeof ScreenReaderOnlyComponent
>(ScreenReaderOnlyComponent);

export default ScreenReaderOnly;
