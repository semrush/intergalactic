import { Flex } from '@semcore/ui/base-components';
import Button from '@semcore/ui/button';
import type { CellRenderProps, DataTableSort } from '@semcore/ui/data-table';
import { DataTable } from '@semcore/ui/data-table';
import { Text } from '@semcore/ui/typography';
import { NoData } from '@semcore/ui/widget-empty';
import React from 'react';

import { data } from './data';

function rowMatchesNameQuery(row: Record<string, unknown>, query: string): boolean {
  const q = query.trim().toLowerCase();
  if (!q) {
    return true;
  }
  for (const [, value] of Object.entries(row)) {
    if (value == null) {
      continue;
    }
    if (typeof value === 'object') {
      continue;
    }
    if (String(value).toLowerCase().includes(q)) {
      return true;
    }
  }
  return false;
}

const BIG_TABLE_ROW_THEMES: Array<'success' | 'warning' | 'danger' | 'info' | 'muted'> = [
  'success',
  'warning',
  'danger',
  'info',
  'muted',
];

const TABLE_LIMIT: NonNullable<React.ComponentProps<typeof DataTable>['limit']> = {
  fromRow: 5,
  fromColumn: 3,
  renderOverlay() {
    return (
      <Flex alignItems='center' direction='column' gap={3} py={6} wMax={320} style={{ textWrap: 'balance' }}>
        <Text size={300} fontWeight='bold' textAlign='center' id='limited_rows_title'>
          You've reached your report limit for today
        </Text>
        <Text size={200} textAlign='center' id='limited_rows_description'>
          To increase your daily report limit, upgrade to a Guru plan.
        </Text>
        <Button
          theme='success'
          use='primary'
          aria-describedby='limited_rows_title limited_rows_description'
        >
          Upgrade to Guru
        </Button>
      </Flex>
    );
  },
};

export type TableDemoState = 'default' | 'limited';

export type AccordionInTableProps = {
  loading: boolean;
  hintProps?: false;
  cropPosition?: 'end' | 'middle';
};

type Props = {
  loading: boolean;
  currentPage: number;
  columns: any[];
  CellRenderer: (props: CellRenderProps<any, any>) => { p?: number; children?: React.ReactNode };
  variant?: React.ComponentProps<typeof DataTable>['variant'];
  demoState?: TableDemoState;
  nameSearchQuery?: string;
};

const Demo = (props: Props) => {
  const demoState = props.demoState ?? 'default';
  const tableData = React.useMemo(() => {
    const rows = data(props.currentPage);
    const q = props.nameSearchQuery?.trim() ?? '';
    if (!q) {
      return rows;
    }
    return rows.filter((row) => rowMatchesNameQuery(row as Record<string, unknown>, q));
  }, [props.currentPage, props.nameSearchQuery]);

  const [sort, setSort] = React.useState<DataTableSort<any>>(['payment_status', 'desc']);
  const sortedData = React.useMemo(
    () =>
      [...tableData].sort((aRow, bRow) => {
        const [prop, sortDirection] = sort;

        const aRaw = aRow[prop as keyof typeof aRow];
        const bRaw = bRow[prop as keyof typeof bRow];
        const a = prop === 'amount_base' ? Number(aRaw ?? 0) : (aRaw ?? '');
        const b = prop === 'amount_base' ? Number(bRaw ?? 0) : (bRaw ?? '');
        if (a === b) return 0;
        if (sortDirection === 'asc') return a > b ? 1 : -1;
        else return a > b ? -1 : 1;
      }),
    [sort, tableData],
  );

  const loading = props.loading;
  const showEmptySearch = Boolean(props.nameSearchQuery?.trim()) && sortedData.length === 0;

  return (
    <DataTable
      variant={props.variant}
      loading={loading}
      data={sortedData}
      sideIndents='wide'
      aria-label='Accordion inside table'
      w='100%'
      defaultGridTemplateColumnWidth='1fr'
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
      rowProps={(_row, rowIndex) => {
        const theme = BIG_TABLE_ROW_THEMES[rowIndex];
        return theme ? { theme } : {};
      }}
      {...(showEmptySearch
        ? {
            renderEmptyData: () => (
              <NoData type='nothing-found' my={7} mx='auto' />
            ),
          }
        : {})}
      {...(demoState === 'limited' ? { limit: TABLE_LIMIT } : {})}
    />
  );
};

export default Demo;
