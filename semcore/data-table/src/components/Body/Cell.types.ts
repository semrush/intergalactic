import { BoxProps } from '@semcore/base-components';
import { DTRow } from './Row.types';

export type DataTableCellProps = BoxProps & {
  row: DTRow;
  columnIndex: number;
};
