import { DataTable } from '@semcore/ui/data-table';
import type { Meta, StoryObj } from '@storybook/react-vite';

import AccordionExample, { tableInTableDefaultProps } from './examples/limited-mode/accordion';
import type { TableInTableProps } from './examples/limited-mode/accordion';
import CheckboxExample, { checkboxExampleProps } from './examples/limited-mode/checkboxes';
import type { CheckboxExampleProps } from './examples/limited-mode/checkboxes';
import RowsColumnsMergingExample, { rowsColumnsMergingProps } from './examples/limited-mode/row-and-column-merging';
import type { RowsColumnsMergingProps } from './examples/limited-mode/row-and-column-merging';
import type { ScrollInTableProps } from './examples/limited-mode/scroll-in-table-sticky';
import ScrollInTableExample, { scrollInTableProps } from './examples/limited-mode/scroll-in-table-sticky';
import type { FixedColumnDiffWidthProps } from './examples/limited-mode/scroll-with-fixed-columns';
import ScrollWithFixedColumnExample, { fixedColumnDiffWidthProps } from './examples/limited-mode/scroll-with-fixed-columns';
import type { SortTableProps } from './examples/limited-mode/sortable-table';
import SortableTableExample, { sortTableProps } from './examples/limited-mode/sortable-table';
const meta: Meta<typeof DataTable> = {
  title: 'Components/DataTable/Tests/Limited Mode',
  component: DataTable,
};
export default meta;
export const ScrollWithFixedColumn: StoryObj<FixedColumnDiffWidthProps> = {
  render: ScrollWithFixedColumnExample,
  args: {
    ...fixedColumnDiffWidthProps,
  },
};
export const ScrollInTable: StoryObj<ScrollInTableProps> = {
  render: ScrollInTableExample,
  args: {
    ...scrollInTableProps,
  },
};
export const Checkbox: StoryObj<CheckboxExampleProps> = {
  render: CheckboxExample,
  args: {
    ...checkboxExampleProps,
  },
};
export const SortableTable: StoryObj<SortTableProps> = {
  render: SortableTableExample,
  args: {
    ...sortTableProps,
  },
};
export const RowsColumnsMerging: StoryObj<RowsColumnsMergingProps> = {
  render: RowsColumnsMergingExample,
  args: {
    ...rowsColumnsMergingProps,
  },
};
export const Accordion: StoryObj<TableInTableProps> = {
  render: AccordionExample,
  args: {
    ...tableInTableDefaultProps,
  },
};
