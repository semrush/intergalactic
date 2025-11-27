import type { Meta, StoryObj } from '@storybook/react-vite';

import TabLineAdvancedExample, { defaultProps } from './examples/tabline';

const meta: Meta = {
  title: 'Components/Feature Highlight/Tests/TabLine',
};

export const TabLineAdvanced: StoryObj<typeof defaultProps> = {
  render: TabLineAdvancedExample,
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
  },
  args: defaultProps,
};

export default meta;
