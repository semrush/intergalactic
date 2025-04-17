import type { Meta, StoryObj } from '@storybook/react';

import Radio from '@semcore/radio';

import RadioGroupExample from './examples/radiogroup_example';
import AdditionalPropsForInputExample from './examples/additional_props_for_input';

const meta: Meta<typeof Radio> = {
    title: 'Components/Radio/Documentation',
    component: Radio,
};

export default meta;
type Story = StoryObj<typeof Radio>;

export const RadioGroup: Story = {
    render: RadioGroupExample,
};

export const AdditionalPropsForInput: Story = {
    render: AdditionalPropsForInputExample,
};
