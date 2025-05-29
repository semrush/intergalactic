import type { DTUse } from '../DataTable/DataTable.types';
import type { ReactElement } from 'react';
import type { DataTableColumnProps, DTColumn } from './Column.types';

export type DataTableGroupProps = {
  title: React.ReactNode;

  borders?: 'both' | 'left' | 'right';

  fixed?: 'left' | 'right';

  children: Array<ReactElement<DataTableColumnProps>>;

  name?: string;
  columns?: DTColumn[];
};

export type GroupPropsInner = {
  use: DTUse;
  fixedColumnsMap: Map<string, any>;
  withConfig: boolean;
};
