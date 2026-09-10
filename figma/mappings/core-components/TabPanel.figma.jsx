import figma from '@figma/code-connect/react';
import TabPanel from '@semcore/ui/tab-panel';

figma.connect(
  TabPanel.Item,
  'https://www.figma.com/design/RLic9ruqNNm6qgARKFk5Ae/-Refactoring-WIP--%E2%9D%96-Core-Components?node-id=10261-95182&t=I48qqNRyVr8Tdi87-11',
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
      <TabPanel.Item value={/* value */} selected={selected} disabled={disabled} addonLeft={addonLeft} addonRight={addonRight}>
        <TabPanel.Item.Text>{label}</TabPanel.Item.Text>
        {dot}
      </TabPanel.Item>
    ),
  },
);

figma.connect(
  TabPanel.Item,
  'https://www.figma.com/design/RLic9ruqNNm6qgARKFk5Ae/-Refactoring-WIP--%E2%9D%96-Core-Components?node-id=10261-95182&t=I48qqNRyVr8Tdi87-11',
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
      <TabPanel.Item value={/* value */} selected={selected} disabled={disabled} addonLeft={addonLeft} addonRight={addonRight}>
        <TabPanel.Item.Text>{label}</TabPanel.Item.Text>
        <TabPanel.Item.Addon>{textAddon}</TabPanel.Item.Addon>
        {dot}
      </TabPanel.Item>
    ),
  },
);

figma.connect(
  TabPanel,
  'https://www.figma.com/design/RLic9ruqNNm6qgARKFk5Ae/-Refactoring-WIP--%E2%9D%96-Core-Components?node-id=53542-883&t=I48qqNRyVr8Tdi87-11',
  {
    props: {
      children: figma.children('TabPanel.Item'),
    },
    example: ({ children }) => (
      <TabPanel aria-label='/* Add aria-label */'>
        {children}
      </TabPanel>
    ),
  },
);
