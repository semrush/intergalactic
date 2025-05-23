import type { Meta, StoryObj } from '@storybook/react';

import Dropdown from '@semcore/dropdown';

import DDWithTooltipExample from './examples/dd-with-tooltip';
import DDStretchExample from './examples/dd-stretch';
import DDInteractionExample from './examples/dd-interaction';
import DDCasesExample from './examples/dd-cases';
import DDTriggerPopperExample from './examples/dd-trigger-and-popper';
import DDInputTriggerFocusExample from './examples/dd-input-trigger-focus';
import DDInputTriggerExample from './examples/dd-input-trigger';


const meta: Meta<typeof Dropdown> = {
  title: 'Components/Dropdown/Tests',
  component: Dropdown,
};
export default meta;

type Story = StoryObj<typeof Dropdown>;

export const DDInputTrigger: Story = {
  render: DDInputTriggerExample,
};

export const DDInputTriggerFocus: Story = {
  render: DDInputTriggerFocusExample,
};

export const DDWithTooltip: Story = {
  render: DDWithTooltipExample,
};

export const DDStretch: Story = {
  render: DDStretchExample,
};

export const DDInteraction: Story = {
  render: DDInteractionExample,
};

export const DDCases: Story = {
  render: DDCasesExample,
};

export const DDTriggerPopper: Story = {
  render: DDTriggerPopperExample,
};