import type { Meta, StoryObj } from '@storybook/react';

import Badge from '@semcore/badge';

import BadgeMainTypesExample from './examples/badge_main_types';

const meta: Meta<typeof Badge> = {
  title: 'Components/Badge/Documentation',
  component: Badge,
};

export default meta;
type Story = StoryObj<typeof Badge>;

export const BadgeMainTypes: Story = {
  render: BadgeMainTypesExample,
};
