import type { Meta, StoryObj } from '@storybook/react-vite';

import SwitchPropsExample, { defaultProps } from './examples/switch-fh';

const meta: Meta = {
  title: 'Components/Feature Highlight/Tests/Switch',
};

export const SwitchProps: StoryObj<typeof defaultProps> = {
  render: SwitchPropsExample,
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
