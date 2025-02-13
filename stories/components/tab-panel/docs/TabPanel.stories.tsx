import type { Meta, StoryObj } from '@storybook/react';

import TabPanel from '@semcore/tab-panel';

import AutomaticTabActivationExample from './examples/automatic_tab_activation';
import DisabledTabPanelItemExample from './examples/disabled_tab_panel_item';
import ManualTabActivationExample from './examples/manual_tab_activation';
import TabPanelAddonsExample from './examples/tab_panel_item_addons';

const meta: Meta<typeof TabPanel> = {
    title: 'Components/TabPanel/Documentation',
    component: TabPanel,
};

export default meta;
type Story = StoryObj<typeof TabPanel>;

export const AutomaticTabActivation: Story = {
    render: AutomaticTabActivationExample,
};

export const DisabledTabPanelItem: Story = {
    render: DisabledTabPanelItemExample,
};

export const ManualTabActivation: Story = {
    render: ManualTabActivationExample,
};

export const TabPanelAddons: Story = {
    render: TabPanelAddonsExample,
};
