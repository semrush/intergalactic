import React from 'react';
import { DataTable, wrapDataTable } from '@semcore/data-table';
import Card from '@semcore/card';

const CardDataTable = wrapDataTable<{ title: string }>(({ title, ...restProps }) => {
  return (
    <Card>
      <Card.Header>
        <Card.Title>{title}</Card.Title>
      </Card.Header>
      <Card.Body px={0}>
        <DataTable {...restProps} aria-label={'Table title'} />
      </Card.Body>
    </Card>
  );
});

const Demo = () => {
  return (
    <CardDataTable
      data={data}
      title='A table combined with card'
      columns={[
        { name: 'keyword', children: 'Keyword' },
        { name: 'kd', children: 'KD,%' },
        { name: 'cpc', children: 'CPC' },
        { name: 'vol', children: 'Vol.' },
      ]}
    />
  );
};

const data = [
  {
    keyword: 'ebay buy',
    kd: '77.8',
    cpc: '$1.25',
    vol: '32,500,000',
  },
  {
    keyword: 'www.ebay.com',
    kd: '11.2',
    cpc: '$3.4',
    vol: '65,457,920',
  },
  {
    keyword: 'www.ebay.com',
    kd: '10',
    cpc: '$0.65',
    vol: '47,354,640',
  },
];

export default Demo;
