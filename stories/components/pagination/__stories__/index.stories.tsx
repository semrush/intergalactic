import type { Meta, StoryObj } from '@storybook/react';

import Pagination from '@semcore/pagination';

import BasicUsageExample from './docs-examples/basic_usage';

import TotalPageIs1Example from './components/total_pages_is_1';
import LocaleExample from './components/locales';

const meta: Meta<typeof Pagination> = {
  title: 'Components/Pagination',
  component: Pagination,
};

export default meta;
type Story = StoryObj<typeof Pagination>;

export const BasicUsage: Story = {
  render: BasicUsageExample,
};

export const TotalPageIs1: Story = {
  render: TotalPageIs1Example,
};

export const Locale: Story = {
  render: LocaleExample,
};