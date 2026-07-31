import Link from '@semcore/ui/link';
import type { Meta, StoryObj } from '@storybook/react-vite';

import BasicUsageExample, { defaultProps as BasicUsageProps } from './examples/basic_usage';
import LinkDifferentSizesExample, { defaultLinksizesProps } from './examples/link-different-sizes';
import LinkHintExample from './examples/link-hint';

const meta: Meta<typeof Link> = {
  title: 'Components/Link/Tests',
  component: Link,
};

export default meta;
type Story = StoryObj<typeof Link>;

export const BasicUsage: StoryObj<typeof BasicUsageProps> = {
  render: BasicUsageExample,
  argTypes: {
    text: {
      control: { type: 'text' },
    },
    href: {
      control: { type: 'text' },
    },
    size: {
      control: { type: 'select' },
      options: [100, 200, 300, 350, 400, 500, 600, 700, 800],
    },
    disabled: {
      control: { type: 'boolean' },
    },
    active: {
      control: { type: 'boolean' },
    },
    enableVisited: {
      control: { type: 'boolean' },
    },
    noWrap: {
      control: { type: 'boolean' },
    },
    color: {
      control: { type: 'text' },
    },
    showAddonLeft: {
      control: { type: 'boolean' },
    },
    showAddonRight: {
      control: { type: 'boolean' },
    },
    containerW: {
      control: { type: 'number' },
      description: 'Constrain the outer container width and let Link.Text truncate without fixed width',
    },
    w: {
      control: { type: 'number' },
    },
    title: {
      control: { type: 'text' },
    },
    ellipsis: {
      control: { type: 'select' },
      options: [
        'false',
        'true',
        'cropPosition:middle',
        'cropPosition:end',
        'cropPosition:end maxLine:2',
        'cropPosition:end maxLine:6',
        'cropPosition:middle lastRequiredSymbols:3',
        'cropPosition:middle lastRequiredSymbols:0',
      ],
      mapping: {
        'false': { ellipsis: false },
        'true': { ellipsis: true },
        'cropPosition:middle': { 'ellipsis:cropPosition': 'middle' },
        'cropPosition:end': { 'ellipsis:cropPosition': 'end' },
        'cropPosition:end maxLine:2': { 'ellipsis:cropPosition': 'end', 'ellipsis:maxLine': 2 },
        'cropPosition:end maxLine:6': { 'ellipsis:cropPosition': 'end', 'ellipsis:maxLine': 6 },
        'cropPosition:middle lastRequiredSymbols:3': {
          'ellipsis:cropPosition': 'middle',
          'ellipsis:lastRequiredSymbols': 3,
        },
        'cropPosition:middle lastRequiredSymbols:0': {
          'ellipsis:cropPosition': 'middle',
          'ellipsis:lastRequiredSymbols': 0,
        },
      },
    },
    hintPlacement: {
      control: { type: 'select' },
      options: ['top', 'bottom', 'left', 'right'],
    },
    addonLeftType: {
      control: { type: 'select' },
      options: ['icon', 'badge', 'counter', 'spin'],
    },
    addonRightType: {
      control: { type: 'select' },
      options: ['icon', 'badge', 'counter', 'spin'],
    },
    merged: {
      control: { type: 'boolean' },
    },
    addonPassMethod: {
      control: { type: 'inline-radio' },
      options: ['slot', 'prop'],
      description: 'Pass icon addons as Link.Addon children or addonLeft/addonRight props',
    },
  },
  args: BasicUsageProps,
};

export const LinkHint: Story = {
  render: LinkHintExample,
};

export const LinkDifferentSizes: StoryObj<typeof defaultLinksizesProps> = {
  render: LinkDifferentSizesExample,
  args: defaultLinksizesProps,
  argTypes: {
    addonLeft: {
      control: { type: 'select' },
      options: ['icon', 'badge', 'counter', 'spin'],
    },
    addonRight: {
      control: { type: 'select' },
      options: ['icon', 'badge', 'counter', 'spin'],
    },
  },
};
