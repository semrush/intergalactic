import React from 'react';
import { ROW_GROUP } from './DataTable';
import { Property } from 'csstype';
import { FlexProps } from '@semcore/flex-box';

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
  varWidth: string;
  setVar: boolean;
  data?: unknown;
  vBorders?: boolean;
  borderLeft?: boolean;
  borderRight?: boolean;
  props: {
    name: string;
    ref: React.RefObject<HTMLElement>;
  } & FlexProps &
    Partial<{
      flex: Property.Flex;
      onClick: (event: React.MouseEvent) => void;
      onKeyDown: (event: React.KeyboardEvent) => void;
      forwardRef: React.Ref<HTMLElement>;
      style: React.CSSProperties;
      fixed: 'left' | 'right';
      resizable: boolean;
      sortable: boolean | SortDirection;
      sortDirection: SortDirection;
      vBorders: boolean;
      borderLeft: Property.BorderLeft;
      borderRight: Property.BorderLeft;
      changeSortSize?: boolean;
      sortSizeRecalculation?: boolean;
    }> &
    Props;
  columns: Column[];
  parentColumns: Column[];
};
export type Cell = Pick<Column, 'name' | 'fixed' | 'data'> & {
  cssVar: string | string[];
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

export type RowIndex = number;
export type ColIndex = number;
