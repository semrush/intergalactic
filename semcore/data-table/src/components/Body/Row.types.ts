import { DTValue, DTKey, DTUse } from '../DataTable/DataTable.types';
import { DTColumn } from '../Head/Column.types';

export type DTRow = Record<DTKey, DTValue | [DTValue, number]>;

export type DataTableRowProps = {
  columns: DTColumn[];
  row: DTRow;
  rows: DTRow[];
  rowIndex: number;
  headerRows: number;
};

export type RowPropsInner = {
  use: DTUse;
};
