import type { Meta, StoryObj } from '@storybook/react';

import { FilterTrigger } from '@semcore/base-trigger';

import AdvancedWithCounterExample from './examples/advanced_with_counter';

const meta: Meta<typeof FilterTrigger> = {
  title: 'Components/FilterTrigger/Advanced',
  component: FilterTrigger,
};

export default meta;
type Story = StoryObj<typeof FilterTrigger>;

export const AdvancedWithCounter: Story = {
  render: AdvancedWithCounterExample,
};
