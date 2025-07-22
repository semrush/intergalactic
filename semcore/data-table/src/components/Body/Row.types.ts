import type { Intergalactic } from '@semcore/ui/core';

import type { DataTableCellProps } from './Cell.types';
import type { MergedColumnsCell, MergedRowsCell } from './MergedCells';
import type { ACCORDION, ROW_GROUP, ROW_INDEX, UNIQ_ROW_KEY } from '../DataTable/DataTable';
import type { DTValue, DTUse, DataTableData } from '../DataTable/DataTable.types';
import type { DTColumn } from '../Head/Column.types';

export type DTRow<DataKeyType> = {
  [UNIQ_ROW_KEY]: DataKeyType;
  [ROW_INDEX]: number;
  [key: string]: DTValue | MergedRowsCell | MergedColumnsCell;
  [ACCORDION]?: React.ReactNode | DataTableData | undefined;
  [ROW_GROUP]?: Set<DataKeyType>;
};
export type DTRows<DataKeyType> = Array<DTRow<DataKeyType> | DTRow<DataKeyType>[]>;

export type DataTableRowProps<DataKeyType> = {
  row: DTRow<DataKeyType>;
  mergedRow?: boolean;

  isAccordionRow?: DataTableCellProps<DataKeyType>['isAccordionRow'];
  animationExpand?: DataTableCellProps<DataKeyType>['animationExpand'];
  accordionRowIndex?: DataTableCellProps<DataKeyType>['accordionRowIndex'];
  isNonInteractive?: boolean;
};

export type RowPropsInner<DataKeyType> = JSX.IntrinsicElements['div'] & {
  use: DTUse;
  /**
   * Expanded flag for rows with accordion
   * @default false
   */
  expanded?: boolean;

  /**
   * Flag to show is row in a merged list or not.
   */
  mergedRow?: boolean;

  columns: DTColumn[];
  row: DTRow<DataKeyType> | DTRow<DataKeyType>[];
  rows: DTRows<DataKeyType>;
  rowIndex: number; // from 0
  ariaRowIndex: number; // from 1 + 1 header
  gridRowIndex: number; // from 1 + 1 (or 2 if it has group) header

  expandedRows: Set<DataKeyType>;
  onExpandRow: (expandedRow: DTRow<DataKeyType>) => void;

  gridTemplateAreas: string[];
  gridTemplateColumns: string[];
  accordionDataGridArea: string;

  selectedRows?: DataKeyType[];
  onSelectRow?: (
    isSelect: boolean,
    selectedRowIndex: number,
    row: DTRow<DataKeyType>,
    event?: React.SyntheticEvent<HTMLElement>,
  ) => void;

  inert?: '';

  accordionDuration?: number | [number, number];
  onBackFromAccordion: (colIndex: number) => void;

  scrollAreaRef: React.RefObject<HTMLDivElement>;
  uid: string;
  sideIndents?: 'wide';
  getFixedStyle: (
    cell: Pick<DTColumn, 'name' | 'fixed'>,
  ) => [side: 'left' | 'right', style: string | number] | [side: undefined, style: undefined];
};

export type DataTableRowType = (<DataKeyType, Tag extends Intergalactic.Tag = 'div'>(
  props: Intergalactic.InternalTypings.ComponentProps<Tag, 'div', DataTableRowProps<DataKeyType>>
) => Intergalactic.InternalTypings.ComponentRenderingResults) &
Intergalactic.InternalTypings.ComponentAdditive<'div', 'div', DataTableRowProps<any>>;
