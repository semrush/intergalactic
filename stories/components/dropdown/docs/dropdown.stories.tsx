import type { Meta, StoryObj } from '@storybook/react';

import Dropdown from '@semcore/dropdown';

import BasicUsageExample from './examples/basic_usage';
import FocusInteractionExample from './examples/focus_interaction';

const meta: Meta<typeof Dropdown> = {
  title: 'Components/Dropdown/Documentation',
  component: Dropdown,
};
export default meta;

type Story = StoryObj<typeof Dropdown>;

export const BasicUsage: Story = {
  render: BasicUsageExample,
};

export const FocusInteraction: Story = {
  render: FocusInteractionExample,
};
