import { DTUse } from '../DataTable/DataTable.types';
import { DTColumn } from '../Column/Column.types';

export type DataTableHeadProps = {
  /** Enable scroll bar element in header */
  withScrollBar?: boolean;
};

export type HeadPropsInner = {
  use: DTUse;
  scrollRef: (ref: HTMLDivElement) => void;
  columns: DTColumn[];
};
