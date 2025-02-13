import type { Meta, StoryObj } from '@storybook/react';

import Pills from '@semcore/pills';

import BasicUsageExample from './examples/basic_example';
import TabsExample from './examples/tabs_example';

const meta: Meta<typeof Pills> = {
    title: 'Components/Pills/Documentation',
    component: Pills,
};

export default meta;
type Story = StoryObj<typeof Pills>;

export const BasicUsage: Story = {
    render: BasicUsageExample,
};

export const Tabs: Story = {
    render: TabsExample,
};
