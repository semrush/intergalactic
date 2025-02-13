import type { Meta, StoryObj } from '@storybook/react';

import Switch from '@semcore/switch';

import BasicExample from './examples/basic_example';
import BasicWithIconExample from './examples/basic_example_with_icon';
import ExternalLabelExample from './examples/external_label';

const meta: Meta<typeof Switch> = {
    title: 'Components/Switch/Documentation',
    component: Switch,
};

export default meta;
type Story = StoryObj<typeof Switch>;

export const Basic: Story = {
    render: BasicExample,
};

export const BasicWithIcon: Story = {
    render: BasicWithIconExample,
};

export const ExternalLabel: Story = {
    render: ExternalLabelExample,
};
