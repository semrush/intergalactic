
import type { Meta, StoryObj } from '@storybook/react';

import { DataTable } from '@semcore/data-table';

import InteractiveHeaderExample from './virtualization/table-with-1tf-and diff-elements';
import HeaderContentExample from './virtualization/header-content';
import MultiLevelSortingExample from './virtualization/multi-level-sorting';

import HorizontalScrollWithoutFixedExample from './virtualization/horizontal-scroll';
import FixedColumnDiffWidthExample from './virtualization/fixed-column-with-d-ff-width';
import FixedGroupExample from './virtualization/horizontal-scroll-fixed-group';
import MultipleScrollsExample from './virtualization/multiple-scrolls';
import RowColumnMergeExample from './virtualization/row-and-column-merging';
import InteractiveCellsExample from './virtualization/interactive-elements-in-cells';
import DDSelectInCellExample from './virtualization/dd-select-in-cell';
import MultiLevelInteractiveExample from './virtualization/multi-level-with-interactive';
import AccordionWithChartExample from './virtualization/accordion-inside-table';

import LoadingScrollExample from './virtualization/loading-in-scroll';

import SecondarySortingExample from './virtualization/secondary-sorting';
import SecondaryHeaderExample from './virtualization/secondary-header';
import MultiLevelExample from './virtualization/multi-level-header';

import PerformExample from './virtualization/performmance-tooltips-ellipsis-test';

const meta: Meta<typeof DataTable> = {
  title: 'Components/DataTable/Virtual',
  component: DataTable,
};

export default meta;
type Story = StoryObj<typeof DataTable>;

export const SecondaryHeader: Story = {
  render: SecondaryHeaderExample,
};

export const AccordionWithChart: Story = {
  render: AccordionWithChartExample,
};

export const Perform: Story = {
  render: PerformExample,
};

export const SecondarySorting: Story = {
  render: SecondarySortingExample,
};

export const DDSelectInCell: Story = {
  render: DDSelectInCellExample,
};


export const LoadingScroll: Story = {
  render: LoadingScrollExample,
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


export const MultipleScrolls: Story = {
  render: MultipleScrollsExample,
};

export const HorizontalScrollWithoutFixed: Story = {
  render: HorizontalScrollWithoutFixedExample,
};


export const MultiLevelBorders: Story = {
  render: MultiLevelExample,
};

