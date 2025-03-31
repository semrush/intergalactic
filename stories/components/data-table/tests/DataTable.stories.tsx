
import type { Meta, StoryObj } from '@storybook/react';

import DataTable from '@semcore/data-table';

import FixedHeaderWithSpinOverlayExample from './examples/fixed-header-with-spin-overlay';
import InteractiveHeaderExample from './examples/table-with-1tf-and diff-elements';
import HeaderContentExample from './examples/header-content';
import MultiLevelSortingExample from './examples/multi-level-sorting';
import MultiLevelStickyExample from './examples/multi-level-header-sticky';
import ScrollAndStickyExample from './examples/scroll-in-table-sticky';
import HorizontalScrollWithoutFixedExample from './examples/horizontal-scroll';
import FixedColumnDiffWidthExample from './examples/fixed-column-with-d-ff-width';
import FixedGroupExample from './examples/horizontal-scroll-fixed-group';
import MultipleScrollsExample from './examples/multiple-scrolls';
import RowColumnMergeExample from './examples/row-and-column-merging';
import InteractiveCellsExample from './examples/interactive-elements-in-cells';
import DDSelectInCellExample from './examples/dd-select-in-cell';
import MultiLevelInteractiveExample from './examples/multi-level-with-interactive';
import LongTextCellsExample from './examples/long-text-in-cells';
import LoadingScrollExample from './examples/loading-in-scroll';
import LoadingPaginationExample from './examples/loading-in-pagination';
import SecondarySortingExample from './examples/secondary-sorting';
import SecondaryHeaderExample from './examples/secondary-header';
import MultiLevelExample from './examples/multi-level-header';
import ColumnAlignmentExample from './examples/column-alignment';

const meta: Meta<typeof DataTable> = {
  title: 'Components/DataTable/Tests',
  component: DataTable,
};

export default meta;
type Story = StoryObj<typeof DataTable>;

export const SecondaryHeader: Story = {
  render: SecondaryHeaderExample,
};

export const SecondarySorting: Story = {
  render: SecondarySortingExample,
};

export const DDSelectInCell: Story = {
  render: DDSelectInCellExample,
};

export const LoadingPagination: Story = {
  render: LoadingPaginationExample,
};

export const LoadingScroll: Story = {
  render: LoadingScrollExample,
};

export const LongTextCells: Story = {
  render: LongTextCellsExample,
};

export const MultiLevelInteractive: Story = {
  render: MultiLevelInteractiveExample,
};

export const InteractiveCells: Story = {
  render: InteractiveCellsExample,
};

export const RowColumnMerge: Story = {
  render: RowColumnMergeExample,
};

export const FixedColumnDiffWidth: Story = {
  render: FixedColumnDiffWidthExample,
};

export const FixedGroup: Story = {
  render: FixedGroupExample,
};

export const InteractiveHeader: Story = {
  render: InteractiveHeaderExample,
};


export const HeaderContent: Story = {
  render: HeaderContentExample,
};

export const MultiLevelSorting: Story = {
  render: MultiLevelSortingExample,
};

export const MultiLevelSticky: Story = {
  render: MultiLevelStickyExample,
};

export const ScrollSticky: Story = {
  render: ScrollAndStickyExample,
};

export const MultipleScrolls: Story = {
  render: MultipleScrollsExample,
};

export const HorizontalScrollWithoutFixed: Story = {
  render: HorizontalScrollWithoutFixedExample,
};

export const FixedHeaderWithSpinOverlay: Story = {
  render: FixedHeaderWithSpinOverlayExample,
};

export const ColumnAlignment: Story = {
  render: ColumnAlignmentExample,
};


export const MultiLevelBorders: Story = {
  render: MultiLevelExample,
};

