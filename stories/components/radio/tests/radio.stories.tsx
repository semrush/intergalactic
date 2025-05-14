import type { Meta, StoryObj } from '@storybook/react';
import Radio, { RadioGroup } from '@semcore/radio';

import RadioGroupLExample from './examples/radiogroup_example_L';
import AdditionalPropsInputLExample from './examples/additional_props_for_input_L';
import WithLinkInTextExample from './examples/radiogroup_example_with_link';
import AdditionalPropsInputTooltipExample from './examples/additional_props_for_input_tooltip';

import RadioGroupStatesExample from './examples/radiogroup_different_states';
import SizesCheckedUncheckedExample from './examples/checked-and-focused-states';

const meta: Meta<typeof Radio> = {
  title: 'Components/Radio/Tests',
  component: Radio,
};

export default meta;
type Story = StoryObj<typeof Radio>;

export const RadioGroupL: Story = {
  render: RadioGroupLExample,
};

export const AdditionalPropsInputTooltip: Story = {
  render: AdditionalPropsInputTooltipExample,
};

export const RadioGroupStates: Story = {
  render: RadioGroupStatesExample,
};

export const AdditionalPropsInputL: Story = {
  render: AdditionalPropsInputLExample,
};

export const SizesCheckedUnchecked: Story = {
  render: SizesCheckedUncheckedExample,
};

export const WithLinkInText: Story = {
  render: WithLinkInTextExample,
};