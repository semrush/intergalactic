import type { Intergalactic } from '@semcore/core';
import type * as React from 'react';

import type { DataTableCellProps, Theme } from './Cell.types';
import type { DTRow, RowPropsInner } from './Row.types';
import type { ACCORDION } from '../DataTable/DataTable';
import type { DataRowItem, DTUse, VirtualScroll, DataTableProps, DataTableData } from '../DataTable/DataTable.types';
import type { DTColumn } from '../Head/Column.types';

export type CellRenderProps<Data extends DataRowItem, UniqKeyType> = {
  /** The column key for the cell data */
  dataKey: string;
  /** The complete row data object */
  row: DTRow<UniqKeyType>;
  /** The column configuration object */
  column: DTColumn;
  /** Zero-based row index in the table */
  rowIndex: number;
  /** Zero-based column index in the table */
  columnIndex: number;
  /** The name/key of the column */
  columnName: string | typeof ACCORDION;
  /** Cell value */
  value: string | React.ReactElement;
  /** Function that returns the default cell rendering */
  defaultRender: () => React.ReactNode;
  /** Indicates if this cell spans multiple rows */
  isMergedRows: boolean;
  /** Indicates if this cell spans multiple columns */
  isMergedColumns: boolean;
  /** The original unprocessed row data */
  rawData: Data;
  /** Flag to show is the cell is in the accordion row */
  isAccordionRow: boolean;
  /** Zero-based accordion row index */
  accordionRowIndex?: number;
};

export type DataTableBodyProps<Data extends DataTableData, UniqKeyType> = {
  renderCell?: (
    props: CellRenderProps<Data[number], UniqKeyType>,
  ) => React.ReactNode | (Record<string, any> & { theme?: Theme });

  rowProps?: (
    row: DTRow<UniqKeyType>,
    rowIndex: number,
  ) => (Record<string, any> & { theme?: Theme }) | undefined;
};

export type BodyPropsInner<Data extends DataTableData, UniqKeyType> = DataTableBodyProps<Data, UniqKeyType> & {
  rows: Array<DTRow<UniqKeyType> | DTRow<UniqKeyType>[]>;
  flatRows: DTRow<UniqKeyType>[];
  columns: DTColumn[];
  use: DTUse;
  compact: boolean;
  gridTemplateColumns: string[];
  gridTemplateAreas: string[];
  loading?: boolean;
  headerHeight: number;
  getI18nText: (key: string) => string;
  expandedRows: Set<UniqKeyType>;
  onExpandRow: (row: DTRow<UniqKeyType>) => void;
  spinnerRef: React.RefObject<HTMLDivElement>;
  gridContainerRef: React.RefObject<HTMLDivElement>;
  tableContainerRef: React.RefObject<HTMLDivElement>;
  tableRef: React.RefObject<HTMLDivElement>;
  scrollAreaRef: React.RefObject<HTMLDivElement>;
  scrollTop: number;
  scrollDirection: 'down' | 'up';
  virtualScroll?: VirtualScroll;
  hasGroups: boolean;
  uid: string;
  rowProps?: (row: DTRow<UniqKeyType>, rowIndex: number) => Record<string, any> | undefined;
  renderCell?: (props: CellRenderProps<Data[number], UniqKeyType>) => React.ReactNode | Record<string, any>;
  onBackFromAccordion: (colName: string) => void;
  stickyHeader?: boolean;
  selectedRows?: UniqKeyType[];
  onSelectRow?: (
    isSelect: boolean,
    selectedRowIndex: number,
    row: DTRow<UniqKeyType>,
    event?: React.SyntheticEvent<HTMLElement>,
  ) => void;
  renderEmptyData: () => React.ReactNode;
  sideIndents?: 'wide';
  getFixedStyle: (
    cell: Pick<DTColumn, 'name' | 'fixed'>,
  ) => [side: 'left' | 'right', style: string | number] | [side: undefined, style: undefined];
  accordionDuration: number | [number, number];
  onCellClick: DataTableCellProps<Data, UniqKeyType>['onClick'];
  rawData: DataRowItem[];
  accordionMode?: DataTableProps<any, any, any>['accordionMode'];
  shadowVertical?: '' | 'end' | 'start' | 'median';
  renderCellOverlay?: () => React.ReactNode;
  limit?: DataTableProps<any, any, any>['limit'];
  variant?: DataTableProps<any, any, any>['variant'];
  totalRows?: number;
  accordionAnimationRows: RowPropsInner<Data, UniqKeyType>['accordionAnimationRows'];
};

export type DataTableBodyType = (<
  Data extends DataTableData,
  UniqKeyType,
  Tag extends Intergalactic.Tag = 'div',
>(
  props: Intergalactic.InternalTypings.ComponentProps<Tag, 'div', DataTableBodyProps<Data, UniqKeyType>>
) => Intergalactic.InternalTypings.ComponentRenderingResults) &
Intergalactic.InternalTypings.ComponentAdditive<'div', 'div', DataTableBodyProps<any, any>>;
