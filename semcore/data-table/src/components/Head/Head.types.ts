import { DataTableData, DataTableProps, DTUse } from '../DataTable/DataTable.types';
import { DTColumn } from './Column.types';

export type DataTableHeadProps = {
  /**
   * Sticky header
   * @default false
   */
  sticky?: boolean;

  /** Enable scroll bar element in header */
  withScrollBar?: boolean;
};

export type HeadPropsInner = {
  use: DTUse;
  tableRef: React.RefObject<HTMLElement>;
  columns: DTColumn[];
  compact: boolean;
  sort?: DataTableProps['sort'];
  onSortChange?: DataTableProps['onSortChange'];
  getI18nText: (key: string) => string;
  uid: string;
  ref: React.RefObject<HTMLDivElement>;

  gridAreaGroupMap: Map<number, string>;
};
