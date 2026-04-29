import { DataTable } from '@semcore/ui/data-table';
import type { Meta, StoryObj } from '@storybook/react-vite';
import React from 'react';

import CardFlagInCellExample from './examples/cells-tests/card-flag-in-cell';
import CheckboxExample, { defaultProps as checkboxReactiveProps } from './examples/cells-tests/checkbox';
import type { DemoProps as CheckboxReactiveProps } from './examples/cells-tests/checkbox';
import CheckboxInTableWithNoDataExample, { defaultProps as checkboxNoDataProps } from './examples/cells-tests/checkbox-in-table-with-no-data';
import type { DemoProps as CheckboxNoDataProps } from './examples/cells-tests/checkbox-in-table-with-no-data';
import DDSelectInCellExample from './examples/cells-tests/dd-select-in-cell';
import InteractiveCellsExample from './examples/cells-tests/interactive-elements-in-cells';
import LongTextCellsExample from './examples/cells-tests/long-text-in-cells';
import MergedRowColumnWithFixedExample, { mergedRowColumnWithFixedProps, type MergedRowColumnWithFixedProps } from './examples/cells-tests/merged-row-column-with-fixed';
import MergedRowForMultiLevelHeaderExample, { mergedRowForMultiLevelHeaderProps, type DemoProps as MergedRowForMultiLevelHeaderProps } from './examples/cells-tests/merged-row-for-multi-level-header';
import MiniChartsInlineEditInCellsExample from './examples/cells-tests/mini-chart-inline-edit-in-cell';
import OneBigMergedRowAndScrollExample from './examples/cells-tests/one-big-merged-row-and-scroll';
import OneMergedCellExample from './examples/cells-tests/one-merged-cell';
import SelectableWithMergedRowsColumnsExample, { selectableWithMergedRowsProps } from './examples/cells-tests/selectable_with_merged_rows-cells';
import type { SelectableWithMergedRowsProps } from './examples/cells-tests/selectable_with_merged_rows-cells';
const meta: Meta<typeof DataTable> = {
  title: 'Components/DataTable/Tests/Cells',
  component: DataTable,
};
export default meta;
type Story = StoryObj<typeof DataTable>;
export const SelectableWithMergedRowsColumns: StoryObj<SelectableWithMergedRowsProps> = {
  render: SelectableWithMergedRowsColumnsExample,
  argTypes: {
    headerLevels: {
      control: { type: 'radio' },
      options: [1, 2],
      description: 'Number of header levels (1 = single level, 2 = multi-level header)',
    },
    withBorders: {
      control: 'boolean',
      description: 'Show borders around the grouped columns in multi-level header',
    },
  },
  args: selectableWithMergedRowsProps,
};
export const CardFlagInCell: Story = {
  render: CardFlagInCellExample,
};
export const CheckboxInTableWithNoData: StoryObj<CheckboxNoDataProps> = {
  render: CheckboxInTableWithNoDataExample,
  argTypes: {
    reactive: {
      control: 'boolean',
      description: 'Use SelectableRows (reactive) instead of array',
    },
  },
  args: checkboxNoDataProps,
};
export const Checkbox: StoryObj<CheckboxReactiveProps> = {
  render: CheckboxExample as any,
  argTypes: {
    fixedColumns: {
      control: 'boolean',
      description: 'Enable fixed left/right columns with horizontal scroll',
    },
  },
  args: checkboxReactiveProps,
};
export const MergedRowForMultiLevelHeader: StoryObj<MergedRowForMultiLevelHeaderProps> = {
  render: MergedRowForMultiLevelHeaderExample,
  args: mergedRowForMultiLevelHeaderProps,
  argTypes: {
    showAdditionalColumn: {
      control: 'boolean',
      description: 'Show additional column at the end of the table',
    },
  },
};
export const MiniChartsInlineEditInCells: Story = {
  render: MiniChartsInlineEditInCellsExample,
};
export const OneMergedCell: Story = {
  render: OneMergedCellExample,
};
export const OneBigMergedRowAndScroll: Story = {
  render: OneBigMergedRowAndScrollExample,
};
export const DDSelectInCell: Story = {
  render: DDSelectInCellExample,
};
export const LongTextCells: Story = {
  render: LongTextCellsExample,
};
export const InteractiveCells: Story = {
  render: InteractiveCellsExample,
};
export const MergedRowColumnWithFixed: StoryObj<MergedRowColumnWithFixedProps> = {
  render: MergedRowColumnWithFixedExample,
  args: {
    ...mergedRowColumnWithFixedProps,
  },
  argTypes: {
    rowsCount: {
      control: { type: 'select' },
      options: [2, 5, 10],
      description: 'Number of child rows in ROW_GROUP',
    },
    columnsCount: {
      control: { type: 'select' },
      options: [2, 3, 4],
      description: 'Number of merged columns',
    },
    withBorders: {
      control: 'boolean',
      description: 'Add borders to grouped columns',
    },
    headerLevels: {
      control: { type: 'select' },
      options: [1, 2],
      description: 'level of column headers',
    },
    showLastRows: {
      control: 'boolean',
      description: 'Show last two rows without grouping',
    },
    lastRowsPosition: {
      control: { type: 'select' },
      options: ['top', 'bottom', 'both'],
      description: 'Position of additional rows (top, bottom, or both)',
    },
    showRightColumn: {
      control: 'boolean',
      description: 'Show column on the right',
    },
    fixedColumns: {
      control: 'boolean',
      description: 'Enable fixed columns (left and right)',
    },
  },
};
