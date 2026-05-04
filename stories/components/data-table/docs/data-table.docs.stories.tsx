import type { DataTable } from '@semcore/ui/data-table';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { fn } from 'storybook/test';

import AccessToCellsExample from './examples/access-to-cells';
import AccessToSetOfCellsExample from './examples/access-to-set-of-cells';
import type { AccordionInTableProps } from './examples/accordion-inside-table';
import AccordionInsideTableExample, { accordionInsideTableDefaultProps } from './examples/accordion-inside-table';
import BaseExample from './examples/base';
import BordersExample from './examples/borders';
import CheckboxInTableExample, { defaultProps as CheckboxInTableProps } from './examples/checkbox-in-table';
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
import type { LimitedModeExampleProps } from './examples/limited-mode';
import LimitedModeExample, { limitedModeDefaultProps } from './examples/limited-mode';
import MultiLevelHeaderExample from './examples/multi-level-header';
import PaginationExample from './examples/pagination';
import RowThemesExample from './examples/row-themes';
import RowsMergingExample from './examples/rows-merging';
import ScrollInTableExample from './examples/scroll-in-table';
import SecondaryTableExample from './examples/secondary-table';
import SkeletonInTableExample from './examples/skeleton-in-table';
import SortingExample from './examples/sorting';
import SortingChangingSizeExample, { defaultTableProps } from './examples/sorting-changing-size';
import type { SortTableProps } from './examples/sorting-changing-size';
import SpinContainerInTableExample from './examples/spin-container-in-table';
import type { TableInTableProps } from './examples/table-in-table';
import TableInTableExample, { tableInTableDefaultProps } from './examples/table-in-table';
import TableInTableWithFixedColumnExample, { accordionTableDefaultProps } from './examples/table-in-table-with-fixed-column';
import VirtualScrollInTableExample from './examples/virtual-scroll-in-table';
import VirtualScrollInTableDifferentHeightExample from './examples/virtual-scroll-in-table-different-height';

const meta = {
  title: 'Components/DataTable/Documentation',
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

export const AccordionInsideTable: StoryObj<AccordionInTableProps> = {
  render: AccordionInsideTableExample,
  args: accordionInsideTableDefaultProps,
};

export const Borders: Story = {
  render: BordersExample,
};

export const CheckboxInTable: StoryObj<typeof CheckboxInTableProps> = {
  render: CheckboxInTableExample,
  argTypes: {
    animationDuration: {
      control: { type: 'number' },
    },
    loading: { control: 'boolean' },
    sideIndents: {
      control: 'select',
      options: [undefined, 'wide'],
      defaultValue: undefined,
    },
    compact: {
      control: 'radio',
      options: [undefined, true, false],
      defaultValue: undefined,
    },
  },
  args: CheckboxInTableProps,
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

export const SortingChangingSize: StoryObj<SortTableProps> = {
  render: SortingChangingSizeExample,
  args: defaultTableProps,
  argTypes: {
    use: {
      control: {
        type: 'select',
      },
      options: ['primary', 'secondary', undefined],
    },
  },
};

export const TableInTable: StoryObj<TableInTableProps> = {
  render: TableInTableExample,
  args: {
    ...tableInTableDefaultProps,
  },
  argTypes: {
    accordionMode: {
      control: {
        type: 'select',
      },
      options: ['toggle', 'independed', undefined],
    },
  },
};

export const TableInTableWithFixedColumn: StoryObj<AccordionInTableProps> = {
  render: TableInTableWithFixedColumnExample,
  args: accordionTableDefaultProps,
};

export const VirtualScrollInTable: Story = {
  render: VirtualScrollInTableExample,
};

export const VirtualScrollInTableDifferentHeight: Story = {
  render: VirtualScrollInTableDifferentHeightExample,
};

export const LimitedMode: StoryObj<LimitedModeExampleProps> = {
  render: LimitedModeExample,
  args: limitedModeDefaultProps,
};
