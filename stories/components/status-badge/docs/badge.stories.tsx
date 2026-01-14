import StatusBadge from '@semcore/ui/status-badge';
import type { Meta, StoryObj } from '@storybook/react-vite';

import BadgeMainTypesExample from './examples/badge_main_types';

const meta: Meta<typeof Badge> = {
  title: 'Components/StatusBadge/Documentation',
  component: StatusBadge,
};

export default meta;
type Story = StoryObj<typeof StatusBadge>;

export const BadgeMainTypes: Story = {
  render: BadgeMainTypesExample,
};
