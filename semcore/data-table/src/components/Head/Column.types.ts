import type { Property } from 'csstype';
import type * as React from 'react';

import type { BodyPropsInner } from '../Body/Body.types';
import type { DataTableCellProps } from '../Body/Cell.types';
import type { ROW_GROUP } from '../DataTable/DataTable';
import type {
  ColumnGroupConfig,
  ColumnItemConfig,
  DataTableData,
  DataTableProps,
  DTUse,
  SortDirection,
} from '../DataTable/DataTable.types';

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
  /**
   * CSS `text-align` property
   */
  textAlign?: Property.TextAlign;
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

    showShadowVertical?: boolean;
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

export type ColumnPropsInner<
  Data extends DataTableData,
  UniqKey extends (Data[number] extends { [ROW_GROUP]: DataTableData } ? keyof Data[number][typeof ROW_GROUP][number] : keyof Data[number]),
  UniqKeyType extends (Data[number] extends { [ROW_GROUP]: DataTableData } ? Data[number][typeof ROW_GROUP][number][UniqKey] : Data[number][UniqKey]),
> = {
  use: DTUse;
  borders?: 'both' | 'left' | 'right';
  sort?: DataTableProps<Data, UniqKey, UniqKeyType>['sort'];
  onSortChange?: DataTableProps<Data, UniqKey, UniqKeyType>['onSortChange'];
  uid: string;
  parent?: DTColumn;
  sortableColumnDescribeId: string;
  columnIndex: number;
  tableRef: React.RefObject<HTMLElement>;
  gridTemplateColumns: string[];
  gridTemplateAreas: string[];
  sticky: boolean;
  onClick: DataTableCellProps<Data, UniqKeyType>['onClick'];
  shadowVertical?: BodyPropsInner<Data, UniqKeyType>['shadowVertical'];
  scrollDirection?: 'horizontal' | 'vertical' | 'both';
  headerNodesMap: Map<string, React.RefObject<HTMLDivElement>>;
};
