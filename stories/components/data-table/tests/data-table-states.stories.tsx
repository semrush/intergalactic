
import type { Meta, StoryObj } from '@storybook/react';

import { DataTable } from '@semcore/data-table';

import LoadingScrollExample from './examples/table-states-tests/loading-in-scroll';
import LoadingPaginationExample from './examples/table-states-tests/loading-in-pagination';
import NothingFoundSortableExample from './examples/table-states-tests/nothing-found-sortable';
import LoadingWithScrollAndButtonExample from './examples/table-states-tests/loading-with-button-and-scroll';


const meta: Meta<typeof DataTable> = {
  title: 'Components/DataTable/Tests/TableStates',
  component: DataTable,
};

export default meta;
type Story = StoryObj<typeof DataTable>;


export const NothingFoundSortable: Story = {
  render: NothingFoundSortableExample,
};

export const LoadingWithScrollAndButton: Story = {
  render: LoadingWithScrollAndButtonExample,
};

export const LoadingPagination: Story = {
  render: LoadingPaginationExample,
};

export const LoadingScroll: Story = {
  render: LoadingScrollExample,
};