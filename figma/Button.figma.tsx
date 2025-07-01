import figma from '@figma/code-connect/react';
import Button from '@semcore/button';
import Text from '@semcore/text';
import React from 'react';

figma.connect(
  Button,
  'https://www.figma.com/design/RLic9ruqNNm6qgARKFk5Ae/-Refactoring--%E2%9D%96-Core-Components?node-id=10043-43724&t=fvHZdzdrBaexbYww-11',
  {
    variant: { type: 'default' },
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
        '🟢 success': 'success',
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
      label: figma.textContent('↳ text'),
      labelAddon: figma.textContent('↳ textAddon'),

      addonLeft: figma.boolean('← addon', {
        true: figma.instance('{ ↳ AddonLeft }'),
        false: undefined,
      }),

      addonRight: figma.boolean('addon →', {
        true: figma.instance('{ ↳ AddonRight }'),
        false: undefined,
      }),

      // For now, textAddon shows placeholder. Need to figure out how to show value from labelAddon here, and how to expand the component.
      textAddon: figma.enum('type', {
        default: figma.boolean('textAddon →', {
          true: <Button.Addon><Text color='/* text-color-token */'>{/* text addon */}</Text></Button.Addon>,
          false: undefined,
        }),
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

        addonLeft={addonLeft}
        addonRight={addonRight}
      >
        {label}
        {textAddon}
      </Button>
    ),
  },
);
