import type Breadcrumbs from '@semcore/breadcrumbs';
import type { Meta, StoryObj } from '@storybook/react';

import RedefiningATagExample from './examples/redefining_a_tag';
import UsageExample from './examples/usage_example';

const meta: Meta<typeof Breadcrumbs> = {
  title: 'Components/Breadcrumbs/Documentation',
};

export default meta;
type Story = StoryObj<typeof Breadcrumbs>;

export const BasicUsage: Story = {
  render: UsageExample,
};

export const RedefiningATag: Story = {
  render: RedefiningATagExample,
};
