import figma from '@figma/code-connect/react';
import TabLine from '@semcore/ui/tab-line';

figma.connect(
  TabLine.Item,
  'https://www.figma.com/design/RLic9ruqNNm6qgARKFk5Ae/-Refactoring-WIP--%E2%9D%96-Core-Components?node-id=10212-118088&t=I48qqNRyVr8Tdi87-11',
  {
    variant: { 'textAddon →': 'false' },
    props: {
      label: figma.textContent('↳ text'),
      selected: figma.enum('state', {
        selected: true,
      }),
      disabled: figma.enum('state', {
        disabled: true,
      }),
      addonLeft: figma.boolean('← addon', {
        true: figma.children('← - - addon properties'),
        false: undefined,
      }),
      addonRight: figma.boolean('addon →', {
        true: figma.children('addon properties - - →'),
        false: undefined,
      }),
      dot: figma.children('Dot'),
    },
    example: ({ selected, disabled, addonLeft, addonRight, label, dot }) => (
      <TabLine.Item value={/* value */} selected={selected} disabled={disabled} addonLeft={addonLeft} addonRight={addonRight}>
        <TabLine.Item.Text>{label}</TabLine.Item.Text>
        {dot}
      </TabLine.Item>
    ),
  },
);

figma.connect(
  TabLine.Item,
  'https://www.figma.com/design/RLic9ruqNNm6qgARKFk5Ae/-Refactoring-WIP--%E2%9D%96-Core-Components?node-id=10212-118088&t=I48qqNRyVr8Tdi87-11',
  {
    variant: { 'textAddon →': 'true' },
    props: {
      label: figma.textContent('↳ text'),
      selected: figma.enum('state', {
        selected: true,
      }),
      disabled: figma.enum('state', {
        disabled: true,
      }),
      addonLeft: figma.boolean('← addon', {
        true: figma.children('← - - addon properties'),
        false: undefined,
      }),
      addonRight: figma.boolean('addon →', {
        true: figma.children('addon properties - - →'),
        false: undefined,
      }),
      textAddon: figma.boolean('textAddon →', {
        true: figma.textContent('↳ textAddon'),
        false: undefined,
      }),
      dot: figma.children('Dot'),
    },
    example: ({ selected, disabled, addonLeft, addonRight, label, textAddon, dot }) => (
      <TabLine.Item value={/* value */} selected={selected} disabled={disabled} addonLeft={addonLeft} addonRight={addonRight}>
        <TabLine.Item.Text>{label}</TabLine.Item.Text>
        <TabLine.Item.Addon>{textAddon}</TabLine.Item.Addon>
        {dot}
      </TabLine.Item>
    ),
  },
);

figma.connect(
  TabLine,
  'https://www.figma.com/design/RLic9ruqNNm6qgARKFk5Ae/-Refactoring-WIP--%E2%9D%96-Core-Components?node-id=10212-95422&t=I48qqNRyVr8Tdi87-11',
  {
    props: {
      size: figma.enum('size', {
        M: 'm',
        L: 'l',
      }),
      underlined: figma.boolean('underlined', {
        true: true,
        false: false,
      }),
      children: figma.children('TabLine.Item'),
    },
    example: ({ size, underlined, children }) => (
      <TabLine size={size} underlined={underlined}>
        {children}
      </TabLine>
    ),
  },
);
