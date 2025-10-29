import Tooltip from '@semcore/ui/tooltip';
import type { Meta, StoryObj } from '@storybook/react-vite';

import TooltipInteractionsExample from './examples/basic_usage';
import InteractiveInTooltipsExample from './examples/interactive-in-tooltip';
import TooltipStatesExample from './examples/tooltip-styles';
import ValidationErrorsExample from './examples/validation-error';

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

export const ValidationErrors: Story = {
  render: ValidationErrorsExample,
};
