import { BoxProps } from '@semcore/base-components';
import { DTRow } from './Row.types';
import { DTUse } from '../DataTable/DataTable.types';

export type DataTableCellProps = BoxProps & {
  row: DTRow;
  columnIndex: number;

  /**
   * Inner
   */
  fixed?: 'left' | 'right';
};

export type CellPropsInner = {
  use: DTUse;
};
