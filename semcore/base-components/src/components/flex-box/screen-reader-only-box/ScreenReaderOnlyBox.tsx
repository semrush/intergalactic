import { createComponent, sstyled, Root, type Intergalactic } from '@semcore/core';
import React from 'react';

import style from './screenReaderOnlyBox.shadow.css';
import Box from '../Box';

function ScreenReaderOnlyComponent() {
  const SScreenReaderOnly = Root;

  return sstyled(style)(<SScreenReaderOnly render={Box} tag='span' />);
};

type ScreenReaderOnlyType = Intergalactic.Component<'span'>;

export const ScreenReaderOnly = createComponent<
  ScreenReaderOnlyType,
  typeof ScreenReaderOnlyComponent
>(ScreenReaderOnlyComponent);

export default ScreenReaderOnly;
