import { DTRow } from './Row.types';
import { DTColumn } from '../Column/Column.types';

export type DataTableBodyProps = {
  rows: DTRow[];
  columns: DTColumn[];
};
