import figma from '@figma/code-connect/react';
import Button from '@semcore/button';
import React from 'react';

figma.connect(Button, 'https://www.figma.com/design/RLic9ruqNNm6qgARKFk5Ae/-Refactoring-WIP--%E2%9D%96-Core-Components?node-id=10043-43724&t=nVbIFrY5EvgteOqk-11', {
  variant: { iconOnly: 'true' },
  props: {
    size: figma.enum('size', {
      L: 'l',
      M: 'm',
    }),
    use: figma.enum('use', {
      primary: 'primary',
      secondary: 'secondary',
      tertiary: 'tertiary',
    }),
    theme: figma.enum('theme', {
      '🔵 info': 'info',
      '�� success': 'success',
      '🔴 danger': 'danger',
      '⚫️ muted': 'muted',
      '⚪️ invert': 'invert',
    }),
    active: figma.enum('state', {
      active: true,
    }),
    loading: figma.boolean('loading'),
    disabled: figma.enum('state', {
      disabled: true,
    }),
    addonLeft: figma.boolean('← addon', {
      true: figma.instance('{ ↳ Addon L }'),
      false: undefined,
    }),
  },
  example: ({ size, use, theme, disabled, active, loading, addonLeft }) => (
    <Button
      size={size}
      use={use}
      theme={theme}
      disabled={disabled}
      active={active}
      loading={loading}
      tag={addonLeft}
      aria-label='/* Set your aria-label */'
    />
  ),
});
