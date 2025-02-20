import type { Meta, StoryObj } from '@storybook/react';

import Pagination from '@semcore/pagination';

import TotalPageIs1Example from './examples/pages_is_1_locales';
import SizesExample from './examples/sizes';

const meta: Meta<typeof Pagination> = {
  title: 'Components/Pagination/Tests',
  component: Pagination,
};

export default meta;
type Story = StoryObj<typeof Pagination>;

export const Page1AndLocalesCases: Story = {
  render: TotalPageIs1Example,
};

export const Sizes: Story = {
  render: SizesExample,
};
