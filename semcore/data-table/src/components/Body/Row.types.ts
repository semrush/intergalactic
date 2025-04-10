import { DTValue, DTKey, DTUse } from '../DataTable/DataTable.types';
import { DTColumn } from '../Head/Column.types';
import { MergedColumnsCell, MergedRowsCell } from './MergedCells';

export type DTRow = Record<DTKey, DTValue | MergedRowsCell | MergedColumnsCell>;
export type DTRows = Array<DTRow | DTRow[]>;

export type DataTableRowProps = {
  row: DTRow;
};

export type RowPropsInner = {
  use: DTUse;
  /**
   * Expanded flag for rows with accordion
   * @default false
   */
  expanded?: boolean;

  columns: DTColumn[];
  row: DTRow | DTRow[];
  rows: DTRows;
  flatRows: DTRow[];
  rowIndex: number; // from 0
  ariaRowIndex: number; // from 1 + 1 header

  expandedRows: number[];
  onExpandRow: (expandedRowIndex: number) => void;

  gridTemplateAreas: string[];
  gridTemplateColumns: string[];
  accordionDataGridArea: string;

  inert?: '';
};
