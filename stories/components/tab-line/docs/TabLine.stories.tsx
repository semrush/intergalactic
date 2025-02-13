import type { Meta, StoryObj } from '@storybook/react';

import TabLine from '@semcore/tab-line';

import AutomaticTabActivationExample from './examples/automatic_tab_activation';
import DisabledTabLineItemExample from './examples/disabled_tab_line_item';
import ManualTabActivationExample from './examples/manual_tab_activation';
import TabLineItemAddonsExample from './examples/tab_line_item_addons';

const meta: Meta<typeof TabLine> = {
    title: 'Components/TabLine/Documentation',
    component: TabLine,
};

export default meta;
type Story = StoryObj<typeof TabLine>;

export const AutomaticTabActivation: Story = {
    render: AutomaticTabActivationExample,
};

export const DisabledTabLineItem: Story = {
    render: DisabledTabLineItemExample,
};

export const ManualTabActivation: Story = {
    render: ManualTabActivationExample,
};

export const TabLineItemAddons: Story = {
    render: TabLineItemAddonsExample,
};
