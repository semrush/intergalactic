import type { Meta, StoryObj } from '@storybook/react-vite';

import InputFeatureHighlightExample, { defaultProps } from './examples/input';

const meta: Meta = {
  title: 'Components/Feature Highlight/Tests/Input',
};

export const InputFeatureHighlight: StoryObj<typeof defaultProps> = {
  render: InputFeatureHighlightExample,
  argTypes: {
    placeholder: { control: 'text' },
    showBadge: { control: 'boolean' },
    badgeText: { control: 'text' },
    size: {
      control: { type: 'select' },
      options: ['m', 'l'],
    },
    width: { control: 'number' },
    disabled: { control: 'boolean' },
    state: {
      control: { type: 'select' },
      options: ['normal', 'invalid', 'valid'],
    },
    ariaLabel: { control: 'text' },
  },
  args: defaultProps,
};

export default meta;
