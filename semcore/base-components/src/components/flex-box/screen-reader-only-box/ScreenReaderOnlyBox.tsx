import { createComponent, sstyled, Root } from '@semcore/core';
import React from 'react';

import style from './screenReaderOnlyBox.shadow.css';
import { Box } from '../Box';

const ScreenReaderOnlyComponent = () => {
  const SScreenReaderOnly = Root<'span'>();

  return sstyled(style)(<SScreenReaderOnly render={Box} tag='span' />);
};

export const ScreenReaderOnly = createComponent(ScreenReaderOnlyComponent, {});

export default ScreenReaderOnly;
