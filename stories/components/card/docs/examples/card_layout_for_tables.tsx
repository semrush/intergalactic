import Card from '@semcore/card';
import { DataTable } from '@semcore/data-table';
import React from 'react';

const Demo = () => (
  <>
    <style>
      {`
      #card-with-table {
        padding: 0 0 var(--intergalactic-spacing-1x);
      }
      #card-with-table div[role="row"]:last-of-type div[role="gridcell"] {
        border-bottom: none;
      }
    `}
    </style>
    <Card>
      <Card.Header>
        <Card.Title tag='h3'>Card Title</Card.Title>
      </Card.Header>
      <Card.Body id='card-with-table'>
        <DataTable
          data={data}
          aria-label='Table in card'
          sideIndents='wide'
          columns={[
            { name: 'keyword', children: 'Keyword' },
            { name: 'kd', children: 'KD,%' },
            { name: 'cpc', children: 'CPC' },
            { name: 'vol', children: 'Vol.' },
          ]}
        />
      </Card.Body>
    </Card>
  </>
);

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
  {
    keyword: 'ebay buy',
    kd: '-',
    cpc: '$0',
    vol: 'n/a',
  },
  {
    keyword: 'ebay buy',
    kd: '75.89',
    cpc: '$0',
    vol: '21,644,290',
  },
];

export default Demo;
