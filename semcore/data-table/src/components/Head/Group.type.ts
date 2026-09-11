import type { ReactElement } from 'react';

import type { DataTableColumnProps, DTColumn } from './Column.types';
import type { BodyPropsInner } from '../Body/Body.types';
import type { ROW_GROUP } from '../DataTable/DataTable';
import type { DataTableData, DataTableProps, DTUse } from '../DataTable/DataTable.types';

export type DataTableGroupProps = {
  title: React.ReactNode;

  borders?: 'both' | 'left' | 'right';

  fixed?: 'left' | 'right';

  children: Array<ReactElement<DataTableColumnProps>>;

  name?: string;
  columns?: DTColumn[];
};

export type GroupPropsInner<
  Data extends DataTableData,
  UniqKey extends (Data[number] extends { [ROW_GROUP]: DataTableData } ? keyof Data[number][typeof ROW_GROUP][number] : keyof Data[number]),
  UniqKeyType extends (Data[number] extends { [ROW_GROUP]: DataTableData } ? Data[number][typeof ROW_GROUP][number][UniqKey] : Data[number][UniqKey]),
> = {
  use: DTUse;
  withConfig: boolean;
  getFixedStyle: (
    cell: Pick<DTColumn, 'name' | 'fixed'>,
  ) => [side: 'left' | 'right', style: string | number] | [side: undefined, style: undefined];
  shadowVertical?: BodyPropsInner<any, any>['shadowVertical'];
  sort?: DataTableProps<Data, UniqKey, UniqKeyType>['sort'];
};
