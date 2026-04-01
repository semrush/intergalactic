import type { Intergalactic } from '@semcore/core';
import type * as React from 'react';

import type { CellRenderProps } from './Body.types';
import type { DataTableCellProps, Theme } from './Cell.types';
import type { MergedColumnsCell, MergedRowsCell } from './MergedCells';
import type { RowRoot } from './Row';
import type { ISelectedRows } from '../../store/SelectableRows';
import type {
  ACCORDION,
  GRID_ROW_INDEX,
  IS_EMPTY_DATA_ROW,
  ROW_GROUP,
  ROW_INDEX,
  UNIQ_ROW_KEY,
} from '../DataTable/DataTable';
import type {
  DTValue,
  DTUse,
  DataTableData,
  VirtualScroll,
  DataRowItem,
  DataTableProps,
} from '../DataTable/DataTable.types';
import type { DTColumn } from '../Head/Column.types';

export type DTRow<UniqKeyType> = {
  [UNIQ_ROW_KEY]: UniqKeyType;
  [IS_EMPTY_DATA_ROW]?: boolean;
  [GRID_ROW_INDEX]: number;
  [ROW_INDEX]: number;
  [key: string]: DTValue | MergedRowsCell | MergedColumnsCell;
  [ACCORDION]?: React.ReactNode | DTRows<UniqKeyType>;
  [ROW_GROUP]?: Set<UniqKeyType>;
};
export type DTRows<UniqKeyType> = Array<DTRow<UniqKeyType> | DTRow<UniqKeyType>[]>;

export type DataTableRowProps<Data extends DataTableData, UniqKeyType> = {
  row: DTRow<UniqKeyType>;
  mergedRow?: boolean;

  isAccordionRow?: boolean;
  accordionRowIndex?: DataTableCellProps<Data, UniqKeyType>['accordionRowIndex'];
  isNonInteractive?: boolean;

  componentRef?: (component: RowRoot<Data, UniqKeyType> | null) => void;

  accordionIndex?: number;

  theme?: Theme;
};

export type RowPropsInner<Data extends DataTableData, UniqKeyType> = JSX.IntrinsicElements['div'] & {
  use: DTUse;
  /**
   * Flag to show is row in a merged list or not.
   */
  mergedRow?: boolean;

  columns: DTColumn[];
  row: DTRow<UniqKeyType> | DTRow<UniqKeyType>[];
  rows: DTRows<UniqKeyType>;
  flatRows: DTRow<UniqKeyType>[];
  rowIndex: number; // from 0
  gridRowIndex: number; // from 1 + 1 (or 2 if it has group) header

  onExpandRow: (expandedRow: DTRow<UniqKeyType>) => void;

  gridTemplateAreas: string[];
  gridTemplateColumns: string[];

  selectedRows?: UniqKeyType[] | ISelectedRows<UniqKeyType>;
  onSelectRow?: (
    isSelect: boolean,
    selectedRowIndex: number,
    row: DTRow<UniqKeyType>,
    event?: React.SyntheticEvent<HTMLElement>,
  ) => void;

  inert?: '';

  accordionDuration: number | [number, number];
  accordionAnimationRows: number;
  onBackFromAccordion: (colName: string) => void;

  scrollAreaRef: React.RefObject<HTMLDivElement>;
  uid: string;
  sideIndents?: 'wide';
  getFixedStyle: (
    cell: Pick<DTColumn, 'name' | 'fixed'>,
  ) => [side: 'left' | 'right', style: string | number] | [side: undefined, style: undefined];

  renderCell?: (props: CellRenderProps<Data[number], UniqKeyType>) => React.ReactNode | Record<string, any>;
  getI18nText: (key: string) => string;
  virtualScroll?: VirtualScroll;
  gridContainerRef: React.RefObject<HTMLDivElement>;
  onCellClick: DataTableCellProps<Data, UniqKeyType>['onClick'];
  rawData: DataRowItem[];
  shadowVertical?: '' | 'end' | 'start' | 'median';
  expandedRows: Set<UniqKeyType>;
  accordionMode?: DataTableProps<any, any, any>['accordionMode'];
  rowsHeightMap: Map<number, [number, number, HTMLElement]>;
  setRowHeight: (index: number, row: DTRow<UniqKeyType>) => void;
  componentsMap: Map<UniqKeyType, RowRoot<Data, UniqKeyType>>;
  calculateAriaRowIndex: () => void;
  variant: DataTableProps<any, any, any>['variant'];
  limit: DataTableProps<any, any, any>['limit'];
  totalRows?: number;
  hasGroups: boolean;
};

export type DataTableRowType = (<Data extends DataTableData, UniqKeyType, Tag extends Intergalactic.Tag = 'div'>(
  props: Intergalactic.InternalTypings.ComponentProps<Tag, 'div', DataTableRowProps<Data, UniqKeyType> & Partial<RowPropsInner<Data, UniqKeyType>>>
) => Intergalactic.InternalTypings.ComponentRenderingResults) &
Intergalactic.InternalTypings.ComponentAdditive<'div', 'div', DataTableRowProps<any, any>>;
