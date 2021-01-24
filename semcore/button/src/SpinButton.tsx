import React, { HTMLAttributes } from 'react';
import { Merge } from '@semcore/core';
import Spin, { ISpinProps } from '@semcore/spin';

export const SPIN_SIZE_MAP = {
  xl: 'm',
  l: 's',
  m: 'xs',
  s: 'xxs',
};

export enum SPIN_THEME_MAP {
  'primary-info' = 'invert',
  'primary-success' = 'invert',
  'primary-warning' = 'invert',
  'primary-danger' = 'invert',
  'secondary-invert' = 'invert',
  'secondary-muted' = 'gray40',
  'secondary-info' = 'light-blue',
  'tertiary-invert' = 'invert',
  'tertiary-info' = 'light-blue',
}

export interface ISpinButtonProps {
  size?: 'xl' | 'l' | 'm' | 's' | false;
  theme?: string | false;
  centered?: boolean;
}

export default function SpinButton(
  props: Merge<ISpinButtonProps, HTMLAttributes<HTMLSpanElement>>,
) {
  const { theme, size, ...others } = props;
  return (
    <Spin
      size={(typeof size == 'string' ? SPIN_SIZE_MAP[size] : size) as ISpinProps['size']}
      theme={typeof theme === 'string' ? SPIN_THEME_MAP[theme] || 'dark' : theme}
      {...others}
    />
  );
}
