import type { ColumnPropsInner, DTColumn } from './Column.types';
import type { BodyPropsInner } from '../Body/Body.types';
import type { DataTableCellProps } from '../Body/Cell.types';
import type { DTRow } from '../Body/Row.types';
import type { ROW_GROUP } from '../DataTable/DataTable';
import type { DataTableData, DataTableProps, DTUse } from '../DataTable/DataTable.types';

export type DataTableHeadProps = {
  /**
   * Use Head as separate sticky container with display grid and calculation widths form body columns.
   * @default undefined
   */
  use?: 'sticky';
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

  /** Animation duration for a top property. When it's set adds animation for top changes */
  animationDuration?: number;

  /** Outer ref for the header */
  ref?: React.Ref<HTMLDivElement>;
};

export type HeadPropsInner<
  Data extends DataTableData,
  UniqKey extends (Data[number] extends { [ROW_GROUP]: DataTableData } ? keyof Data[number][typeof ROW_GROUP][number] : keyof Data[number]),
  UniqKeyType extends (Data[number] extends { [ROW_GROUP]: DataTableData } ? Data[number][typeof ROW_GROUP][number][UniqKey] : Data[number][UniqKey]),
> = {
  use: DTUse;
  tableRef: React.RefObject<HTMLElement>;
  columns: DTColumn[];
  treeColumns: DTColumn[];
  compact: boolean;
  sort?: DataTableProps<Data, UniqKey, UniqKeyType>['sort'];
  onSortChange?: DataTableProps<Data, UniqKey, UniqKeyType>['onSortChange'];
  getI18nText: (key: string) => string;
  uid: string;
  ref: React.Ref<HTMLDivElement>;

  gridAreaGroupMap: Map<number, string>;
  gridTemplateColumns: string[];
  gridTemplateAreas: string[];
  sideIndents?: 'wide';

  totalRows: number;
  selectedRows?: UniqKeyType[];
  onChangeSelectAll?: (selectedRows: UniqKeyType[], event?: React.SyntheticEvent<HTMLElement>) => void;
  flatRows: DTRow<UniqKeyType>[];

  getFixedStyle: (
    cell: Pick<DTColumn, 'name' | 'fixed'>,
  ) => [side: 'left' | 'right', style: string | number] | [side: undefined, style: undefined];
  onCellClick: DataTableCellProps<Data, UniqKeyType>['onClick'];
  shadowVertical?: BodyPropsInner<Data, UniqKeyType>['shadowVertical'];
  scrollDirection?: ColumnPropsInner<Data, UniqKey, UniqKeyType>['scrollDirection'];
  isDataEmpty: boolean;
};
