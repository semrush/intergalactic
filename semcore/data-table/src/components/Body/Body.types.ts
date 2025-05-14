import { DTRow } from './Row.types';
import { DTColumn } from '../Head/Column.types';
import { DTUse, VirtualScroll } from '../DataTable/DataTable.types';

export type CellRenderProps = {
  dataKey: string;
  row: DTRow;
  column: DTColumn;
  rowIndex: number;
  columnIndex: number;
  columnName: string;
  value: string | React.ReactElement;
  defaultRender: () => React.ReactNode;
  isMergedRows: boolean;
  isMergedColumns: boolean;
};

export type DataTableBodyProps = {
  renderCell?: (props: CellRenderProps) => React.ReactNode | Record<string, any>;
};

export type BodyPropsInner = {
  rows: Array<DTRow | DTRow[]>;
  flatRows: DTRow[];
  columns: DTColumn[];
  use: DTUse;
  compact: boolean;
  gridTemplateColumns: string[];
  gridTemplateAreas: string[];
  loading?: boolean;
  headerHeight: number;
  getI18nText: (key: string) => string;
  expandedRows: Set<string>;
  onExpandRow: (row: DTRow) => void;
  spinnerRef: React.RefObject<HTMLDivElement>;
  tableContainerRef: React.RefObject<HTMLDivElement>;
  tableRef: React.RefObject<HTMLDivElement>;
  scrollAreaRef: React.RefObject<HTMLDivElement>;
  scrollTop: number;
  scrollDirection: 'down' | 'up';
  virtualScroll?: VirtualScroll;
  hasGroups: boolean;
  uid: string;
  rowProps?: (row: DTRow, rowIndex: number) => Record<string, any> | undefined;
  renderCell?: (props: CellRenderProps) => React.ReactNode | Record<string, any>;
  onBackFromAccordion: (colIndex: number) => void;
  stickyHeader?: boolean;
  renderEmptyData: () => React.ReactNode;
  sideIndents?: 'l';
};
