import React from 'react';
import Spin from '@semcore/spin';

export const SPIN_SIZE_MAP = {
  xl: 'm',
  l: 's',
  m: 'xs',
  s: 'xxs',
};

export default function SpinButton({ theme, size, ...others }) {
  return (
    <Spin
      size={typeof size === 'string' ? SPIN_SIZE_MAP[size] : size}
      theme='currentColor'
      {...others}
    />
  );
}
