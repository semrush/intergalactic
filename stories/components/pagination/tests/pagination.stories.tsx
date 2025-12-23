import Pagination from '@semcore/ui/pagination';
import type { Meta, StoryObj } from '@storybook/react-vite';

import AdvancedPageInputExample from './examples/advanced_page_input';
import IntearctiveIconInInputExample from './examples/interactive-icon-in-input';
import CustomStylesExample from './examples/pages-and-input-custom-styles';
import PaginationPropsExample, { defaultPaginationPropsExample } from './examples/pagination-props';

const meta: Meta<typeof Pagination> = {
  title: 'Components/Pagination/Tests',
  component: Pagination,
};

export default meta;
type Story = StoryObj<typeof Pagination>;

export const AdvancedPageInput: Story = {
  render: AdvancedPageInputExample,
};

export const CustomStyles: Story = {
  render: CustomStylesExample,
};

export const IntearctiveIconInInput: Story = {
  render: IntearctiveIconInInputExample,
};

export const PaginationProps: StoryObj<typeof defaultPaginationPropsExample> = {
  render: PaginationPropsExample,
  argTypes: {
    totalPages: {
      control: { type: 'number' },
    },
    currentPage: {
      control: { type: 'number' },
    },
    size: {
      control: { type: 'select' },
      options: ['m', 'l'],
    },
    locale: {
      control: { type: 'select' },
      options: ['en', 'de', 'es', 'fr', 'it', 'ja', 'ko', 'pl', 'pt', 'ru', 'zh', 'vi'],
    },
  },
  args: defaultPaginationPropsExample,
};
