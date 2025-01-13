import React from 'react';
import DataTable from '@semcore/data-table';
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
      <DataTable data={tableData} aria-label={'Table title. Pagination'}>
        <DataTable.Head>
          <DataTable.Column name='keyword' children='Keyword' justifyContent='left' />
          <DataTable.Column name='kd' children='KD,%' justifyContent='right' wMax={68} />
          <DataTable.Column name='cpc' children='CPC' wMax={60} />
          <DataTable.Column name='vol' children='Vol.' wMax={120} justifyContent='left' />
        </DataTable.Head>
        <DataTable.Body>
          <DataTable.Cell data={data} name='kd'>
            {(_, row) => ({
              children: row.kd === -1 ? 'n/a' : numberFormat.format(row.kd),
            })}
          </DataTable.Cell>
          <DataTable.Cell data={data} name='cpc'>
            {(_, row) => ({
              children: row.cpc === -1 ? 'n/a' : currencyFormat.format(row.cpc),
            })}
          </DataTable.Cell>
          <DataTable.Cell data={data} name='vol'>
            {(_, row) => ({
              children: row.vol === -1 ? 'n/a' : numberFormat.format(row.vol),
            })}
          </DataTable.Cell>
        </DataTable.Body>
      </DataTable>
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
