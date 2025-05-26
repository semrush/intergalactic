import { DTRow } from './Row.types';
import { DTColumn } from '../Head/Column.types';
import { DTUse, VirtualScroll } from '../DataTable/DataTable.types';
import { Theme } from './Cell.types';

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
  renderCell?: (
    props: CellRenderProps,
  ) => React.ReactNode | (Record<string, any> & { theme?: Theme });

  rowProps?: (
    row: DTRow,
    rowIndex: number,
  ) => (Record<string, any> & { theme?: Theme }) | undefined;
};

export type BodyPropsInner = DataTableBodyProps & {
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
  selectedRows?: number[];
  onSelectRow?: (
    isSelect: boolean,
    selectedRowIndex: number,
    row: DTRow,
    event?: React.SyntheticEvent<HTMLElement>,
  ) => void;
  renderEmptyData: () => React.ReactNode;
  sideIndents?: 'wide';
  getFixedStyle: (
    cell: Pick<DTColumn, 'name' | 'fixed'>,
  ) => [side: 'left' | 'right', style: string | number] | [side: undefined, style: undefined];
  accordionDuration?: number | [number, number];
};
