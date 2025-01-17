import type { Meta, StoryObj } from '@storybook/react';

import Wizard from '@semcore/wizard';

import BasicExample from './examples/basic_example';
import CustomStepExample from './examples/custom_step';
import CustomStepperExample from './examples/custom_stepper';
import SidebarStatesExample from './examples/sidebar_states';

const meta: Meta<typeof Wizard> = {
  title: 'Components/Wizard/Documentation',
  component: Wizard,
};
export default meta;

type Story = StoryObj<typeof Wizard>;


export const Basic: Story = {
  render: BasicExample,
};

export const CustomStep: Story = {
  render: CustomStepExample,
};

export const CustomStepper: Story = {
  render: CustomStepperExample,
};

export const SidebarStates: Story = {
    render: SidebarStatesExample,
};