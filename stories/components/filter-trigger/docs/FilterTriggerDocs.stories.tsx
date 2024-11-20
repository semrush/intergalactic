import type { Meta, StoryObj } from '@storybook/react';

import { FilterTrigger } from '@semcore/base-trigger';

import AccessibleNameExample from './examples/accessible_name';
import AdvancedWithCounterExample from './examples/advanced_with_counter';
import ProgrammaticFocusExample from './examples/programmatic_focus';
import UsageWithSelectExample from './examples/usage_with_select';

const meta: Meta<typeof FilterTrigger> = {
  title: 'Components/FilterTrigger/Documentation',
  component: FilterTrigger,
};

export default meta;
type Story = StoryObj<typeof FilterTrigger>;

export const AccessibleName: Story = {
  render: AccessibleNameExample,
};

export const AdvancedWithCounter: Story = {
  render: AdvancedWithCounterExample,
};

export const ProgrammaticFocus: Story = {
  render: ProgrammaticFocusExample,
};

export const UsageWithSelect: Story = {
  render: UsageWithSelectExample,
};
