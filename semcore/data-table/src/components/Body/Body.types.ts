import { DTRow, DTRows } from './Row.types';
import { DTColumn } from '../Head/Column.types';
import { DataTableData, DTUse, VirtualScroll } from '../DataTable/DataTable.types';

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

export type BodyPropsInner<D extends DataTableData> = {
  data: D;
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
  renderCell?: (props: CellRenderProps) => React.ReactNode | Record<string, any>;
  selectedRows?: number[];
  onSelectRow?: (
    isSelect: boolean,
    selectedRowIndex: number,
    row: DTRow,
    event?: React.SyntheticEvent<HTMLInputElement>,
  ) => void;
};
