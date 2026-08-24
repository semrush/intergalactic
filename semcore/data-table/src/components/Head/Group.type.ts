import type { ReactElement } from 'react';

import type { DataTableColumnProps, DTColumn } from './Column.types';
import type { BodyPropsInner } from '../Body/Body.types';
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
  getFixedStyle: (
    cell: Pick<DTColumn, 'name' | 'fixed'>,
  ) => [side: 'left' | 'right', style: string | number] | [side: undefined, style: undefined];
  shadowVertical?: BodyPropsInner<any, any>['shadowVertical'];
  sort?: DataTableProps<Data, UniqKey, UniqKeyType>['sort'];
};
