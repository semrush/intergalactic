import { DTUse } from '../DataTable/DataTable.types';
import { ReactElement } from 'react';
import { DataTableColumnProps } from './Column.types';

export type DataTableGroupProps = {
  title: string;

  borders?: 'both' | 'left' | 'right';

  fixed?: 'left' | 'right';

  children: Array<ReactElement<DataTableColumnProps>>;
};

export type GroupPropsInner = {
  use: DTUse;
  fixedColumnsMap: Map<string, any>;
};
