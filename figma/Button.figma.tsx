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

      // Cannot be used with the current structure.
      // label: figma.textContent('↳ text'),
      // labelAddon: figma.textContent('↳ textAddon'),

      // addonLeft: figma.boolean('← addon', {
      //   true: figma.instance('{ ↳ Addon L }'),
      //   false: undefined,
      // }),

      // addonRight: figma.boolean('addon →', {
      //   true: figma.instance('{ ↳ Addon R }'),
      //   false: undefined,
      // }),

      // addonLeft: figma.boolean('← addon', {
      //   true: <Button.Addon>{/* addon */}</Button.Addon>,
      // }),

      // addonRight: figma.boolean('addon →', {
      //   true: <Button.Addon>{/* addon */}</Button.Addon>,
      // }),

      addonLeft: figma.enum('type', {
        default: figma.boolean('← addon', {
          true: <Button.Addon>{/* addon */}</Button.Addon>,
        }),
      }),
      addonRight: figma.enum('type', {
        default: figma.boolean('addon →', {
          true: <Button.Addon>{/* addon */}</Button.Addon>,
        }),
      }),

      content: figma.enum('type', {
        default: figma.boolean('← addon', {
          true: <Button.Text>{/* button label */}</Button.Text>,
          false: figma.boolean('addon →', {
            true: <Button.Text>{/* button label */}</Button.Text>,
            false: '{/* button label */}',
          }),
        }),
      }),

      // For now, textAddon shows placeholder. Need to figure out how to show value from labelAddon here, and how to expand the component.
      textAddon: figma.boolean('textAddon →', {
        true: <Button.Addon><Text color='/* text-color-token */'>{/* text addon */}</Text></Button.Addon>,
      }),
    },

    example: ({ size, use, theme, disabled, active, loading, addonLeft, content, textAddon, addonRight }) => (
      <Button
        size={size}
        use={use}
        theme={theme}
        disabled={disabled}
        active={active}
        loading={loading}
      >
        {addonLeft}
        {content}
        {textAddon}
        {addonRight}
      </Button>
    ),
  },
);
