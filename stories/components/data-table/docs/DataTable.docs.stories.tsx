import type { Meta, StoryObj } from '@storybook/react';

import DataTable from '@semcore/data-table';

import BaseExample from './examples/base';
import AccessToCellsExample from './examples/access-to-cells';
import AccessToSetOfCellsExample from './examples/access-to-set-of-cells';
import AccordionInsideTableExample from './examples/accordion-inside-table';
import AddingAdditionalElementsToTableBodyExample from './examples/adding-additional-elements-to-table-body';
import AdditionalElementsInHeaderExample from './examples/additional-elements-in-header';
import BordersExample from './examples/borders';
import ColumnAlignmentExample from './examples/column-alignment';
import ColumnExpandExample from './examples/column-expand';
import ColumnSizeExample from './examples/column-sizes';
import ColumnsMergingExample from './examples/columns-merging';
import CompactExample from './examples/compact';
import CustomRowsRenderingExample from './examples/custom-rows-rendering';
import CustomViewForTableBodyExample from './examples/custom-view-for-table-body';
import CustomizingHeaderExample from './examples/customizing-header';
import DownloadStatusExample from './examples/download-status';
import ExportInImageExample from './examples/export-in-image';
import FixedColumnsExample from './examples/fixed-columns';
import FixedHeaderExample from './examples/fixed-header';
import FixedHeaderWithSpinOverlayExample from './examples/fixed-header-with-spin-overlay';
import MultiLevelHeaderExample from './examples/multi-level-header';
import PaginationExample from './examples/pagination';
import RowsMergingExample from './examples/rows-merging';
import ScrollInTableExample from './examples/scroll-in-table';
import SecondaryTableExample from './examples/secondary-table';
import SkeletonInTableExample from './examples/skeleton-in-table';
import SortingExample from './examples/sorting';
import SortingChangingSizeExample from './examples/sorting-changing-size';
import SortingChangingSizeByColumnsExample from './examples/sorting-changing-size-by-columns';
import TableInTableExample from './examples/table-in-table';
import TableInTableWithFixedColumnExample from './examples/table-in-table-with-fixed-column';
import VirtualScrollInTableExample from './examples/virtual-scroll-in-table';

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

export const AddingAdditionalElementsToTableBody: Story = {
  render: AddingAdditionalElementsToTableBodyExample,
};

export const AdditionalElementsInHeader: Story = {
  render: AdditionalElementsInHeaderExample,
};

export const Borders: Story = {
  render: BordersExample,
};

export const ColumnAlignment: Story = {
  render: ColumnAlignmentExample,
};

export const ColumnExpand: Story = {
  render: ColumnExpandExample,
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

export const CustomViewForTableBody: Story = {
  render: CustomViewForTableBodyExample,
};

export const CustomizingHeader: Story = {
  render: CustomizingHeaderExample,
};

export const DownloadStatus: Story = {
  render: DownloadStatusExample,
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

export const FixedHeaderWithSpinOverlay: Story = {
  render: FixedHeaderWithSpinOverlayExample,
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

export const ScrollInTable: Story = {
  render: ScrollInTableExample,
};

export const SecondaryTable: Story = {
  render: SecondaryTableExample,
};

export const SkeletonInTable: Story = {
  render: SkeletonInTableExample,
};

export const Sorting: Story = {
  render: SortingExample,
};

export const SortingChangingSize: Story = {
  render: SortingChangingSizeExample,
};

export const SortingChangingSizeByColumns: Story = {
  render: SortingChangingSizeByColumnsExample,
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