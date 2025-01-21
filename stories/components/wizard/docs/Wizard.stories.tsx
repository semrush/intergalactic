import type { Meta, StoryObj } from '@storybook/react';

import Wizard from '@semcore/wizard';

import BasicExample from './examples/basic_example';
import CustomStepExample from './examples/custom_step';
import CustomStepperExample from './examples/custom_stepper';

import { BasicExampleTest } from './__tests__/basic_example_test.test';
import { CustomStepExampleTest } from './__tests__/custom_step_test.test';
import { CustomStepperExampleTest } from './__tests__/custom_stepper_test.test';
import { playWrapper } from '../../../utils/playWrapper';

const meta: Meta<typeof Wizard> = {
  title: 'Components/Wizard/Documentation',
  component: Wizard,
};
export default meta;

type Story = StoryObj<typeof Wizard>;


export const Basic: Story = {
  render: BasicExample,
  play: playWrapper(BasicExampleTest),
};

export const CustomStep: Story = {
  render: CustomStepExample,
  play: playWrapper(CustomStepExampleTest),
};

export const CustomStepper: Story = {
  render: CustomStepperExample,
  play: playWrapper(CustomStepperExampleTest),
};
