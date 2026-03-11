import type { Meta, StoryObj } from '@storybook/react-vite';

import ButtonPropsExample, { defaultProps } from './examples/button';

const meta: Meta = {
  title: 'Components/Feature Highlight/Tests/Button',
};

export const ButtonProps: StoryObj<typeof defaultProps> = {
  render: ButtonPropsExample,
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
    useBadge: {
      control: { type: 'select' },
      options: ['accent', 'neutral', undefined],
    },
    size: {
      control: { type: 'select' },
      options: ['m', 'l'],
    },
    disabled: { control: 'boolean' },
    loading: { control: 'boolean' },
    active: { control: 'boolean' },
    w: {
      control: { type: 'number' },
    },
    ellipsis: {
      control: 'select',
      options: ['false', 'true', 'cropPosition:middle', 'cropPosition:end', 'cropPosition:middle lastRequiredSymbols:3', 'cropPosition:middle lastRequiredSymbols:0'],
      mapping: {
        'false': false,
        'true': true,
        'cropPosition:middle': { cropPosition: 'middle' },
        'cropPosition:end': { cropPosition: 'end' },
        'cropPosition:middle lastRequiredSymbols:3': { cropPosition: 'middle', lastRequiredSymbols: 3 },
        'cropPosition:middle lastRequiredSymbols:0': { cropPosition: 'middle', lastRequiredSymbols: 0 },
      },
    },
  },
  args: defaultProps,
};

export default meta;
