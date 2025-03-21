import { DTUse } from '../DataTable/DataTable.types';

export type DTColumn = {
  name: string;
  ref: React.RefObject<HTMLElement>;
  /**
   * Width for grid-template-columns
   */
  gridColumnWidth: string;

  /**
   * Width of column by getBoundaryRect() value
   */
  calculatedWidth: number;

  fixed?: 'left' | 'right';

  parent?: any;
  children?: Array<Omit<DTColumn[], 'children'>>;
};

export type DataTableColumnProps = {
  name: string;
  /**
   * Value for grid-template-columns for current column
   */
  gtcWidth?: string;

  fixed?: 'left' | 'right';
};

export type ColumnPropsInner = {
  use: DTUse;
};
