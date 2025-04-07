import { DTRow } from './Row.types';
import { DTColumn } from '../Head/Column.types';
import { DTUse } from '../DataTable/DataTable.types';

type CellRenderProps = {
  name: string;
  row: DTRow;
  column: DTColumn;
  rowIndex: number;
  columnIndex: number;
  value: string | number | boolean;
  defaultRender: () => React.ReactNode;
  isMergedRows: boolean;
  isMergedColumns: boolean;
};

export type DataTableBodyProps = {
  // rows: DTRow[];
  // columns: DTColumn[];

  renderCell?: (props: CellRenderProps) => React.ReactNode;

  expandedRows?: number[];

  virtualScroll?: boolean;
};

export type BodyPropsInner = {
  rows: DTRow[];
  columns: DTColumn[];
  use: DTUse;
  headerRows: number;
  compact: boolean;
  gridTemplateColumns: string[];
  gridTemplateAreas: string[];
  loading?: boolean;
  headerHeight: number;
  getI18nText: (key: string) => string;
};
