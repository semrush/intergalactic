import type { Meta, StoryObj } from '@storybook/react';

import { DataTable } from '@semcore/data-table';

import BaseExample from './examples/base';
import AccessToCellsExample from './examples/access-to-cells';
import AccessToSetOfCellsExample from './examples/access-to-set-of-cells';
import AccordionInsideTableExample from './examples/accordion-inside-table';
import BordersExample from './examples/borders';
import CheckboxInTableExample from './examples/checkbox-in-table';
import ColumnAlignmentExample from './examples/column-alignment';
import ColumnSizeExample from './examples/column-sizes';
import ColumnsMergingExample from './examples/columns-merging';
import CompactExample from './examples/compact';
import CustomRowsRenderingExample from './examples/custom-rows-rendering';
import CustomizingHeaderExample from './examples/customizing-header';
import EmptyTableExample from './examples/empty-table';
import ExportInImageExample from './examples/export-in-image';
import FixedColumnsExample from './examples/fixed-columns';
import FixedHeaderExample from './examples/fixed-header';
import MultiLevelHeaderExample from './examples/multi-level-header';
import PaginationExample from './examples/pagination';
import RowsMergingExample from './examples/rows-merging';
import RowThemesExample from './examples/row-themes';
import ScrollInTableExample from './examples/scroll-in-table';
import SecondaryTableExample from './examples/secondary-table';
import SkeletonInTableExample from './examples/skeleton-in-table';
import SpinContainerInTableExample from './examples/spin-container-in-table';
import SortingExample from './examples/sorting';
import SortingChangingSizeExample from './examples/sorting-changing-size';
import TableInTableExample from './examples/table-in-table';
import TableInTableWithFixedColumnExample from './examples/table-in-table-with-fixed-column';
import VirtualScrollInTableExample from './examples/virtual-scroll-in-table';
import VirtualScrollInTableDifferentHeightExample from './examples/virtual-scroll-in-table-different-height';

const meta: Meta<typeof DataTable> = {
  title: 'Components/DataTable/Documentation',
  component: DataTable,
};

export default meta;
type Story = StoryObj<typeof DataTable>;

export const Base: Story = {
  render: BaseExample,
};

export const AccessToCells: Story = {
  render: AccessToCellsExample,
};

export const AccessToSetOfCells: Story = {
  render: AccessToSetOfCellsExample,
};

export const AccordionInsideTable: Story = {
  render: AccordionInsideTableExample,
};

export const Borders: Story = {
  render: BordersExample,
};

export const CheckboxInTable: Story = {
  render: CheckboxInTableExample,
};

export const ColumnAlignment: Story = {
  render: ColumnAlignmentExample,
};

export const ColumnSize: Story = {
  render: ColumnSizeExample,
};

export const ColumnsMerging: Story = {
  render: ColumnsMergingExample,
};

export const Compact: Story = {
  render: CompactExample,
};

export const CustomRowsRendering: Story = {
  render: CustomRowsRenderingExample,
};

export const CustomizingHeader: Story = {
  render: CustomizingHeaderExample,
};

export const EmptyTable: Story = {
  render: EmptyTableExample,
};

export const ExportInImage: Story = {
  render: ExportInImageExample,
};

export const FixedColumns: Story = {
  render: FixedColumnsExample,
};

export const FixedHeader: Story = {
  render: FixedHeaderExample,
};

export const MultiLevelHeader: Story = {
  render: MultiLevelHeaderExample,
};

export const Pagination: Story = {
  render: PaginationExample,
};

export const RowsMerging: Story = {
  render: RowsMergingExample,
};

export const RowThemes: Story = {
  render: RowThemesExample,
};

export const ScrollInTable: Story = {
  render: ScrollInTableExample,
};

export const SecondaryTable: Story = {
  render: SecondaryTableExample,
};

export const SkeletonInTable: Story = {
  render: SkeletonInTableExample,
};

export const SpinContainerInTable: Story = {
  render: SpinContainerInTableExample,
};

export const Sorting: Story = {
  render: SortingExample,
};

export const SortingChangingSize: Story = {
  render: SortingChangingSizeExample,
};

export const TableInTable: Story = {
  render: TableInTableExample,
};

export const TableInTableWithFixedColumn: Story = {
  render: TableInTableWithFixedColumnExample,
};

export const VirtualScrollInTable: Story = {
  render: VirtualScrollInTableExample,
};

export const VirtualScrollInTableDifferentHeight: Story = {
  render: VirtualScrollInTableDifferentHeightExample,
};
