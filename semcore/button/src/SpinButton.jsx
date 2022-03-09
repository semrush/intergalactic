import React from 'react';
import Spin from '@semcore/spin';

export const SPIN_SIZE_MAP = {
  xl: 'm',
  l: 's',
  m: 'xs',
  s: 'xxs',
};

export const SPIN_THEME_MAP = {
  'primary-info': 'invert',
  'primary-success': 'invert',
  'primary-warning': 'invert',
  'primary-danger': 'invert',
  'secondary-invert': 'invert',
  'secondary-muted': 'gray40',
  'secondary-info': 'light-blue',
  'tertiary-invert': 'invert',
  'tertiary-info': 'light-blue',
};

export default function SpinButton({ theme, size, ...others }) {
  return (
    <Spin
      size={typeof size == 'string' ? SPIN_SIZE_MAP[size] : size}
      theme={typeof theme === 'string' ? SPIN_THEME_MAP[theme] || 'dark' : theme}
      {...others}
    />
  );
}
