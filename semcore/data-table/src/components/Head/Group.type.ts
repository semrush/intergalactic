import type { ReactElement } from 'react';

import type { DataTableColumnProps, DTColumn } from './Column.types';
import type { DTUse } from '../DataTable/DataTable.types';

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
  getFixedStyle: (
    cell: Pick<DTColumn, 'name' | 'fixed'>,
  ) => [side: 'left' | 'right', style: string | number] | [side: undefined, style: undefined];
};
