import SidePanel from '@semcore/ui/side-panel';
import type { Meta, StoryObj } from '@storybook/react-vite';

import AccessToInternalComponentsExample, { defaultProps as AccessToInternalComponentsProps } from './examples/access_to_internal_components';
import AdvancedExampleExample, { defaultProps as AdvancedExampleProps } from './examples/advanced_example';
import BasicExampleExample, { defaultProps as BasicExampleProps } from './examples/basic_example';
import DisablingOverlayExample, { defaultProps as DisablingOverlayProps } from './examples/disabling_overlay';
import PlacementExample from './examples/placement';
import PortalsExample from './examples/portals';

const meta: Meta<typeof SidePanel> = {
  title: 'Components/SidePanel/Documentation',
  component: SidePanel,
};

export default meta;

type Story = StoryObj<typeof SidePanel>;

const commonArgTypes = {
  placement: {
    control: { type: 'select' },
    options: ['top', 'bottom', 'left', 'right'],
  },
  closable: {
    control: { type: 'boolean' },
  },
  disablePreventScroll: {
    control: { type: 'boolean' },
  },
} as const;

export const AccessToInternalComponents: StoryObj<typeof AccessToInternalComponentsProps> = {
  render: AccessToInternalComponentsExample,
  argTypes: commonArgTypes,
  args: AccessToInternalComponentsProps,
};

export const AdvancedExample: StoryObj<typeof AdvancedExampleProps> = {
  render: AdvancedExampleExample,
  argTypes: commonArgTypes,
  args: AdvancedExampleProps,
};

export const BasicExample: StoryObj<typeof BasicExampleProps> = {
  render: BasicExampleExample,
  argTypes: commonArgTypes,
  args: BasicExampleProps,
};

export const DisablingOverlay: StoryObj<typeof DisablingOverlayProps> = {
  render: DisablingOverlayExample,
  argTypes: commonArgTypes,
  args: DisablingOverlayProps,
};

export const Placement: Story = {
  render: PlacementExample,
};

export const Portals: Story = {
  render: PortalsExample,
};
