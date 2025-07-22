import type { DTColumn } from './Column.types';
import type { CellPropsInner } from '../Body/Cell.types';
import type { DataTableData, DataTableProps, DTUse } from '../DataTable/DataTable.types';

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

export type HeadPropsInner<
  Data extends DataTableData,
  DataKey extends keyof Data[number],
  DataKeyType extends Data[number][DataKey],
> = {
  use: DTUse;
  tableRef: React.RefObject<HTMLElement>;
  columns: DTColumn[];
  treeColumns: DTColumn[];
  compact: boolean;
  sort?: DataTableProps<Data, DataKey, DataKeyType>['sort'];
  onSortChange?: DataTableProps<Data, DataKey, DataKeyType>['onSortChange'];
  getI18nText: (key: string) => string;
  uid: string;
  ref: React.RefObject<HTMLDivElement>;

  gridAreaGroupMap: Map<number, string>;
  gridTemplateColumns: string[];
  gridTemplateAreas: string[];
  sideIndents?: 'wide';

  totalRows: number;
  selectedRows?: DataKeyType[];
  onChangeSelectAll?: (value: boolean, event?: React.SyntheticEvent<HTMLElement>) => void;

  getFixedStyle: (
    cell: Pick<DTColumn, 'name' | 'fixed'>,
  ) => [side: 'left' | 'right', style: string | number] | [side: undefined, style: undefined];
  onCellClick: CellPropsInner<DataKeyType>['onClick'];
};
