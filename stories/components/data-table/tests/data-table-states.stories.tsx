import { DataTable } from '@semcore/data-table';
import type { Meta, StoryObj } from '@storybook/react-vite';

import CheckboxInTableDemo from './examples/table-states-tests/checkbox-in-table.tsx';
import EmptyStateSortableExample from './examples/table-states-tests/empty-sortable';
import LoadingPaginationExample from './examples/table-states-tests/loading-in-pagination';
import LoadingScrollExample from './examples/table-states-tests/loading-in-scroll';
import LoadingWithScrollAndButtonExample from './examples/table-states-tests/loading-with-button-and-scroll';
import NothingFoundExample from './examples/table-states-tests/nothing-found';
import WidgetEmptyInCellExample from './examples/table-states-tests/widget-empty-in-cell';

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

export const CheckboxInTable: Story = {
  render: CheckboxInTableDemo,
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
