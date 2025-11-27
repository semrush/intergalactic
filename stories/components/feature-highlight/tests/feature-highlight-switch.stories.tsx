import type { Meta, StoryObj } from '@storybook/react-vite';

import SwitchAdvancedExample, { defaultProps } from './examples/switch';

const meta: Meta = {
  title: 'Components/Feature Highlight/Tests/Switch',
};

export const SwitchAdvanced: StoryObj<typeof defaultProps> = {
  render: SwitchAdvancedExample,
  argTypes: {
    label: { control: 'text' },
    showBadge: { control: 'boolean' },
    badgeText: { control: 'text' },
    animatedSparkleCount: { control: 'number' },
    showIcon: { control: 'boolean' },
    checked: { control: 'boolean' },
    disabled: { control: 'boolean' },
    size: {
      control: { type: 'select' },
      options: ['m', 'l', 'xl'],
    },
  },
  args: defaultProps,
};

export default meta;
