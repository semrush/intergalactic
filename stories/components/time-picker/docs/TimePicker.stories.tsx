import type { Meta, StoryObj } from '@storybook/react';

import TimePicker from '@semcore/time-picker';

import ExpandedAccessToAllTheComponentsExample from './examples/expanded_access_to_all_the_components';

const meta: Meta<typeof TimePicker> = {
    title: 'Components/TimePicker/Documentation',
    component: TimePicker,
};

export default meta;
type Story = StoryObj<typeof TimePicker>;

export const ExpandedAccessToAllTheComponents: Story = {
    render: ExpandedAccessToAllTheComponentsExample,
};
