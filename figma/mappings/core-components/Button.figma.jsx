import figma from '@figma/code-connect/react';
import Button from '@semcore/ui/button';
import { Text } from '@semcore/ui/typography';

// Need to add a variant for cases when dot is enabled

figma.connect(
  Button,
  'https://www.figma.com/design/RLic9ruqNNm6qgARKFk5Ae/-Refactoring-WIP--%E2%9D%96-Core-Components?node-id=10043-43724&t=nVbIFrY5EvgteOqk-11',
  {
    variant: { 'icon only': 'false' },
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
      loading: figma.enum('state', {
        loading: true,
      }),
      disabled: figma.enum('state', {
        disabled: true,
      }),

      // Cannot be used with the current structure.
      // These mappings show instances and text content, but they are not working with conditional rendering for now. So I'm leaving them for possible future updates from Code Connect.
      // label: figma.textContent('↳ text'),
      // labelAddon: figma.textContent('↳ textAddon'),

      // addonLeft: figma.boolean('← addon', {
      //   true: figma.instance('← - - - addon'),
      //   false: undefined,
      // }),

      // addonRight: figma.boolean('addon →', {
      //   true: figma.instance('addon properties - - →'),
      //   false: undefined,
      // }),

      // addonLeft: figma.boolean('← addon', {
      //   true: <Button.Addon>{/* addon */}</Button.Addon>,
      // }),

      // addonRight: figma.boolean('addon →', {
      //   true: <Button.Addon>{/* addon */}</Button.Addon>,
      // }),

      addonLeft: figma.enum('icon only', {
        false: figma.boolean('← addon', {
          true: <Button.Addon>{/* addon */}</Button.Addon>,
        }),
      }),
      addonRight: figma.enum('icon only', {
        false: figma.boolean('addon →', {
          true: <Button.Addon>{/* addon */}</Button.Addon>,
        }),
      }),

      content: figma.enum('icon only', {
        false: figma.boolean('← addon', {
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

figma.connect(Button, 'https://www.figma.com/design/RLic9ruqNNm6qgARKFk5Ae/-Refactoring-WIP--%E2%9D%96-Core-Components?node-id=10043-43724&t=nVbIFrY5EvgteOqk-11', {
  variant: { 'icon only': 'true' },
  props: {
    size: figma.enum('size', {
      L: 'l',
    }),
    use: figma.enum('use', {
      primary: 'primary',
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
    loading: figma.enum('state', {
      loading: true,
    }),
    disabled: figma.enum('state', {
      disabled: true,
    }),
    title: figma.textContent('↳ title'),
  },
  example: (props) => (
    <Button {...props} addonLeft={/* icon name */} />
  ),
});
