import type { Meta, StoryObj } from '@storybook/react';

import Wizard from '@semcore/wizard';

import SteppersAndButtonsStatesExample from './examples/steps_and_buttons_states';

const meta: Meta<typeof Wizard> = {
  title: 'Components/Wizard/Tests',
  component: Wizard,
};
export default meta;

type Story = StoryObj<typeof Wizard>;

export const SteppersAndButtonsStates: Story = {
  render: SteppersAndButtonsStatesExample,
};
