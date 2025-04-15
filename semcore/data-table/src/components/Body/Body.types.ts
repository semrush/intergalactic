import { DTRow, DTRows } from './Row.types';
import { DTColumn } from '../Head/Column.types';
import { DTUse, VirtualScroll } from '../DataTable/DataTable.types';

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
  scrollDirection: 'down' | 'up';
  tableRef: React.RefObject<HTMLDivElement>;
  headerRef: React.RefObject<HTMLDivElement>;
  virtualScroll?: VirtualScroll;
  hasGroups: boolean;
};
