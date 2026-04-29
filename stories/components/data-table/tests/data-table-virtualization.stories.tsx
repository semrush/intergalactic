import { DataTable } from '@semcore/ui/data-table';
import type { Meta, StoryObj } from '@storybook/react-vite';

import AccordionWithChartExample, { accordionVirtualDefaultProps } from './examples/virtualization/accordion-inside-table';
import type { accordionVirtualProps } from './examples/virtualization/accordion-inside-table';
import DDSelectInCellExample from './examples/virtualization/dd-select-in-cell';
import FixedColumnDiffWidthExample from './examples/virtualization/fixed-column-with-d-ff-width';
import HeaderContentExample from './examples/virtualization/header-content';
import HorizontalScrollWithoutFixedExample from './examples/virtualization/horizontal-scroll';
import FixedGroupExample from './examples/virtualization/horizontal-scroll-fixed-group';
import InteractiveCellsExample from './examples/virtualization/interactive-elements-in-cells';
import LoadingScrollExample from './examples/virtualization/loading-in-scroll';
import MultiLevelExample from './examples/virtualization/multi-level-header';
import MultiLevelSortingExample from './examples/virtualization/multi-level-sorting';
import MultiLevelInteractiveExample from './examples/virtualization/multi-level-with-interactive';
import MultipleScrollsExample from './examples/virtualization/multiple-scrolls';
import PerformExample from './examples/virtualization/performmance-tooltips-ellipsis-test';
import RowColumnMergeExample from './examples/virtualization/row-and-column-merging';
import SecondarySortingExample from './examples/virtualization/secondary-sorting';
import TableInTableExample from './examples/virtualization/table-in-table-with-fixed-column';
import InteractiveHeaderExample from './examples/virtualization/table-with-1tf-and diff-elements';
import type { VirtualScrollControlsProps, VirtualScrollMode } from './examples/virtualization/virtual-scroll-controls';
import VirtualScrollControlsExample, { virtualScrollControlsDefaultProps } from './examples/virtualization/virtual-scroll-controls';
const meta: Meta<typeof DataTable> = {
  title: 'Components/DataTable/Tests/Virtualization',
  component: DataTable,
};
export default meta;
type Story = StoryObj<typeof DataTable>;
export const AccordionWithChart: StoryObj<accordionVirtualProps> = {
  render: AccordionWithChartExample,
  args: {
    ...accordionVirtualDefaultProps,
  },
};
export const TableInTable: Story = {
  render: TableInTableExample,
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
export const VirtualScrollControls: StoryObj<VirtualScrollControlsProps> = {
  render: VirtualScrollControlsExample,
  args: virtualScrollControlsDefaultProps,
  argTypes: {
    mode: {
      control: 'radio',
      options: ['boolean', 'aproxRowsOnPage', 'rowHeight', 'rowsBufferOnly'] satisfies VirtualScrollControlsProps['mode'][],
      description: 'Selects the virtualScroll mode. ' +
        '`boolean` - true, default buffers. ' +
        '`aproxRowsOnPage` - auto row height, configurable buffer + page estimate. ' +
        '`rowHeight` - fixed row height, configurable buffer + page estimate ' +
        '`rowsBufferOnly` - only rowsBuffer set, no rowHeight, no aproxRowsOnPage (uses defaults for page estimate).',
    },
    useCustomBuffer: {
      control: 'boolean',
      description: 'When false — rowsBuffer is omitted, component uses default (20).',
      if: { arg: 'mode', neq: 'boolean' },
    },
    rowsBuffer: {
      control: { type: 'number', min: 1, max: 100 },
      description: 'Pre-rendered rows above/below viewport. Only applied when `useCustomBuffer` is true.',
      if: { arg: 'useCustomBuffer', truthy: true },
    },
    aproxRowsOnPage: {
      control: { type: 'number', min: 1, max: 100 },
      description: 'Estimated rows per page for scroll position calculation. Only used in `aproxRowsOnPage` mode.',
      if: { arg: 'mode', eq: 'aproxRowsOnPage' },
    },
    rowHeight: {
      control: { type: 'number', min: 20, max: 200 },
      description: 'Fixed row height in px (required in `rowHeight` mode). ' +
        'Mutually exclusive with `aproxRowsOnPage`. ' +
        'If `rowsBuffer` is not set, defaults to 20.',
      if: { arg: 'mode', eq: 'rowHeight' },
    },
  },
};
