import { DTRow } from './Row.types';
import { DTUse } from '../DataTable/DataTable.types';
import { DTColumn, CommonColumnType } from '../Head/Column.types';

export type DataTableCellProps = CommonColumnType & {
  name: string;
  row: DTRow;
  columnIndex: number;
  column: DTColumn;
  rowIndex: number;
  gridArea?: string;
};

export type CellPropsInner = {
  use: DTUse;
};
