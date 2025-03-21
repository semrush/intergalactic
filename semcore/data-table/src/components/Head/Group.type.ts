import { DTUse } from '../DataTable/DataTable.types';

export type DataTableGroupProps = {
  title: string;

  borders?: 'both' | 'left' | 'right';

  fixed?: 'left' | 'right';
};

export type GroupPropsInner = {
  use: DTUse;
};
