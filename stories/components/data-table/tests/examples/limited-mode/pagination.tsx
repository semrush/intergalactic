import { Flex } from '@semcore/base-components';
import Button from '@semcore/button';
import { DataTable } from '@semcore/data-table';
import Pagination from '@semcore/pagination';
import Select from '@semcore/select';
import { Text } from '@semcore/typography';
import React from 'react';

type PaginationProps = {
  rowsLimit?: number;
  columnsLimit?: number;
};

const Demo = (props: PaginationProps) => {
  const { rowsLimit, columnsLimit } = props;
  const [limit, setLimit] = React.useState(10);
  const [currentPage, setCurrentPage] = React.useState(0);
  const numberFormat = React.useMemo(() => new Intl.NumberFormat('en-US'), []);
  const currencyFormat = React.useMemo(
    () => new Intl.NumberFormat('en-US', { currency: 'USD', style: 'currency' }),
    [],
  );

  const numLim = Number(limit);
  const tableData: typeof data = [];

  let index = 0;

  for (let i = 0; i < 10; i++) {
    tableData.push(...data.map((item) => {
      index++;

      return {
        ...item,
        keyword: `${index} ${item.keyword}`,
      };
    }));
  }

  return (
    <>
      <DataTable
        data={tableData.slice(currentPage * numLim, currentPage * numLim + numLim)}
        aria-label='Pagination'
        h='auto'
        limit={{
          fromRow: rowsLimit,
          fromColumn: columnsLimit,
          renderOverlay() {
            return (
              <Flex alignItems='center' direction='column' gap={3} py={6} wMax={320}>
                <Text size={300} fontWeight='bold' textAlign='center'>You've reached your report limit for today</Text>
                <Text size={200} textAlign='center'>
                  To increase your daily report limit,upgrade to a Guru plan.
                </Text>
                <Button
                  theme='success'
                  use='primary'
                >
                  Upgrade to Guru
                </Button>

              </Flex>
            );
          },
        }}
        columns={[
          { name: 'keyword', children: 'Keyword', justifyContent: 'left' },
          {
            name: 'kd',
            children: 'KD %',
            justifyContent: 'right',
            gtcWidth: 'minmax(fit-content, 68px)',
          },
          { name: 'cpc', children: 'CPC', gtcWidth: 'minmax(fit-content, 60px)' },
          {
            name: 'vol',
            children: 'Vol.',
            gtcWidth: 'minmax(fit-content, 120px)',
            justifyContent: 'left',
          },
        ]}
        renderCell={(props) => {
          const { column, row } = props;

          if (!row) return props.defaultRender();

          const value = row[column.name];

          if (column.name === 'keyword') {
            return props.defaultRender();
          }

          if (typeof value !== 'number' || value === -1) {
            return 'n/a';
          }

          if (column.name === 'cpc') {
            return currencyFormat.format(value);
          }

          return numberFormat.format(value);
        }}
      />
      <Flex gap={4} mt={4}>
        <Pagination
          totalPages={Math.ceil(tableData.length / numLim)}
          currentPage={currentPage + 1}
          onCurrentPageChange={(page) => setCurrentPage(page - 1)}
        />
        <Select
          aria-label='Table rows on the page'
          value={numLim}
          onChange={setLimit}
          options={[{ value: 3, children: 3 }, { value: 5, children: 5 }, { value: 8, children: 8 }, { value: 10, children: 10 }]}
        />
      </Flex>
    </>
  );
};

export const defaultProps: PaginationProps = {
  columnsLimit: 0,
  rowsLimit: 1,
};

Demo.defaultProps = defaultProps;

export default Demo;

const data = [
  {
    keyword: 'ebay buy',
    kd: 77.8,
    cpc: 1.25,
    vol: 32500000,
  },
  {
    keyword: 'www.ebay.com',
    kd: 11.2,
    cpc: 3.4,
    vol: 65457920,
  },
  {
    keyword: 'www.ebay.com',
    kd: 10,
    cpc: 0.65,
    vol: 47354640,
  },
  {
    keyword: 'ebay buy',
    kd: -1,
    cpc: 0,
    vol: -1,
  },
  {
    keyword: 'ebay buy last',
    kd: 75.89,
    cpc: 0,
    vol: 21644290,
  },
];
