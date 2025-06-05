import Tooltip from '@semcore/tooltip';
import type { Meta, StoryObj } from '@storybook/react';

import InteractiveInTooltipsExample from './examples/interactive-in-tooltip';
import TooltipStatesExample from './examples/tooltip-styles';
import TooltipInteractionsExample from './examples/basic_usage';

const meta: Meta<typeof Tooltip> = {
  title: 'Components/Tooltip/Tests',
  component: Tooltip,
};
export default meta;

type Story = StoryObj<typeof Tooltip>;

export const InteractiveInTooltips: Story = {
  render: InteractiveInTooltipsExample,
};

export const TooltipStates: Story = {
  render: TooltipStatesExample,
};

export const TooltipInteractions: Story = {
  render: TooltipInteractionsExample,
};
