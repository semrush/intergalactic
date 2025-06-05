import Badge from '@semcore/badge';
import type { Meta, StoryObj } from '@storybook/react';

import BadgeBgExample from './examples/badge-bg-colors';
import BadgeBoxPropsExample from './examples/badge-box-props';
import BadgeColorsExample from './examples/badge-colors';

const meta: Meta<typeof Badge> = {
  title: 'Components/Badge/Tests',
  component: Badge,
};

export default meta;
type Story = StoryObj<typeof Badge>;

export const BadgeColors: Story = {
  render: BadgeColorsExample,
};

export const BadgeBg: Story = {
  render: BadgeBgExample,
};

export const BadgeBoxProps: Story = {
  render: BadgeBoxPropsExample,
};
