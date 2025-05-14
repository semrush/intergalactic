import type { Meta, StoryObj } from '@storybook/react';
import Radio, { RadioGroup } from '@semcore/radio';

import AdditionalPropsInputExample from './examples/additional_props_for_input';
import RadioGroupExampleExample from './examples/radiogroup_example';

const meta: Meta<typeof Radio> = {
  title: 'Components/Radio/Documentation',
  component: Radio,
};

export default meta;
type Story = StoryObj<typeof Radio>;

export const AdditionalPropsInput: Story = {
  render: AdditionalPropsInputExample,
};

export const RadioGroupExample: Story = {
  render: RadioGroupExampleExample,
};
