import Wizard from '@semcore/wizard';
import type { Meta, StoryObj } from '@storybook/react-vite';

import SteppersAndButtonsStatesExample from './examples/steps_and_buttons_states';
import WizardContentExample from './examples/wizard-content';
import WizardSidebarRightExample from './examples/wizard-sidebar-right';

const meta: Meta<typeof Wizard> = {
  title: 'Components/Wizard/Tests',
  component: Wizard,
};
export default meta;

type Story = StoryObj<typeof Wizard>;

export const SteppersAndButtonsStates: Story = {
  render: SteppersAndButtonsStatesExample,
};

export const WizardContent: Story = {
  render: WizardContentExample,
};

export const WizardSidebarRight: Story = {
  render: WizardSidebarRightExample,
};
