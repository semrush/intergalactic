import type { ReactElement } from 'react';

import type { DataTableColumnProps, DTColumn } from './Column.types';
import type { DataTableProps, DTUse } from '../DataTable/DataTable.types';

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
  withConfig: boolean;
  sort?: DataTableProps<any, any, any>['sort'];
};
