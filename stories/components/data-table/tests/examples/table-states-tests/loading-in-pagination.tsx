import React from 'react';
import { DataTable } from '@semcore/data-table';
import Pagination from '@semcore/pagination';

const Demo = () => {
  const [currentPage, setCurrentPage] = React.useState(0);
  const numberFormat = React.useMemo(() => new Intl.NumberFormat('en-US'), []);
  const currencyFormat = React.useMemo(
    () => new Intl.NumberFormat('en-US', { currency: 'USD', style: 'currency' }),
    [],
  );

  const limit = 2;
  const tableData = data.slice(currentPage * limit, currentPage * limit + limit);

  return (
    <>
      <DataTable data={tableData} aria-label={'Pagination'} h={'auto'} loading
                 columns={[
                   {name: 'keyword', children: 'Keyword', justifyContent: 'left'},
                   {name: 'kd', children: 'KD,%', justifyContent: 'right', gtcWidth: 'minmax(fit-content, 68px)'},
                   {name: 'cpc', children: 'CPC', gtcWidth: 'minmax(fit-content, 60px)'},
                   {name: 'vol', children: 'Vol.', gtcWidth: 'minmax(fit-content, 120px)', justifyContent: 'left'},
                 ]}
          renderCell={(props) => {
            if (props.columnName === 'keyword') {
              return props.defaultRender();
            }

            const value = props.defaultRender();

            return typeof value === 'number' && value !== -1 ? numberFormat.format(value) : 'n/a';
          }}
        />
      <Pagination
        mt={4}
        totalPages={Math.ceil(data.length / limit)}
        currentPage={currentPage + 1}
        onCurrentPageChange={(page) => setCurrentPage(page - 1)}
      />
    </>
  );
};

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
