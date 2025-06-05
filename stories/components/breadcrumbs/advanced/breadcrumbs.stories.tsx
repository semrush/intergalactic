import type Breadcrumbs from '@semcore/breadcrumbs';
import type { Meta, StoryObj } from '@storybook/react';

import TrimMiddleExample from './examples/trim_middle';

const meta: Meta<typeof Breadcrumbs> = {
  title: 'Components/Breadcrumbs/Advanced',
};

export default meta;
type Story = StoryObj<typeof Breadcrumbs>;

export const TrimMiddle: Story = {
  render: TrimMiddleExample,
};
