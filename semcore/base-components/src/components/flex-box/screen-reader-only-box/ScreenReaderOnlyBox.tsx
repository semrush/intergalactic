import React from 'react';
import { createComponent, sstyled, Root, Intergalactic } from '@semcore/core';
import style from './screenReaderOnlyBox.shadow.css';
import Box from '../Box';

const ScreenReaderOnlyComponent = () => {
  const SScreenReaderOnly = Root;

  return sstyled(style)(<SScreenReaderOnly render={Box} tag={'span'} />);
};

type ScreenReaderOnlyType = Intergalactic.Component<'span'>;

export const ScreenReaderOnly: ScreenReaderOnlyType = createComponent(ScreenReaderOnlyComponent);

export default ScreenReaderOnly;
