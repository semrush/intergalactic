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

export const AccordionInsideTable: Story = {
  render: AccordionInsideTableExample,
};
