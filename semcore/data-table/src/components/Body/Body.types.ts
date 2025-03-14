import { DTRow } from './Row.types';
import { DTColumn } from '../Column/Column.types';
import { DTUse } from '../DataTable/DataTable.types';

export type DataTableBodyProps = {
  rows: DTRow[];
  columns: DTColumn[];
};

export type BodyPropsInner = {
  use: DTUse;
  scrollRef: (ref: HTMLDivElement) => void;
};
