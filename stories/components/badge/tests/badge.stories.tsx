import Badge from '@semcore/ui/badge';
import type { Meta, StoryObj } from '@storybook/react-vite';

import BadgeI18nExample from './examples/badge_i18n_example';

const meta: Meta<typeof Badge> = {
  title: 'Components/Badge/Tests',
  component: Badge,
};

export default meta;
type Story = StoryObj<typeof Badge>;

export const BadgeI18nInteractive: Story = {
  render: BadgeI18nExample,
};
