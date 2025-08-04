import type { Intergalactic } from '@semcore/core';
import type * as React from 'react';

import type { CellPropsInner, Theme } from './Cell.types';
import type { DTRow } from './Row.types';
import type { ACCORDION } from '../DataTable/DataTable';
import type { DataRowItem, DTUse, VirtualScroll, DataTableProps } from '../DataTable/DataTable.types';
import type { DTColumn } from '../Head/Column.types';

export type CellRenderProps<UniqKeyType> = {
  dataKey: string;
  row: DTRow<UniqKeyType>;
  column: DTColumn;
  rowIndex: number;
  columnIndex: number;
  columnName: string | typeof ACCORDION;
  value: string | React.ReactElement;
  defaultRender: () => React.ReactNode;
  isMergedRows: boolean;
  isMergedColumns: boolean;
  rawData: DataRowItem;
};

export type DataTableBodyProps<UniqKeyType> = {
  renderCell?: (
    props: CellRenderProps<UniqKeyType>,
  ) => React.ReactNode | (Record<string, any> & { theme?: Theme });

  rowProps?: (
    row: DTRow<UniqKeyType>,
    rowIndex: number,
  ) => (Record<string, any> & { theme?: Theme }) | undefined;
};

export type BodyPropsInner<UniqKeyType> = DataTableBodyProps<UniqKeyType> & {
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
  tableContainerRef: React.RefObject<HTMLDivElement>;
  tableRef: React.RefObject<HTMLDivElement>;
  scrollAreaRef: React.RefObject<HTMLDivElement>;
  scrollTop: number;
  scrollDirection: 'down' | 'up';
  virtualScroll?: VirtualScroll;
  hasGroups: boolean;
  uid: string;
  rowProps?: (row: DTRow<UniqKeyType>, rowIndex: number) => Record<string, any> | undefined;
  renderCell?: (props: CellRenderProps<UniqKeyType>) => React.ReactNode | Record<string, any>;
  onBackFromAccordion: (colIndex: number) => void;
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
  accordionDuration?: DataTableProps<any, any, any>['accordionDuration'];
  onCellClick: CellPropsInner<UniqKeyType>['onClick'];
  rawData: DataRowItem[];
  accordionMode?: DataTableProps<any, any, any>['accordionMode'];
  shadowVertical?: '' | 'end' | 'start' | 'median';
  lastLeftFixedIndex: number;
  firstRightFixedIndex: number;
};

export type DataTableBodyType = (<
  UniqKeyType,
  Tag extends Intergalactic.Tag = 'div',
>(
  props: Intergalactic.InternalTypings.ComponentProps<Tag, 'div', DataTableBodyProps<UniqKeyType>>
) => Intergalactic.InternalTypings.ComponentRenderingResults) &
Intergalactic.InternalTypings.ComponentAdditive<'div', 'div', DataTableBodyProps<any>>;
