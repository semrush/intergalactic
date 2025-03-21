import { BoxProps } from '@semcore/base-components';
import { DTRow } from './Row.types';
import { DTUse } from '../DataTable/DataTable.types';
import { DTColumn } from '../Head/Column.types';

export type DataTableCellProps = BoxProps & {
  name: string;
  row: DTRow;
  columnIndex: number;
  column: DTColumn;
  rowIndex: number;
  borders?: 'both' | 'left' | 'right';

  /**
   * Inner
   */
  fixed?: 'left' | 'right';
};

export type CellPropsInner = {
  use: DTUse;
};
