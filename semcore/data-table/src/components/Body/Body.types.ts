import { DTRow, DTRows } from './Row.types';
import { DTColumn } from '../Head/Column.types';
import { DTUse, DTValue } from '../DataTable/DataTable.types';

type CellRenderProps = {
  dataKey: string;
  row: DTRow;
  column: DTColumn;
  rowIndex: number;
  columnIndex: number;
  columnName: string;
  value: string;
  defaultRender: () => React.ReactNode;
  isMergedRows: boolean;
  isMergedColumns: boolean;
};

export type DataTableBodyProps = {
  renderCell?: (props: CellRenderProps) => React.ReactNode | Record<string, any>;

  virtualScroll?: boolean | { rowHeight: number };
};

export type BodyPropsInner = {
  rows: DTRows;
  flatRows: DTRow[];
  columns: DTColumn[];
  use: DTUse;
  compact: boolean;
  gridTemplateColumns: string[];
  gridTemplateAreas: string[];
  loading?: boolean;
  headerHeight: number;
  getI18nText: (key: string) => string;
  expandedRows: number[];
  onExpandRow: (rowIndex: number) => void;
  spinnerRef: React.RefObject<HTMLDivElement>;
  tableContainerRef: React.RefObject<HTMLDivElement>;
  scrollTop: number;
};
