import type { Meta, StoryObj } from '@storybook/react';
import SidePanel from '@semcore/side-panel';

import AccessToInternalComponentsExample from './examples/access_to_internal_components';
import AdvancedExampleExample from './examples/advanced_example';
import BasicExampleExample from './examples/basic_example';
import DisablingOverlayExample from './examples/disabling_overlay';
import PlacementExample from './examples/placement';
import PortalsExample from './examples/portals';



const meta: Meta<typeof SidePanel> = {
  title: 'Components/SidePanel/Documentation',
  component: SidePanel,
};

export default meta;
type Story = StoryObj<typeof SidePanel>;

export const AccessToInternalComponents: Story = {
  render: AccessToInternalComponentsExample,
};

export const AdvancedExample: Story = {
  render: AdvancedExampleExample,
};

export const BasicExample: Story = {
  render: BasicExampleExample,
};

export const DisablingOverlay: Story = {
    render: DisablingOverlayExample,
};

export const Placement: Story = {
    render: PlacementExample,
};
  
export const Portals: Story = {
    render: PortalsExample,
};