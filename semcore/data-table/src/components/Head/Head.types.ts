import type { DTColumn } from './Column.types';
import type { BodyPropsInner } from '../Body/Body.types';
import type { CellPropsInner } from '../Body/Cell.types';
import type { DTRow } from '../Body/Row.types';
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

  /** Animation duration for a top property. When it's set adds animation for top changes */
  animationDuration?: number;

  /** Outer ref for the header */
  ref?: React.Ref<HTMLDivElement>;
};

export type HeadPropsInner<
  Data extends DataTableData,
  UniqKey extends keyof Data[number],
  UniqKeyType extends Data[number][UniqKey],
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
  onChangeSelectAll?: (value: boolean, event?: React.SyntheticEvent<HTMLElement>) => void;
  flatRows: DTRow<UniqKeyType>[];

  getFixedStyle: (
    cell: Pick<DTColumn, 'name' | 'fixed'>,
  ) => [side: 'left' | 'right', style: string | number] | [side: undefined, style: undefined];
  onCellClick: CellPropsInner<UniqKeyType>['onClick'];
  shadowVertical?: BodyPropsInner<UniqKeyType>['shadowVertical'];
  lastLeftFixedIndex: number;
  firstRightFixedIndex: number;
};
