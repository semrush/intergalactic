import { DTRow } from './Row.types';
import { DTColumn } from '../Head/Column.types';
import { DTUse } from '../DataTable/DataTable.types';

type CellRenderProps = {
  name: string;
  row: DTRow;
  column: DTColumn;
  rowIndex: number;
  columnIndex: number;
  defaultRender: () => React.ReactNode;
};

export type DataTableBodyProps = {
  // rows: DTRow[];
  // columns: DTColumn[];

  renderCell?: (props: CellRenderProps) => React.ReactNode;
};

export type BodyPropsInner = {
  rows: DTRow[];
  columns: DTColumn[];
  use: DTUse;
  scrollRef: (ref: HTMLDivElement) => void;
  headerRows: number;
  compact: boolean;
};
