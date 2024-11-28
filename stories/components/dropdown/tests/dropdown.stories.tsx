import type { Meta, StoryObj } from '@storybook/react';

import Dropdown from '@semcore/dropdown';

import DDWithTooltipExample from './examples/dd-with-tooltip';

const meta: Meta<typeof Dropdown> = {
  title: 'Components/Dropdown/Tests',
  component: Dropdown,
};
export default meta;

type Story = StoryObj<typeof Dropdown>;

export const DDWithTooltip: Story = {
  render: DDWithTooltipExample,
};
