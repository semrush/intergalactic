
import type { Meta, StoryObj } from '@storybook/react';

import { DataTable } from '@semcore/data-table';

import LoadingScrollExample from './examples/table-states-tests/loading-in-scroll';
import LoadingPaginationExample from './examples/table-states-tests/loading-in-pagination';
import NothingFoundSortableExample from './examples/table-states-tests/nothing-found-sortable';


const meta: Meta<typeof DataTable> = {
  title: 'Components/DataTable/Tests/TableStates',
  component: DataTable,
};

export default meta;
type Story = StoryObj<typeof DataTable>;


export const NothingFoundSortable: Story = {
  render: NothingFoundSortableExample,
};

export const LoadingPagination: Story = {
  render: LoadingPaginationExample,
};

export const LoadingScroll: Story = {
  render: LoadingScrollExample,
};