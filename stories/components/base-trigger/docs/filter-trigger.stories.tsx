import { FilterTrigger } from '@semcore/ui/base-trigger';
import type { Meta, StoryObj } from '@storybook/react-vite';

import AccessibleNameExample from './filter-trigger/examples/accessible_name';
import ProgrammaticFocusExample from './filter-trigger/examples/programmatic_focus';
import UsageWithSelectExample from './filter-trigger/examples/usage_with_select';

const meta: Meta<typeof FilterTrigger> = {
  title: 'Components/Base Trigger/Documentation/Filter Trigger',
  component: FilterTrigger,
};

export default meta;
type Story = StoryObj<typeof FilterTrigger>;

export const AccessibleName: Story = {
  render: AccessibleNameExample,
};

export const ProgrammaticFocus: Story = {
  render: ProgrammaticFocusExample,
};

export const UsageWithSelect: Story = {
  render: UsageWithSelectExample,
};
