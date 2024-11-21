import type { Meta, StoryObj } from '@storybook/react';

import Pagination from '@semcore/pagination';

import BasicUsageExample from './examples/basic_usage';

const meta: Meta<typeof Pagination> = {
  title: 'Components/Pagination/Documentation',
  component: Pagination,
};

export default meta;
type Story = StoryObj<typeof Pagination>;

export const BasicUsage: Story = {
  render: BasicUsageExample,
};