import type { Meta, StoryObj } from '@storybook/react';

import Breadcrumbs from '@semcore/breadcrumbs';

import UsageExample from './examples/usage_example';
import RedefiningATagExample from './examples/redefining_a_tag';

const meta: Meta<typeof Breadcrumbs> = {
  title: 'Components/Breadcrumbs/Documentation',
};

export default meta;

export const BasicUsage: StoryObj<typeof Breadcrumbs> = {
  render: UsageExample,
};

export const RedefiningATag: StoryObj<typeof Breadcrumbs> = {
  render: RedefiningATagExample,
};
