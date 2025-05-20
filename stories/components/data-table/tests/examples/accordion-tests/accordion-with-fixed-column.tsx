import React from 'react';
import { DataTable, ACCORDION, DataTableData } from '@semcore/data-table';
import { NoData } from '@semcore/widget-empty';

const Demo = () => {
  return (
    <DataTable data={data} aria-label={'Accordion inside table'} h={'100%'} w={400}
      columns={[
        { name: 'keyword', children: 'Keyword', gtcWidth: '200px', fixed: 'left' },
        { name: 'kd', children: 'KD,%', gtcWidth: '200px' },
        { name: 'cpc', children: 'CPC', gtcWidth: '150px' },
        { name: 'vol', children: 'Vol.', gtcWidth: '100px', fixed: 'right' },
      ]}

    />
  );
};

const ChartExample = () => {
  return (<NoData type='nothing-found' my={7} mx='auto' />);
};

const data: DataTableData = [
  {
    keyword: 'ebay buy',
    kd: '77.8',
    cpc: '$1.25',
    vol: '32,500,000',
    [ACCORDION]: (<ChartExample />),
  },
  {
    keyword: 'www.ebay.com',
    kd: '11.2',
    cpc: '$3.4',
    vol: {
      toString: () => '65,457,920',
      [ACCORDION]: (<ChartExample />),
    },
  },
  {
    keyword: 'www.ebay.com',
    kd: '10',
    cpc: '$0.65',
    vol: '47,354,640',
    [ACCORDION]: (<ChartExample />),
  },
  {
    keyword: 'ebay buy',
    kd: '-',
    cpc: '$0',
    vol: 'n/a',
    [ACCORDION]: (<ChartExample />),
  },
  {
    keyword: 'ebay buy',
    kd: '75.89',
    cpc: '$0',
    vol: '21,644,290',
    [ACCORDION]: (<ChartExample />),
  },
];

export default Demo;
