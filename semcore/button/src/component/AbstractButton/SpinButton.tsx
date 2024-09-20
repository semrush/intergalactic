import React from 'react';
import Spin from '@semcore/spin';

export const SPIN_SIZE_MAP: Record<string, string> = {
  xl: 'm',
  l: 's',
  m: 'xs',
  s: 'xxs',
};

export default function SpinButton({ theme, size, ...others }: any) {
  return (
    <Spin
      size={typeof size === 'string' ? SPIN_SIZE_MAP[size] : size}
      theme='currentColor'
      {...others}
    />
  );
}
