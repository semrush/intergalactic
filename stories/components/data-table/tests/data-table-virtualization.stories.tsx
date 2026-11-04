import { DataTable } from '@semcore/ui/data-table';
import type { Meta, StoryObj } from '@storybook/react-vite';

import AccordionWithChartExample, { accordionVirtualDefaultProps } from './examples/virtualization/accordion-inside-table';
import type { accordionVirtualProps } from './examples/virtualization/accordion-inside-table';
import HorizontalScrollExample, { horizontalScrollProps } from './examples/virtualization/horizontal-scroll';
import type { HorizontalScrollProps } from './examples/virtualization/horizontal-scroll';
import MultiLevelHeaderExample, { multiLevelHeaderProps } from './examples/virtualization/multi-level-header';
import type { MultiLevelHeaderProps } from './examples/virtualization/multi-level-header';
import OneLevelHeaderExample, { oneLevelHeaderProps } from './examples/virtualization/one-level-header';
import type { OneLevelHeaderProps } from './examples/virtualization/one-level-header';
import RowColumnMergeExample from './examples/virtualization/row-and-column-merging';
import TableInTableExample from './examples/virtualization/table-in-table-with-fixed-column';
import type { VirtualScrollControlsProps, VirtualScrollMode } from './examples/virtualization/virtual-scroll-controls';
import VirtualScrollControlsExample, {
  virtualScrollControlsDefaultProps,
} from './examples/virtualization/virtual-scroll-controls';

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

export const RowColumnMerge: Story = {
  render: RowColumnMergeExample,
};

export const MultiLevelHeader: StoryObj<MultiLevelHeaderProps> = {
  render: MultiLevelHeaderExample,
  args: multiLevelHeaderProps,
  argTypes: {
    header: {
      control: 'radio',
      options: ['bordersAndSorting', 'interactive'] satisfies MultiLevelHeaderProps['header'][],
      description:
        '`bordersAndSorting` - groups with left/both/right borders, sortable columns, icons in header cells. ' +
        '`interactive` - DescriptionTooltip, Checkbox and Select in header cells.',
    },
    sticky: { control: 'boolean' },
    withScrollBar: { control: 'boolean', description: 'Second horizontal scroll bar under the header.' },
    h: { control: { type: 'number', min: 100, max: 1000 }, description: 'Table height in px.' },
    defaultGridTemplateColumnWidth: { control: 'text', description: 'Empty - the value of the header variant (1fr / auto).' },
    compact: { control: 'boolean' },
    rowsCount: { control: { type: 'number', min: 1, max: 1000 }, description: 'Source rows are repeated to this count.' },
  },
};

export const OneLevelHeader: StoryObj<OneLevelHeaderProps> = {
  render: OneLevelHeaderExample,
  args: oneLevelHeaderProps,
  argTypes: {
    use: { control: 'radio', options: ['primary', 'secondary'] satisfies OneLevelHeaderProps['use'][] },
    sticky: { control: 'boolean' },
    h: { control: { type: 'number', min: 100, max: 1000 }, description: 'Table height in px.' },
    rowsCount: { control: { type: 'number', min: 1, max: 1000 }, description: 'Source rows are repeated to this count.' },
  },
};

export const HorizontalScroll: StoryObj<HorizontalScrollProps> = {
  render: HorizontalScrollExample,
  args: horizontalScrollProps,
  argTypes: {
    layout: {
      control: 'radio',
      options: ['oneLevel', 'keywordAndGroup', 'allInGroup', 'fixedGroups'] satisfies HorizontalScrollProps['layout'][],
      description:
        '`oneLevel` - one level header. ' +
        '`keywordAndGroup` - Keyword and a group of columns. ' +
        '`allInGroup` - all columns in one group. ' +
        '`fixedGroups` - groups fixed left and right.',
    },
    sticky: { control: 'boolean' },
    withScrollBar: { control: 'boolean', description: 'Second horizontal scroll bar under the header.' },
    wMax: { control: 'number', description: 'Empty - the value of the layout (200, fixedGroups - 800).' },
    h: { control: 'number', description: 'Empty - the value of the layout (no height, fixedGroups - 200).' },
    rowsCount: { control: { type: 'number', min: 1, max: 500 }, description: 'Set more rows to get a vertical scroll too.' },
  },
};

export const VirtualScrollControls: StoryObj<VirtualScrollControlsProps> = {
  render: VirtualScrollControlsExample,
  args: virtualScrollControlsDefaultProps,
  argTypes: {
    mode: {
      control: 'radio',
      options: ['boolean', 'aproxRowsOnPage', 'rowHeight', 'rowsBufferOnly'] satisfies VirtualScrollControlsProps['mode'][],
      description:
        'Selects the virtualScroll mode. ' +
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
      description:
        'Fixed row height in px (required in `rowHeight` mode). ' +
        'Mutually exclusive with `aproxRowsOnPage`. ' +
        'If `rowsBuffer` is not set, defaults to 20.',
      if: { arg: 'mode', eq: 'rowHeight' },
    },
    withAccordion: {
      control: 'boolean',
      description: 'Rows #3, #13, #23, ... get an accordion with a 300px component. Not supported in `rowHeight` mode.',
      if: { arg: 'mode', neq: 'rowHeight' },
    },
    withMergedRows: {
      control: 'boolean',
      description: 'Rows #6, #16, #26, ... become a group of 3 rows with merged ID and Keyword cells.',
      if: { arg: 'mode', neq: 'rowHeight' },
    },
    withFixedColumns: {
      control: 'boolean',
      description: 'ID and Keyword are fixed left, Vol. is fixed right; columns have different widths and the table is narrower than them.',
    },
  },
};
