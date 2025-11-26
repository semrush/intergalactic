import type { Meta, StoryObj } from '@storybook/react-vite';

import CheckboxAdvancedExample, { defaultProps } from './examples/checkbox';

const meta: Meta = {
  title: 'Components/Feature Highlight/Tests/Checkbox',
};

export const CheckboxAdvanced: StoryObj<typeof defaultProps> = {
  render: CheckboxAdvancedExample,
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
    checked: { control: 'boolean' },
    disabled: { control: 'boolean' },
    state: {
      control: { type: 'select' },
      options: ['normal', 'invalid', 'valid'],
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
