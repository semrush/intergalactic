import type { Meta, StoryObj } from '@storybook/react-vite';

import ButtonAdvancedExample, { defaultProps } from './examples/button';

const meta: Meta = {
  title: 'Components/Feature Highlight/Tests/Button',
};

export const ButtonAdvanced: StoryObj<typeof defaultProps> = {
  render: ButtonAdvancedExample,
  argTypes: {
    buttonText: { control: 'text' },
    showBadge: { control: 'boolean' },
    badgeText: { control: 'text' },
    animatedSparkleCount: { control: 'number' },
    showIcon: { control: 'boolean' },
    use: {
      control: { type: 'select' },
      options: ['primary', 'secondary', 'tertiary'],
    },
    size: {
      control: { type: 'select' },
      options: ['m', 'l'],
    },
    disabled: { control: 'boolean' },
    loading: { control: 'boolean' },
    active: { control: 'boolean' },
  },
  args: defaultProps,
};

export default meta;
