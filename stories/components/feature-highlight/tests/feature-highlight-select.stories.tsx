import type { Meta, StoryObj } from '@storybook/react-vite';

import SelectPropsExample, { defaultProps } from './examples/select';

const meta: Meta = {
  title: 'Components/Feature Highlight/Tests/Select',
};

export const SelectProps: StoryObj<typeof defaultProps> = {
  render: SelectPropsExample,
  argTypes: {
    placeholder: { control: 'text' },
    showBadge: { control: 'boolean' },
    badgeText: { control: 'text' },
    size: {
      control: { type: 'select' },
      options: ['m', 'l'],
    },
    disabled: { control: 'boolean' },
    state: {
      control: { type: 'select' },
      options: ['normal', 'invalid', 'valid'],
    },
    option1: { control: 'text' },
    option2: { control: 'text' },
    option3: { control: 'text' },
    ariaLabel: { control: 'text' },
    width: { control: 'number' },
  },
  args: defaultProps,
};

export default meta;
