import type { CellRenderProps, DataTableSort, SelectableRows } from '@semcore/ui/data-table';
import { DataTable } from '@semcore/ui/data-table';
import React from 'react';

import { data } from './data';

export type AccordionInTableProps = {
  loading: boolean;
  hintProps?: false;
  cropPosition?: 'end' | 'middle';
};

type Props = {
  loading: boolean;
  currentPage: number;
  selectedRows: SelectableRows<string>;
  columns: any[];
  CellRenderer: (props: CellRenderProps<any, any>) => { p?: number; children?: React.ReactNode };
  variant?: React.ComponentProps<typeof DataTable>['variant'];
};

const Demo = (props: Props) => {
  const tableData = data(props.currentPage);

  const [sort, setSort] = React.useState<DataTableSort<keyof typeof tableData[0]>>(['payment_status', 'desc']);
  const sortedData = React.useMemo(
    () =>
      [...tableData].sort((aRow, bRow) => {
        const [prop, sortDirection] = sort;

        const aRaw = aRow[prop];
        const bRaw = bRow[prop];
        const a = prop === 'amount_base' ? Number(aRaw ?? 0) : (aRaw ?? '');
        const b = prop === 'amount_base' ? Number(bRaw ?? 0) : (bRaw ?? '');
        if (a === b) return 0;
        if (sortDirection === 'asc') return a > b ? 1 : -1;
        else return a > b ? -1 : 1;
      }),
    [sort],
  );

  return (
    <DataTable
      variant={props.variant}
      loading={props.loading}
      data={sortedData}
      aria-label='Accordion inside table'
      w='100%'
      defaultGridTemplateColumnWidth='1fr'
      selectedRows={props.selectedRows}
      headerProps={{
        sticky: true,
        top: 0,
        withScrollBar: true,
      }}
      uniqueRowKey='payment_intent_id'
      columns={props.columns}
      renderCell={props.CellRenderer}
      sort={sort}
      onSortChange={setSort}
    />
  );
};

export default Demo;
