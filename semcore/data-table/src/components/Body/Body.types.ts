import type * as React from 'react';

import type { CellPropsInner, Theme } from './Cell.types';
import type { DTRow, UniqRowKey } from './Row.types';
import type { DTUse, VirtualScroll } from '../DataTable/DataTable.types';
import type { DTColumn } from '../Head/Column.types';

export type CellRenderProps = {
  /** The column key for the cell data */
  dataKey: string;
  /** The complete row data object */
  row: DTRow;
  /** The column configuration object */
  column: DTColumn;
  /** Zero-based row index in the table */
  rowIndex: number;
  /** Zero-based column index in the table */
  columnIndex: number;
  /** The name/key of the column */
  columnName: string;
  /** Cell value */
  value: string | React.ReactElement;
  /** Function that returns the default cell rendering */
  defaultRender: () => React.ReactNode;
  /** Indicates if this cell spans multiple rows */
  isMergedRows: boolean;
  /** Indicates if this cell spans multiple columns */
  isMergedColumns: boolean;
};

export type DataTableBodyProps = {
  renderCell?: (
    props: CellRenderProps,
  ) => React.ReactNode | (Record<string, any> & { theme?: Theme });

  rowProps?: (
    row: DTRow,
    rowIndex: number,
  ) => (Record<string, any> & { theme?: Theme }) | undefined;
};

export type BodyPropsInner = DataTableBodyProps & {
  rows: Array<DTRow | DTRow[]>;
  flatRows: DTRow[];
  columns: DTColumn[];
  use: DTUse;
  compact: boolean;
  gridTemplateColumns: string[];
  gridTemplateAreas: string[];
  loading?: boolean;
  headerHeight: number;
  getI18nText: (key: string) => string;
  expandedRows: Set<string>;
  onExpandRow: (row: DTRow) => void;
  spinnerRef: React.RefObject<HTMLDivElement>;
  tableContainerRef: React.RefObject<HTMLDivElement>;
  tableRef: React.RefObject<HTMLDivElement>;
  scrollAreaRef: React.RefObject<HTMLDivElement>;
  scrollTop: number;
  scrollDirection: 'down' | 'up';
  virtualScroll?: VirtualScroll;
  hasGroups: boolean;
  uid: string;
  rowProps?: (row: DTRow, rowIndex: number) => Record<string, any> | undefined;
  renderCell?: (props: CellRenderProps) => React.ReactNode | Record<string, any>;
  onBackFromAccordion: (colIndex: number) => void;
  stickyHeader?: boolean;
  selectedRows?: UniqRowKey[];
  onSelectRow?: (
    isSelect: boolean,
    selectedRowIndex: number,
    row: DTRow,
    event?: React.SyntheticEvent<HTMLElement>,
  ) => void;
  renderEmptyData: () => React.ReactNode;
  sideIndents?: 'wide';
  getFixedStyle: (
    cell: Pick<DTColumn, 'name' | 'fixed'>,
  ) => [side: 'left' | 'right', style: string | number] | [side: undefined, style: undefined];
  accordionDuration?: number | [number, number];
  onCellClick: CellPropsInner['onClick'];
};
