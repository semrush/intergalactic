import React from 'react';
import { PropGetterFn } from '@semcore/core';
import { IBoxProps, IFlexProps } from '@semcore/flex-box';

/* utils type */
type CProps<Props, Ctx = {}, UCProps = {}> = Props & {
  children?: ((props: Props & Ctx, handlers: UCProps) => React.ReactNode) | React.ReactNode;
};
type ReturnEl = React.ReactElement | null;
/* utils type */

type ChildRenderFn<Props> = Props & {
  children?: (props: Props, column: DataTableData, index: number) => { [key: string]: unknown };
};

export type DataTableData = { [key: string]: unknown };
export type DataTableSort = [string, 'desc' | 'asc'];
export type DataTableTheme = 'muted' | 'info' | 'success' | 'warning' | 'danger';
export type DataTableUse = 'primary' | 'secondary';
export type DataTableRow = DataTableCell[];
export type DataTableCell = {
  /** Name of column */
  name: string;
  /** Data of column */
  data: React.ReactNode;
  [key: string]: unknown;
};

export interface IDataTableProps extends IBoxProps {
  /** Theme for table
   * @default primary
   * */
  use?: DataTableUse;
  /** Data for table */
  data?: DataTableData[];
  /** Active sort object */
  sort?: DataTableSort;
  /** Handler call when will request change sort */
  onSortChange?: (sort: DataTableSort, e?: React.SyntheticEvent) => void;
}

export interface IDataTableHeadProps extends IBoxProps {
  /** Sticky header table
   * @deprecated
   * */
  sticky?: boolean;

  /** Hidden header */
  hidden?: boolean;
}

export interface IDataTableColumnProps extends IFlexProps {
  /** Unique name column */
  name?: string;
  /** Enable sort for column also if you pass string you can set default sort */
  sortable?: boolean | 'desc' | 'asc';
  /** Enable resize for column
   * @ignore */
  resizable?: boolean;
  /** Fixed column on the left/right */
  fixed?: 'left' | 'right';
}

export interface IDataTableBodyProps extends IBoxProps {
  /** Rows table */
  rows?: DataTableRow[];
}

export interface IDataTableRowProps extends IBoxProps {
  /** Theme for row */
  theme?: DataTableTheme;
  /** Displays row as active/hover */
  active?: boolean;
}

export interface IDataTableCellProps extends IFlexProps {
  /** Unique name column or columns separated by / */
  name: string;
  /** Theme for cell */
  theme?: DataTableTheme;
}

interface IDataTableCtx {
  getHeadProps: PropGetterFn;
  getBodyProps: PropGetterFn;
}

declare const ROW_GROUP: unique symbol;

declare const DataTable: (<T>(props: CProps<IDataTableProps & T, IDataTableCtx>) => ReturnEl) & {
  Head: <T>(props: IDataTableHeadProps & T) => ReturnEl;
  Body: <T>(props: IDataTableBodyProps & T) => ReturnEl;
  Column: <T>(props: IDataTableColumnProps & T) => ReturnEl;
  Cell: <T>(props: ChildRenderFn<IDataTableCellProps & T>) => ReturnEl;
  Row: <T>(props: ChildRenderFn<IDataTableRowProps & T>) => ReturnEl;
};

export { ROW_GROUP };
export default DataTable;
