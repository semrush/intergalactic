import type { Intergalactic } from '@semcore/core';
import type React from 'react';

import { MergedRowsCell, MergedColumnsCell } from './components/Body/MergedCells';
import { DataTable, ACCORDION, ROW_GROUP } from './components/DataTable/DataTable';
import type {
  DataTableSort,
  DataTableType,
  DataTableData,
  DataTableProps,
  DataTableChangeSort,
  ColumnGroupConfig,
  ColumnItemConfig,
} from './components/DataTable/DataTable.types';

const wrapDataTable = <PropsExtending extends {}>(
  wrapper: (
    props: Intergalactic.InternalTypings.UntypeRefAndTag<
      Intergalactic.InternalTypings.ComponentPropsNesting<DataTableType>
    > &
    PropsExtending,
  ) => React.ReactNode,
): DataTableType => wrapper as any;

export {
  MergedRowsCell,
  MergedColumnsCell,
  DataTable,
  ACCORDION,
  ROW_GROUP,
  wrapDataTable,
};
export type {
  DataTableSort,
  DataTableData,
  DataTableProps,
  DataTableChangeSort,
  ColumnGroupConfig,
  ColumnItemConfig,
};
