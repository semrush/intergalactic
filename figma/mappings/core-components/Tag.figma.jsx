import figma from '@figma/code-connect';
import Tag from '@semcore/ui/tag';

figma.connect(
  Tag,
  'https://www.figma.com/design/RLic9ruqNNm6qgARKFk5Ae/-Refactoring--%E2%9D%96-Core-Components?node-id=44497-213147&t=0hjqYEp7RXqjnbR7-11',
  {
    variant: { 'close button': 'false' },
    props: {
      label: figma.textContent('↳ text'),
      size: figma.enum('size', {
        XL: 'xl',
        L: 'l',
        M: 'm',
      }),
      theme: figma.enum('theme', {
        primary: 'primary',
        secondary: 'secondary',
      }),
      color: figma.enum('color', {
        'gray-500': 'gray-500',
        'blue-500': 'blue-500',
        'green-500': 'green-500',
        'orange-500': 'orange-500',
        'yellow-500': 'yellow-500',
        'red-500': 'red-500',
        'violet-500': 'violet-500',
        'invert': 'invert',
      }),
      active: figma.enum('state', {
        active: true,
      }),
      disabled: figma.enum('state', { disabled: true }),

      // These mappings show instances, but they are not working with conditional rendering for now. So I'm leaving them for possible future updates from Code Connect.
      // addonLeft: figma.boolean('← addon', {
      //   true: figma.instance('← - - addon properties'),
      //   false: undefined,
      // }),
      // circle: figma.boolean('← circle addon', {
      //   true: figma.instance('{ TagCircle }'),
      //   false: undefined,
      // }),
      // textAddon: figma.boolean('↳ textAddon', {
      //   true: figma.textContent('{ ↳ textAddon }'),
      //   false: undefined,
      // }),

      addonLeft: figma.boolean('← addon', {
        true: <Tag.Addon>{/* addon */}</Tag.Addon>,
        false: undefined,
      }),
      circle: figma.boolean('← circle addon', {
        true: <Tag.Circle><img src='https://...' /></Tag.Circle>,
        false: undefined,
      }),
      textAddon: figma.boolean('textAddon ->', {
        true: <Tag.Addon>{/* text addon */}</Tag.Addon>,
        false: undefined,
      }),
    },

    example: ({ label, size, theme, color, active, disabled, addonLeft, textAddon, circle }) => (
      <Tag
        size={size}
        theme={theme}
        color={color}
        active={active}
        disabled={disabled}
      >
        {circle}
        {addonLeft}
        <Tag.Text>{label}</Tag.Text>
        {textAddon}
      </Tag>
    ),
  },
);
