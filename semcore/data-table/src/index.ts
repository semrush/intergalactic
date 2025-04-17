import { DataTable, ACCORDION, ROW_GROUP } from './components/DataTable/DataTable';
import type {
  DataTableSort,
  DataTableType,
  DataTableData,
} from './components/DataTable/DataTable.types';
import { Intergalactic } from '@semcore/core';
import React from 'react';

const wrapDataTable = <PropsExtending extends {}>(
  wrapper: (
    props: Intergalactic.InternalTypings.UntypeRefAndTag<
      Intergalactic.InternalTypings.ComponentPropsNesting<DataTableType>
    > &
      PropsExtending,
  ) => React.ReactNode,
): DataTableType => wrapper as any;

export { DataTable, ACCORDION, ROW_GROUP, wrapDataTable };
export type { DataTableSort, DataTableData };
