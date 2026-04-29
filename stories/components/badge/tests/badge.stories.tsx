import Badge from '@semcore/ui/badge';
import type { Meta, StoryObj } from '@storybook/react-vite';

import BadgeBgExample, { defaultExampleBadgeProps } from './examples/badge-bg-colors';
import BadgeI18nExample from './examples/badge_i18n_example';
const meta: Meta<typeof Badge> = {
  title: 'Components/Badge/Tests',
  component: Badge,
};
export default meta;
type Story = StoryObj<typeof Badge>;
export const BadgeBg: StoryObj<typeof defaultExampleBadgeProps> = {
  render: BadgeBgExample,
  argTypes: {
    type: { control: 'select', options: ['admin', 'alpha', 'beta', 'new', 'soon'] },
    inverted: { control: 'boolean' },
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
export const BadgeI18nInteractive: Story = {
  render: BadgeI18nExample,

};
