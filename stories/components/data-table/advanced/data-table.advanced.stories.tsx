import { DataTable } from '@semcore/ui/data-table';
import type { Meta, StoryObj, ArgTypes } from '@storybook/react-vite';

import AccordionInMergedRowsExample, { accordionMergedProps } from './examples/accordion_in_merged_rows';
import type { AccordionWithCheckboxProps } from './examples/accordion_with_checkbox';
import AccordionWithCheckboxExample, { accordionWithCheckboxProps } from './examples/accordion_with_checkbox';
import AccordionWithManyRowsExample, { accordionTableInTableDefaultProps } from './examples/accordion_with_many_rows';
import AccordionWithPaginationExample, { tableInTableDefaultProps } from './examples/accordion_with_pagination';
import type { TableInTableProps } from './examples/accordion_with_pagination';
import AccordionWithStickyRowsExample, { accordionStickyProps } from './examples/accordion_with_sticky_rows';
import BigTableWithStickyHeaderExample from './examples/big_table_with_sticky_header';
import CheckboxInBigTableReactiveExample, { defaultProps as checkboxInBigReactiveTableDefaultProps } from './examples/checkbox_in_big_table_reactive';
import FakeMultiLineHeaderExample from './examples/fake-multi-level-header';
import FixedColumnsWidthWithShadowsExample from './examples/fixed_columns_width_with_shadows';
import FixedColumnsWithDiffWidthsExample from './examples/fixed_columns_with_diff_widths';
import LinkInTableExample from './examples/link_in_table';
import OverflowInCellsExample from './examples/overflow_in_cells';
import OverlapCellsExample from './examples/overlap_cells';
import RenderCellInAccordionExample from './examples/render_cell_in_accordion';
import RenderCellRawValueExample from './examples/render_cell_raw_data';
import RowCellStatesExample from './examples/row_cell_states';
import SelectableWithMergedRowsExample, { defaultProps as selectableWithMergedRowsDefaultProps } from './examples/selectable_with_merged_rows';
import type { DemoProps as SelectableWithMergedRowsProps } from './examples/selectable_with_merged_rows';
import SideIndentsExample from './examples/side-indents';
import type { AccordionInTableProps } from './examples/table_perf/table_perf';
import TablePerfExample, { accordionInsideTableDefaultProps } from './examples/table_perf/table_perf';
import VirtualScrollWithH100Example from './examples/virtual-scroll-with-h100';

const meta: Meta<typeof DataTable> = {
  title: 'Components/DataTable/Advanced',
  component: DataTable,
};

const checkboxArgTypes: Partial<ArgTypes<typeof checkboxInBigReactiveTableDefaultProps>> = {
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
  variant: {
    control: 'select',
    options: [undefined, 'default', 'card'],
    defaultValue: undefined,
  },
  limitSelectedRows: {
    control: 'boolean',
    defaultValue: false,
  },
  maxAvailableSelectedRows: {
    control: 'number',
    defaultValue: 3,
    if: { arg: 'limitSelectedRows', truthy: true },
  },
};

export default meta;
type Story = StoryObj<typeof DataTable>;

export const AccordionInMergedRows: StoryObj<typeof accordionMergedProps> = {
  render: AccordionInMergedRowsExample,
  argTypes: {
    loading: { control: 'boolean' },
  },
  args: accordionMergedProps,
};

export const AccordionWithCheckbox: StoryObj<AccordionWithCheckboxProps> = {
  render: AccordionWithCheckboxExample,
  args: {
    ...accordionWithCheckboxProps,
  },
};

export const AccordionWithManyRows: StoryObj<typeof accordionTableInTableDefaultProps> = {
  render: AccordionWithManyRowsExample,
  argTypes: {
    cropPosition: {
      control: 'select',
      options: ['end', 'middle'],
    },
    // UIK-4923: hintProps=false skips ellipsis calculation for cropPosition=end (CSS-only),
    // but still calculates for cropPosition=middle (needs JS). No hint shown in either case.
    hintProps: {
      control: 'select',
      options: ['default', 'false'],
      mapping: {
        default: undefined,
        false: false,
      },
    },
  },
  args: {
    ...accordionTableInTableDefaultProps,
  },
};

export const AccordionWithPagination: StoryObj<TableInTableProps> = {
  render: AccordionWithPaginationExample,
  argTypes: {
    limitSelectedRows: {
      control: 'boolean',
      defaultValue: false,
    },
    maxAvailableSelectedRows: {
      control: 'number',
      defaultValue: 3,
      if: { arg: 'limitSelectedRows', truthy: true },
    },
  },
  args: {
    ...tableInTableDefaultProps,
  },
};

export const AccordionWithStickyRows: StoryObj<typeof accordionStickyProps> = {
  render: AccordionWithStickyRowsExample,
  argTypes: {
    loading: { control: 'boolean' },
  },
  args: accordionStickyProps,
};

export const BigTableWithStickyHeader: Story = {
  render: BigTableWithStickyHeaderExample,
};

export const CheckboxInBigTableReactive: StoryObj<typeof checkboxInBigReactiveTableDefaultProps> = {
  render: CheckboxInBigTableReactiveExample,
  argTypes: checkboxArgTypes,
  args: checkboxInBigReactiveTableDefaultProps,
};

export const FixedColumnsWithDiffWidths: Story = {
  render: FixedColumnsWithDiffWidthsExample,
};

export const LinkInTable: Story = {
  render: LinkInTableExample,
};

export const VirtualScrollWithH100: Story = {
  render: VirtualScrollWithH100Example,
};

export const RowCellStates: Story = {
  render: RowCellStatesExample,
};

export const SelectableWithMergedRows: StoryObj<SelectableWithMergedRowsProps> = {
  render: SelectableWithMergedRowsExample,
  argTypes: {
    reactive: { control: 'boolean' },
    loading: { control: 'boolean' },
    sideIndents: {
      control: 'select',
      options: [undefined, 'wide'],
    },
    compact: {
      control: 'radio',
      options: [undefined, true, false],
    },
  },
  args: selectableWithMergedRowsDefaultProps,
};

export const SideIndents: Story = {
  render: SideIndentsExample,
};

export const OverflowInCells: Story = {
  render: OverflowInCellsExample,
};

export const OverlapCells: Story = {
  render: OverlapCellsExample,
};

export const FakeMultiLineHeader: Story = {
  render: FakeMultiLineHeaderExample,
};

export const RenderCellRawValue: Story = {
  render: RenderCellRawValueExample,
};

export const RenderCellInAccordion: Story = {
  render: RenderCellInAccordionExample,
};

export const FixedColumnsWidthWithShadows: Story = {
  render: FixedColumnsWidthWithShadowsExample,
};

export const TablePerf: StoryObj<AccordionInTableProps> = {
  render: TablePerfExample,
  argTypes: {
    loading: { control: 'boolean' },
    cropPosition: {
      control: 'select',
      options: ['end', 'middle'],
    },
    // UIK-4923: hintProps=false skips ellipsis JS calculation for cropPosition=end
    hintProps: {
      control: 'select',
      options: ['default', 'false'],
      mapping: {
        default: undefined,
        false: false,
      },
    },
  },
  args: accordionInsideTableDefaultProps,
};
