import { DataTableData, DataTableProps, DTUse } from '../DataTable/DataTable.types';
import { DTColumn } from './Column.types';

export type DataTableHeadProps = {
  /**
   * Sticky header
   * @default false
   */
  sticky?: boolean;

  /**
   * offset for sticky header
   */
  top?: number;

  /**
   * Height of header in px
   */
  h?: number;

  /** Enable scroll bar element in header */
  withScrollBar?: boolean;
};

export type HeadPropsInner<D extends DataTableData> = {
  use: DTUse;
  tableRef: React.RefObject<HTMLElement>;
  columns: DTColumn[];
  treeColumns: DTColumn[];
  compact: boolean;
  sort?: DataTableProps<D>['sort'];
  onSortChange?: DataTableProps<D>['onSortChange'];
  getI18nText: (key: string) => string;
  uid: string;
  ref: React.RefObject<HTMLDivElement>;

  gridAreaGroupMap: Map<number, string>;
  gridTemplateColumns: string[];
  gridTemplateAreas: string[];
  sideIndents?: 'wide';

  totalRows: number;
  selectedRows?: number[];
  onChangeSelectAll?: (value: boolean, event?: React.SyntheticEvent<HTMLElement>) => void;

  getFixedStyle: (
    cell: Pick<DTColumn, 'name' | 'fixed'>,
  ) => [side: 'left' | 'right', style: string | number] | [side: undefined, style: undefined];
};
