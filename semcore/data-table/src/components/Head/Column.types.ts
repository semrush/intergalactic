import {
  ColumnGroupConfig,
  ColumnItemConfig,
  DataTableData,
  DataTableProps,
  DTUse,
  SortDirection,
} from '../DataTable/DataTable.types';
import type { Property } from 'csstype';

export type CommonColumnType = {
  /**
   * Name of column for mapping with data
   */
  name: string;
  /**
   * Flag to define column as sortable
   */
  sortable?: boolean | SortDirection;
  /**
   * Fixes column to some side of table
   */
  fixed?: 'left' | 'right';
  /**
   * Adds vertical border(s)
   */
  borders?: 'both' | 'left' | 'right';
  /**
   * It manages the `flex-wrap` property
   */
  flexWrap?: boolean;
  /**
   * It manages the `align-items` property
   */
  alignItems?: Property.AlignItems;
  /**
   * It manages the `align-content` property
   */
  alignContent?: Property.AlignContent;
  /**
   * CSS `justify-content` property
   */
  justifyContent?: Property.JustifyContent;
};

export type DTColumn = ColumnItemConfig &
  CommonColumnType & {
    /**
     * Width for grid-template-columns
     */
    gtcWidth: string;

    parent?: DTColumn | ColumnGroupConfig;

    columns?: DTColumn[];
    children?: React.ReactNode | React.FC;

    gridArea?: string;
  };

export type DataTableColumnProps = CommonColumnType & {
  /**
   * Value for grid-template-columns for current column
   */
  gtcWidth?: string;

  /**
   * Flag for change column size if sorted by it
   */
  changeSortSize?: boolean;
};

export type ColumnPropsInner<D extends DataTableData> = {
  use: DTUse;
  borders?: 'both' | 'left' | 'right';
  sort?: DataTableProps<D>['sort'];
  onSortChange?: DataTableProps<D>['onSortChange'];
  uid: string;
  parent?: DTColumn;
  sortableColumnDescribeId: string;
  columnIndex: number;
  tableRef: React.RefObject<HTMLElement>;
  gridTemplateColumns: string[];
  gridTemplateAreas: string[];
  sticky: boolean;
};
