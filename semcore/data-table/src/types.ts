import React from 'react';
import { ROW_GROUP } from './DataTable';

export type PseudoChildPropsGetter = (
  props: { [propName: string]: unknown },
  rowData: { [columnName: string]: unknown },
  index: number,
) => { [propName: string]: unknown };
export type PropsLayer = {
  childrenPropsGetter?: PseudoChildPropsGetter;
  [propName: string]: unknown;
};

export type SortDirection = 'asc' | 'desc';
export type Column<
  Props extends { [propName: string]: unknown } = { [propName: string]: unknown },
> = {
  name: string;
  active: boolean;
  width: number;
  fixed?: 'left' | 'right';
  resizable?: boolean;
  sortable?: boolean | SortDirection;
  sortDirection: SortDirection;
  cssVar: string | string[];
  data?: unknown;
  props: {
    name: string;
  } & Partial<{
    onClick: (event: React.MouseEvent) => void;
    onKeyDown: (event: React.KeyboardEvent) => void;
    ref: React.RefObject<HTMLElement>;
    style: React.CSSProperties;
    fixed: 'left' | 'right';
    children: React.ReactNode[];

    resizable: boolean;
    sortable: boolean | SortDirection;
    sortDirection: SortDirection;
  }> &
    Props;
  columns: Column[];
};
export type Cell = Pick<Column, 'name' | 'cssVar' | 'fixed' | 'data'> & {
  cellPropsLayers: PropsLayer[];
};
export type RowData<
  Data extends { [columnName: string]: unknown } = { [columnName: string]: unknown },
> = Data &
  Partial<{
    name: string;
    [ROW_GROUP]: RowData[];
  }>;
export type NestedCells = (Cell | NestedCells)[] & { flatRowData?: RowData };
