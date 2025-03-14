import { DTUse } from '../DataTable/DataTable.types';

export type DTColumn = {
  name: string;
  ref: React.RefObject<HTMLDivElement>;
  /**
   * Width for grid-template-columns
   */
  gridColumnWidth: string;

  fixed: 'left' | 'right';
};

export type DataTableColumnProps = {
  /**
   * Value for grid-template-columns for current column
   */
  gtcWidth?: string;

  fixed?: 'left' | 'right';
};

export type ColumnPropsInner = {
  use: DTUse;
};
