import type { Intergalactic } from '@semcore/core';
import type React from 'react';

import type { CellRenderProps } from './components/Body/Body.types';
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
import { LinkAction } from './components/LinkAction/LinkAction.tsx';
import { SelectableRows } from './store/SelectableRows';

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
  SelectableRows,
  LinkAction,
};
export type {
  DataTableSort,
  DataTableData,
  DataTableProps,
  DataTableChangeSort,
  ColumnGroupConfig,
  ColumnItemConfig,
  CellRenderProps,
};
