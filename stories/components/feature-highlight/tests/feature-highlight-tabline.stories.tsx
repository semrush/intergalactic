import type { Meta, StoryObj } from '@storybook/react-vite';

import TabLinePropsExample, { defaultProps } from './examples/tabline';

const meta: Meta = {
  title: 'Components/Feature Highlight/Tests/TabLine',
};

export const TabLineProps: StoryObj<typeof defaultProps> = {
  render: TabLinePropsExample,
  argTypes: {
    firstTabText: { control: 'text' },
    secondTabText: { control: 'text' },
    thirdTabText: { control: 'text' },
    showBadge: { control: 'boolean' },
    badgeText: { control: 'text' },
    animatedSparkleCount: { control: 'number' },
    size: {
      control: { type: 'select' },
      options: ['m', 'l'],
    },
    disabled: { control: 'boolean' },
    defaultValue: {
      control: { type: 'select' },
      options: [1, 2, 3],
    },
    ariaLabel: { control: 'text' },
    w: {
      control: { type: 'number' },
    },
    ellipsis: {
      control: 'select',
      options: ['false', 'true', 'cropPosition:middle', 'cropPosition:end', 'cropPosition:middle lastRequiredSymbols:3', 'cropPosition:middle lastRequiredSymbols:0'],
      mapping: {
        'false': { ellipsis: false },
        'true': { ellipsis: true },
        'cropPosition:middle': { 'ellipsis:cropPosition': 'middle' },
        'cropPosition:end': { 'ellipsis:cropPosition': 'end' },
        'cropPosition:middle lastRequiredSymbols:3': { 'ellipsis:cropPosition': 'middle', 'ellipsis:lastRequiredSymbols': 3 },
        'cropPosition:middle lastRequiredSymbols:0': { 'ellipsis:cropPosition': 'middle', 'ellipsis:lastRequiredSymbols': 0 },
      },
    },
  },
  args: defaultProps,
};

export default meta;
