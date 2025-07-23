import type { Intergalactic } from '@semcore/ui/core';

import type { DataTableCellProps } from './Cell.types';
import type { MergedColumnsCell, MergedRowsCell } from './MergedCells';
import type { ACCORDION, ROW_GROUP, ROW_INDEX, UNIQ_ROW_KEY } from '../DataTable/DataTable';
import type { DTValue, DTUse, DataTableData } from '../DataTable/DataTable.types';
import type { DTColumn } from '../Head/Column.types';

export type DTRow<UniqKeyType> = {
  [UNIQ_ROW_KEY]: UniqKeyType;
  [ROW_INDEX]: number;
  [key: string]: DTValue | MergedRowsCell | MergedColumnsCell;
  [ACCORDION]?: React.ReactNode | DataTableData | undefined;
  [ROW_GROUP]?: Set<UniqKeyType>;
};
export type DTRows<UniqKeyType> = Array<DTRow<UniqKeyType> | DTRow<UniqKeyType>[]>;

export type DataTableRowProps<UniqKeyType> = {
  row: DTRow<UniqKeyType>;
  mergedRow?: boolean;

  isAccordionRow?: DataTableCellProps<UniqKeyType>['isAccordionRow'];
  animationExpand?: DataTableCellProps<UniqKeyType>['animationExpand'];
  accordionRowIndex?: DataTableCellProps<UniqKeyType>['accordionRowIndex'];
  isNonInteractive?: boolean;
};

export type RowPropsInner<UniqKeyType> = JSX.IntrinsicElements['div'] & {
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
  row: DTRow<UniqKeyType> | DTRow<UniqKeyType>[];
  rows: DTRows<UniqKeyType>;
  rowIndex: number; // from 0
  ariaRowIndex: number; // from 1 + 1 header
  gridRowIndex: number; // from 1 + 1 (or 2 if it has group) header

  expandedRows: Set<UniqKeyType>;
  onExpandRow: (expandedRow: DTRow<UniqKeyType>) => void;

  gridTemplateAreas: string[];
  gridTemplateColumns: string[];
  accordionDataGridArea: string;

  selectedRows?: UniqKeyType[];
  onSelectRow?: (
    isSelect: boolean,
    selectedRowIndex: number,
    row: DTRow<UniqKeyType>,
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

export type DataTableRowType = (<UniqKeyType, Tag extends Intergalactic.Tag = 'div'>(
  props: Intergalactic.InternalTypings.ComponentProps<Tag, 'div', DataTableRowProps<UniqKeyType>>
) => Intergalactic.InternalTypings.ComponentRenderingResults) &
Intergalactic.InternalTypings.ComponentAdditive<'div', 'div', DataTableRowProps<any>>;
