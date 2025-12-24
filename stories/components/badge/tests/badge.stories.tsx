import Badge from '@semcore/ui/badge';
import type { Meta, StoryObj } from '@storybook/react-vite';

import BadgeBgExample, { defaultExampleBadgeProps } from './examples/badge-bg-colors';

const meta: Meta<typeof Badge> = {
  title: 'Components/Badge/Tests',
  component: Badge,
};

export default meta;
type Story = StoryObj<typeof Badge>;

export const BadgeBg: StoryObj<typeof defaultExampleBadgeProps> = {
  render: BadgeBgExample,
  argTypes: {
    bg: {
      control: { type: 'select' },
      options: ['mist', 'cyan', 'red', 'orange', 'green', 'white', 'violet-400'],
    },
    color: {
      control: { type: 'select' },
      options: ['white', 'gray20', 'green', 'text-primary', 'text-primary-invert'],
    },
    pt: {
      control: { type: 'number' },
    },
    w: {
      control: { type: 'number' },
    },
    h: {
      control: { type: 'number' },
    },
    m: {
      control: { type: 'number' },
    },
  },
  args: defaultExampleBadgeProps,
};
