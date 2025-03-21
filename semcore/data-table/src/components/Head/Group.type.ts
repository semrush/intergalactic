import { DTUse } from '../DataTable/DataTable.types';

export type DataTableGroupProps = {
  title: string;

  fixed?: 'left' | 'right';
};

export type GroupPropsInner = {
  use: DTUse;
};
