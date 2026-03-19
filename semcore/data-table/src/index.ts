import type { Intergalactic } from '@semcore/core';
import type React from 'react';

import type { CellRenderProps } from './components/Body/Body.types';
import { MergedRowsCell, MergedColumnsCell } from './components/Body/MergedCells';
import { DataTable, ACCORDION, ROW_GROUP, UNIQ_ROW_KEY } from './components/DataTable/DataTable';
import type {
  DataTableSort,
  DataTableType,
  DataTableData,
  DataTableProps,
  DataTableChangeSort,
  ColumnGroupConfig,
  ColumnItemConfig,
} from './components/DataTable/DataTable.types';
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
  /**
   * @deprecated use property `uniqueRowKey` in DataTableProps to set key of unique value in your data.
   */
  UNIQ_ROW_KEY,
  wrapDataTable,
  SelectableRows,
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
