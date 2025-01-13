import React from 'react';
import DataTable from '@semcore/data-table';
import { Box, Flex } from '@semcore/flex-box';

const Demo = () => {
  return (
    <DataTable data={data} aria-label={'Table title. Custom footer cells'}>
      <DataTable.Head>
        <DataTable.Column name='keyword' children='Keyword' />
        <DataTable.Column name='kd' children='KD,%' />
        <DataTable.Column name='cpc' children='CPC' />
        <DataTable.Column name='vol' children='Vol.' />
      </DataTable.Head>
      <DataTable.Body>
        <Flex role={'row'}>
          <Box p={3} style={{ width: 'var(--keyword_width)' }} role={'gridcell'} tabIndex={-1}>
            Summary
          </Box>
          <Box p={3} style={{ width: 'var(--kd_width)' }} role={'gridcell'} tabIndex={-1} />
          <Box p={3} style={{ width: 'var(--cpc_width)' }} role={'gridcell'} tabIndex={-1}>
            {data.reduce((sum, row) => sum + row.cpc, 0)}
          </Box>
          <Box p={3} style={{ width: 'var(--vol_width)' }} role={'gridcell'} tabIndex={-1}>
            {data.reduce((sum, row) => sum + row.vol, 0)}
          </Box>
        </Flex>
      </DataTable.Body>
    </DataTable>
  );
};

const data = [
  {
    keyword: 'ebay buy',
    kd: 77.8,
    cpc: 125,
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
    kd: 0,
    cpc: 0,
    vol: 0,
  },
  {
    keyword: 'ebay buy',
    kd: 75.89,
    cpc: 0,
    vol: 21644290,
  },
];

export default Demo;
