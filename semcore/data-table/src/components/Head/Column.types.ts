import { DTUse } from '../DataTable/DataTable.types';
import { Property } from 'csstype';

export type CommonColumnType = {
  name: string;
  fixed?: 'left' | 'right';
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
}

export type DTColumn = CommonColumnType & {

  ref: React.RefObject<HTMLElement>;
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

  parent?: any;
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
};
