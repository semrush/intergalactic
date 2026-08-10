import Link from '@semcore/ui/link';
import type { Meta, StoryObj } from '@storybook/react-vite';

import BasicUsageExample, { defaultProps as BasicUsageProps } from './examples/basic_usage';
import LinkDifferentSizesExample, { defaultLinksizesProps } from './examples/link-different-sizes';
import LinkHintExample, { defaultLinkHintProps } from './examples/link-hint';

const sharedArgTypes = {
  use: {
    control: { type: 'select' },
    options: ['primary', 'secondary', 'accent'],
  },
  href: {
    control: { type: 'select' },
    options: [
      '#',
      '/relative',
      'https://developer.semrush.com/intergalactic/components/link/link-api',
      'mailto:test@example.com',
    ],
    description: 'The https:// preset makes the link external: target=_blank, the icon and the new-tab announcement',
  },
  active: { control: { type: 'boolean' } },
} as const;

const singleLinkArgTypes = {
  ...sharedArgTypes,
  text: { control: { type: 'text' } },
  title: { control: { type: 'text' } },
  disabled: { control: { type: 'boolean' } },
  size: {
    control: { type: 'select' },
    options: [100, 200, 300, 350, 400, 500, 600, 700, 800],
  },
  hintPlacement: {
    control: { type: 'select' },
    options: ['top', 'bottom', 'left', 'right'],
  },
} as const;

const addonTypeArgType = {
  control: { type: 'select' },
  options: ['icon', 'badge', 'counter', 'spin'],
} as const;

const ellipsisArgType = {
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
    'cropPosition:middle lastRequiredSymbols:3': { 'ellipsis:cropPosition': 'middle', 'ellipsis:lastRequiredSymbols': 3 },
    'cropPosition:middle lastRequiredSymbols:0': { 'ellipsis:cropPosition': 'middle', 'ellipsis:lastRequiredSymbols': 0 },
  },
} as const;

const meta: Meta<typeof Link> = {
  title: 'Components/Link/Tests',
  component: Link,
};

export default meta;

export const BasicUsage: StoryObj<typeof BasicUsageProps> = {
  render: BasicUsageExample,
  argTypes: {
    ...singleLinkArgTypes,
    isExternal: {
      control: { type: 'boolean' },
      description: 'Marks the link external explicitly, bypassing host-based auto-detection',
    },
    childrenMode: {
      control: { type: 'inline-radio' },
      options: ['slot', 'string'],
      description: 'Wrap text in Link.Text, or pass it as a bare string child',
    },
    enableVisited: { control: { type: 'boolean' } },
    noWrap: { control: { type: 'boolean' } },
    color: { control: { type: 'text' } },
    showAddonLeft: { control: { type: 'boolean' } },
    showAddonRight: { control: { type: 'boolean' } },
    w: { control: { type: 'number' } },
    containerW: {
      control: { type: 'number' },
      description: 'Constrain the outer container width and let Link.Text truncate without fixed width',
    },
    addonLeftType: addonTypeArgType,
    addonRightType: addonTypeArgType,
    addonPassMethod: {
      control: { type: 'inline-radio' },
      options: ['children', 'tag'],
      description: 'Compose the icon addon as <Link.Addon><Icon /></Link.Addon> or <Link.Addon tag={Icon} />',
    },
    ellipsis: ellipsisArgType,
  },
  args: BasicUsageProps,
};

export const LinkHint: StoryObj<typeof defaultLinkHintProps> = {
  render: LinkHintExample,
  argTypes: {
    ...singleLinkArgTypes,
    title: {
      control: { type: 'text' },
      description: 'Hint content. Falls back to aria-label, then to aria-labelledby content',
    },
    use: {
      control: { type: 'select' },
      options: ['primary', 'secondary', 'accent', undefined],
      description: 'Setting this drops `color`, which would otherwise override the use colors',
    },
    color: {
      control: { type: 'select' },
      options: ['gray-300', 'text-primary', 'text-success', 'text-critical', undefined],
      description: 'Ignored while `use` is set',
    },
    ariaLabel: { control: { type: 'text' } },
    showText: {
      control: { type: 'boolean' },
      description: 'Adds a Link.Text child — with children present the hint only shows if title is set',
    },
    count: {
      control: { type: 'number', min: 1, max: 5 },
      description: 'Number of rows — several links let you check hints do not overlap',
    },
  },
  args: defaultLinkHintProps,
};

export const LinkDifferentSizes: StoryObj<typeof defaultLinksizesProps> = {
  render: LinkDifferentSizesExample,
  argTypes: {
    ...sharedArgTypes,
    addonLeft: {
      control: { type: 'select' },
      options: ['none', 'icon', 'badge', 'counter', 'spin'],
    },
    addonRight: {
      control: { type: 'select' },
      options: ['none', 'icon', 'badge', 'counter', 'spin'],
    },
    ellipsis: {
      control: { type: 'boolean' },
      description: 'Constrains Link.Text width and enables truncation',
    },
  },
  args: defaultLinksizesProps,
};
