import { FilterTrigger } from '@semcore/ui/base-trigger';
import type { Meta, StoryObj } from '@storybook/react-vite';

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
