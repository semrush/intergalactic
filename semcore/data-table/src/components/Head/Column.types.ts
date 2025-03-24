import { DataTableProps, DTUse } from '../DataTable/DataTable.types';
import { Property } from 'csstype';

export type CommonColumnType = {
  /**
   * Name of column for mapping with data
   */
  name: string;
  /**
   * Flag to define column as sortable
   */
  sortable?: boolean;
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

export type DTColumn = CommonColumnType & {
  ref: React.RefCallback<HTMLElement> & { current: HTMLElement | null };
  /**
   * Width for grid-template-columns
   */
  gridColumnWidth: string;

  /**
   * Width of column by getBoundaryRect() value
   */
  calculatedWidth: number;
  /**
   * Height of column by getBoundaryRect() value
   */
  calculatedHeight: number;

  parent?: DTColumn;
  // children?: Array<Omit<DTColumn[], 'children'>>;
};

export type DataTableColumnProps = CommonColumnType & {
  /**
   * Value for grid-template-columns for current column
   */
  gtcWidth?: string;
};

export type ColumnPropsInner = {
  use: DTUse;
  borders?: 'both' | 'left' | 'right';
  sort?: DataTableProps['sort'];
  onSortChange?: DataTableProps['onSortChange'];
  uid: string;
  parent?: DTColumn;
  sortableColumnDescribeId: string;
};
