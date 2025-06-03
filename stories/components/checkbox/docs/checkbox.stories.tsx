import type { Meta, StoryObj } from '@storybook/react';

import Checkbox from '@semcore/checkbox';

import AdditionalPropsForInputExample from './examples/additional_props_for_input';
import BasicUsageExample from './examples/basic_usage';
import CheckboxWithOtherComponentsExample from './examples/checkbox_with_other_components';
import PartialSelectionExample from './examples/partial_selection';

const meta: Meta<typeof Checkbox> = {
  title: 'Components/Checkbox/Documentation',
  component: Checkbox,
};

export default meta;
type Story = StoryObj<typeof Checkbox>;

export const AdditionalPropsForInput: Story = {
  render: AdditionalPropsForInputExample,
};

export const BasicUsage: Story = {
  render: BasicUsageExample,
};

export const CheckboxWithOtherComponents: Story = {
  render: CheckboxWithOtherComponentsExample,
};

export const PartialSelection: Story = {
  render: PartialSelectionExample,
};
