import { DTRow } from './Row.types';
import { DTUse } from '../DataTable/DataTable.types';
import { DTColumn, CommonColumnType } from '../Head/Column.types';

export type DataTableCellProps = {
  row: DTRow;
  rowIndex: number;
  column: DTColumn;
  columnIndex: number;
};

export type CellPropsInner = {
  use: DTUse;
};
