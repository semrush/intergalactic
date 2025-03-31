import { DTValue, DTKey, DTUse } from '../DataTable/DataTable.types';
import { DTColumn } from '../Head/Column.types';
import { MergedColumnsCell, MergedRowsCell } from './MergedCells';

export type DTRow = Record<DTKey, DTValue | MergedRowsCell | MergedColumnsCell>;

export type DataTableRowProps = {
  columns: DTColumn[];
  row: DTRow;
  rows: DTRow[];
  rowIndex: number;
  headerRows: number;

  expandedRows?: number[];

  onExpandRow?: (expandedRowIndex: number) => void;
};

export type RowPropsInner = {
  use: DTUse;
  /**
   * Expanded flag for rows with accordion
   * @default false
   */
  expanded?: boolean;

  gridTemplateAreas: string;
  gridTemplateColumns: string;
  accordionDataGridArea: string;
};
