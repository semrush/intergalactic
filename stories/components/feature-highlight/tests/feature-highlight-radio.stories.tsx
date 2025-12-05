import type { Meta, StoryObj } from '@storybook/react-vite';

import RadioPropsExample, { defaultProps } from './examples/radio';

const meta: Meta = {
  title: 'Components/Feature Highlight/Tests/Radio',
};

export const RadioProps: StoryObj<typeof defaultProps> = {
  render: RadioPropsExample,
  argTypes: {
    firstOptionText: { control: 'text' },
    secondOptionText: { control: 'text' },
    showBadge: { control: 'boolean' },
    badgeText: { control: 'text' },
    animatedSparkleCount: { control: 'number' },
    showIcon: { control: 'boolean' },
    size: {
      control: { type: 'select' },
      options: ['m', 'l'],
    },
    disabled: { control: 'boolean' },
    state: {
      control: { type: 'select' },
      options: ['normal', 'invalid', 'valid'],
    },
    defaultValue: {
      control: { type: 'select' },
      options: [1, 2],
    },
    legendText: { control: 'text' },
    legendSize: {
      control: { type: 'select' },
      options: [200, 300],
    },
  },
  args: defaultProps,
};

export default meta;
