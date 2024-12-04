import type { Meta, StoryObj } from '@storybook/react';

import InputNumber from '@semcore/input-number';

import BasicExample from './examples/basic_example';
import AppearanceCustomizationExample from './examples/appearance_customization';
import RangeOfValuesExample from './examples/range_of_values';

const meta: Meta<typeof InputNumber> = {
  title: 'Components/InputNumber/Documentation',
  component: InputNumber,
};

export default meta;
type Story = StoryObj<typeof InputNumber>;

export const Basic: Story = {
  render: BasicExample,
};

export const AppearanceCustomization: Story = {
  render: AppearanceCustomizationExample,
};

export const RangeOfValues: Story = {
  render: RangeOfValuesExample,
};
