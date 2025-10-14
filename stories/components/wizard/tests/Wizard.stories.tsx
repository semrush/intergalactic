import Wizard from '@semcore/ui/wizard';
import type { Meta, StoryObj } from '@storybook/react-vite';

import SteppersAndButtonsStatesExample from './examples/steps_and_buttons_states';
import WithScrollAreaExample from './examples/with-scroll-area';
import WizardContentExample from './examples/wizard-content';

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

export const WithScrollArea: Story = {
  render: WithScrollAreaExample,
};
