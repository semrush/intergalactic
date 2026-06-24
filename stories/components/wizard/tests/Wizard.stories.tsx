import Wizard from '@semcore/ui/wizard';
import type { Meta, StoryObj } from '@storybook/react-vite';

import FocusNextPrevExample from './examples/focus-next-prev';
import SidebarAsComponentExample, { defaultExampleNoSideBarProps } from './examples/sidebar-as-component';
import SteppersAndButtonsStatesExample, { defaultProps as steppersAndButtonsStatesProps } from './examples/steps_and_buttons_states';
import WithScrollAreaExample from './examples/with-scroll-area';
import WizardContentExample from './examples/wizard-content';

const meta: Meta<typeof Wizard> = {
  title: 'Components/Wizard/Tests',
  component: Wizard,
};
export default meta;

type Story = StoryObj<typeof Wizard>;

export const SteppersAndButtonsStates: StoryObj<typeof steppersAndButtonsStatesProps> = {
  render: SteppersAndButtonsStatesExample,
  argTypes: {
    firstStepTitle: {
      control: { type: 'text' },
    },
    ellipsis: {
      control: { type: 'boolean' },
    },
  },
  args: steppersAndButtonsStatesProps,
};

export const WizardContent: Story = {
  render: WizardContentExample,
};

export const WithScrollArea: Story = {
  render: WithScrollAreaExample,
};

export const SidebarAsComponent: StoryObj<typeof defaultExampleNoSideBarProps> = {
  render: SidebarAsComponentExample,
  argTypes: {
    noSidebar: {
      control: { type: 'boolean' },
    },
  },
  args: defaultExampleNoSideBarProps,
};

export const FocusNextPrev: Story = {
  render: FocusNextPrevExample,
};
