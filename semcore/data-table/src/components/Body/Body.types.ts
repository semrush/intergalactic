import type { Intergalactic } from '@semcore/ui/core';
import type * as React from 'react';

import type { CellPropsInner, Theme } from './Cell.types';
import type { DTRow } from './Row.types';
import type { DTUse, VirtualScroll } from '../DataTable/DataTable.types';
import type { DTColumn } from '../Head/Column.types';

export type CellRenderProps<DataKeyType> = {
  dataKey: string;
  row: DTRow<DataKeyType>;
  column: DTColumn;
  rowIndex: number;
  columnIndex: number;
  columnName: string;
  value: string | React.ReactElement;
  defaultRender: () => React.ReactNode;
  isMergedRows: boolean;
  isMergedColumns: boolean;
};

export type DataTableBodyProps<DataKeyType> = {
  renderCell?: (
    props: CellRenderProps<DataKeyType>,
  ) => React.ReactNode | (Record<string, any> & { theme?: Theme });

  rowProps?: (
    row: DTRow<DataKeyType>,
    rowIndex: number,
  ) => (Record<string, any> & { theme?: Theme }) | undefined;
};

export type BodyPropsInner<DataKeyType> = DataTableBodyProps<DataKeyType> & {
  rows: Array<DTRow<DataKeyType> | DTRow<DataKeyType>[]>;
  flatRows: DTRow<DataKeyType>[];
  columns: DTColumn[];
  use: DTUse;
  compact: boolean;
  gridTemplateColumns: string[];
  gridTemplateAreas: string[];
  loading?: boolean;
  headerHeight: number;
  getI18nText: (key: string) => string;
  expandedRows: Set<DataKeyType>;
  onExpandRow: (row: DTRow<DataKeyType>) => void;
  spinnerRef: React.RefObject<HTMLDivElement>;
  tableContainerRef: React.RefObject<HTMLDivElement>;
  tableRef: React.RefObject<HTMLDivElement>;
  scrollAreaRef: React.RefObject<HTMLDivElement>;
  scrollTop: number;
  scrollDirection: 'down' | 'up';
  virtualScroll?: VirtualScroll;
  hasGroups: boolean;
  uid: string;
  rowProps?: (row: DTRow<DataKeyType>, rowIndex: number) => Record<string, any> | undefined;
  renderCell?: (props: CellRenderProps<DataKeyType>) => React.ReactNode | Record<string, any>;
  onBackFromAccordion: (colIndex: number) => void;
  stickyHeader?: boolean;
  selectedRows?: DataKeyType[];
  onSelectRow?: (
    isSelect: boolean,
    selectedRowIndex: number,
    row: DTRow<DataKeyType>,
    event?: React.SyntheticEvent<HTMLElement>,
  ) => void;
  renderEmptyData: () => React.ReactNode;
  sideIndents?: 'wide';
  getFixedStyle: (
    cell: Pick<DTColumn, 'name' | 'fixed'>,
  ) => [side: 'left' | 'right', style: string | number] | [side: undefined, style: undefined];
  accordionDuration?: number | [number, number];
  onCellClick: CellPropsInner<DataKeyType>['onClick'];
};

export type DataTableBodyType = (<
  DataKeyType,
  Tag extends Intergalactic.Tag = 'div',
>(
  props: Intergalactic.InternalTypings.ComponentProps<Tag, 'div', DataTableBodyProps<DataKeyType>>
) => Intergalactic.InternalTypings.ComponentRenderingResults) &
Intergalactic.InternalTypings.ComponentAdditive<'div', 'div', DataTableBodyProps<any>>;
