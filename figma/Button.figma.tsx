import figma from '@figma/code-connect';
import Button from '@semcore/button';
import React from 'react';

const sharedProps = {
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
    '🟢 success': 'success',
    '🔴 danger': 'danger',
    '⚫️ muted': 'muted',
    '⚪️ invert': 'invert',
  }),
  disabled: figma.enum('state', {
    disabled: true,
  }),
  active: figma.enum('state', {
    active: true,
  }),
  loading: figma.boolean('loading'),
  addonLeft: figma.boolean('← addon', {
    true: figma.instance('{ ↳ AddonLeft }'),
    false: undefined,
  }),

};

figma.connect(
  Button,
  'https://www.figma.com/design/RLic9ruqNNm6qgARKFk5Ae/-Refactoring--%E2%9D%96-Core-Components?node-id=10043-43724&t=fvHZdzdrBaexbYww-11',
  {
    props: {
      ...sharedProps,
      label: figma.textContent('↳ text'),
      textAddon: figma.boolean('textAddon →', {
        true: figma.textContent('↳ textAddon'),
        false: undefined,
      }),
      addonRight: figma.boolean('addon →', {
        true: figma.instance('{ ↳ AddonRight }'),
        false: undefined,
      }),
    },
    example: ({ size, use, theme, disabled, active, loading, addonLeft, label, textAddon, addonRight }) => (
      <Button
        size={size}
        use={use}
        theme={theme}
        disabled={disabled}
        active={active}
        loading={loading}
      >
        <Button.Addon>{addonLeft}</Button.Addon>
        {label}
        <Button.Addon>{textAddon}</Button.Addon>
        <Button.Addon>{addonRight}</Button.Addon>
      </Button>
    ),
  },
);
