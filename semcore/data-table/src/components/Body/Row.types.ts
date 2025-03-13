import { DTValue, DTKey } from '../DataTable/DataTable.types';
import { DTColumn } from '../Column/Column.types';

export type DTRow = Record<DTKey, DTValue>;

export type DataTableRowProps = {
  columns: DTColumn[];
  row: DTRow;
  rows: DTRow[];
  rowIndex: number;
};
