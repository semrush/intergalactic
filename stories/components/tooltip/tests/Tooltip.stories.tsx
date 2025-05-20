import type { Meta, StoryObj } from '@storybook/react';

import Tooltip from '@semcore/tooltip';

import BasicUsageExample from './examples/interactive-in-tooltip';

const meta: Meta<typeof Tooltip> = {
  title: 'Components/Tooltip/Tests',
  component: Tooltip,
};
export default meta;

type Story = StoryObj<typeof Tooltip>;

export const BasicUsage: Story = {
  render: BasicUsageExample,
};
