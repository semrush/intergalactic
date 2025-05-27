import { DTValue, DTUse, DataTableData } from '../DataTable/DataTable.types';
import { DTColumn } from '../Head/Column.types';
import { MergedColumnsCell, MergedRowsCell } from './MergedCells';
import { ACCORDION, ROW_GROUP, ROW_INDEX, UNIQ_ROW_KEY } from '../DataTable/DataTable';
import { DataTableCellProps } from './Cell.types';

export type UniqRowKey = string;

export type DTRow = {
  [UNIQ_ROW_KEY]: UniqRowKey;
  [ROW_INDEX]: number;
  [key: string]: DTValue | MergedRowsCell | MergedColumnsCell;
  [ACCORDION]?: React.ReactNode | DataTableData | undefined;
  [ROW_GROUP]?: Set<UniqRowKey>;
};
export type DTRows = Array<DTRow | DTRow[]>;

export type DataTableRowProps = {
  row: DTRow;
  mergedRow?: boolean;

  isAccordionRow?: DataTableCellProps['isAccordionRow'];
  animationExpand?: DataTableCellProps['animationExpand'];
  accordionRowIndex?: DataTableCellProps['accordionRowIndex'];
};

export type RowPropsInner = JSX.IntrinsicElements['div'] & {
  use: DTUse;
  /**
   * Expanded flag for rows with accordion
   * @default false
   */
  expanded?: boolean;

  /**
   * Flag to show is row in a merged list or not.
   */
  mergedRow?: boolean;

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

  selectedRows?: number[];
  onSelectRow?: (
    isSelect: boolean,
    selectedRowIndex: number,
    row: DTRow,
    event?: React.SyntheticEvent<HTMLElement>,
  ) => void;

  inert?: '';

  accordionDuration?: number | [number, number];
  onBackFromAccordion: (colIndex: number) => void;

  scrollAreaRef: React.RefObject<HTMLDivElement>;
  uid: string;
  sideIndents?: 'wide';
  getFixedStyle: (
    cell: Pick<DTColumn, 'name' | 'fixed'>,
  ) => [side: 'left' | 'right', style: string | number] | [side: undefined, style: undefined];
};
