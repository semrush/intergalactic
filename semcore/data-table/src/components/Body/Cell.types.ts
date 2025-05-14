import { DTRow } from './Row.types';
import { DTUse } from '../DataTable/DataTable.types';
import { DTColumn } from '../Head/Column.types';

export type Theme = 'muted' | 'info' | 'success' | 'warning' | 'danger';

export type DataTableCellProps = {
  row: DTRow;
  rowIndex: number;
  column: DTColumn;
  columnIndex: number;
  gridRowIndex: number;
  children?: React.ReactNode;
};

export type CellPropsInner = {
  use: DTUse;

  virtualScroll: boolean;
  tableRef: React.RefObject<HTMLDivElement>;
};
