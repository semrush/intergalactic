import { DTValue, DTUse, DataTableData } from '../DataTable/DataTable.types';
import { DTColumn } from '../Head/Column.types';
import { MergedColumnsCell, MergedRowsCell } from './MergedCells';
import { ACCORDION, ROW_INDEX, UNIQ_ROW_KEY } from '../DataTable/DataTable';

export type DTRow = {
  [UNIQ_ROW_KEY]: string;
  [ROW_INDEX]: number;
  [key: string]: DTValue | MergedRowsCell | MergedColumnsCell;
  [ACCORDION]?: React.ReactNode | DataTableData | undefined;
};
export type DTRows = Array<DTRow | DTRow[]>;

export type DataTableRowProps = {
  row: DTRow;
  offset?: number;
};

export type RowPropsInner = JSX.IntrinsicElements['div'] & {
  use: DTUse;
  /**
   * Expanded flag for rows with accordion
   * @default false
   */
  expanded?: boolean;

  columns: DTColumn[];
  row: DTRow | DTRow[];
  rows: DTRows;
  rowIndex: number; // from 0
  ariaRowIndex: number; // from 1 + 1 header
  gridRowIndex: number; // from 1 + 1 (or 2 if it has group) header

  expandedRows: Set<string>;
  onExpandRow: (expandedRow: DTRow) => void;

  gridTemplateAreas: string[];
  gridTemplateColumns: string[];
  accordionDataGridArea: string;

  inert?: '';

  onBackFromAccordion: (colIndex: number) => void;

  scrollAreaRef: React.RefObject<HTMLDivElement>;
  uid: string;
  sideIndents?: 'l';
};
