
import type { Meta, StoryObj } from '@storybook/react';

import { DataTable } from '@semcore/data-table';

import LoadingScrollExample from './examples/table-states-tests/loading-in-scroll';
import LoadingPaginationExample from './examples/table-states-tests/loading-in-pagination';
import EmptyStateSortableExample from './examples/table-states-tests/empty-sortable';
import LoadingWithScrollAndButtonExample from './examples/table-states-tests/loading-with-button-and-scroll';
import WidgetEmptyInCellExample from './examples/table-states-tests/widget-empty-in-cell';
import NothingFoundExample from './examples/table-states-tests/nothing-found';


const meta: Meta<typeof DataTable> = {
  title: 'Components/DataTable/Tests/TableStates',
  component: DataTable,
};

export default meta;
type Story = StoryObj<typeof DataTable>;

export const WidgetEmptyInCell: Story = {
  render: WidgetEmptyInCellExample,
};

export const NothingFound: Story = {
  render: NothingFoundExample,
};

export const EmptyStateSortable: Story = {
  render: EmptyStateSortableExample,
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