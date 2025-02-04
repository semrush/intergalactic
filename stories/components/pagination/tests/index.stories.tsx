import type { Meta, StoryObj } from '@storybook/react';

import Pagination from '@semcore/pagination';

import TotalPageIs1Example from './examples/total_pages_is_1';
import SizesExample from './examples/sizes';

const meta: Meta<typeof Pagination> = {
  title: 'Components/Pagination/Tests',
  component: Pagination,
};

export default meta;
type Story = StoryObj<typeof Pagination>;

export const TotalPageIs1: Story = {
  render: TotalPageIs1Example,
};

export const Sizes: Story = {
  render: SizesExample,
};
