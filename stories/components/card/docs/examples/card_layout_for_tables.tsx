import Card from '@semcore/card';
import type { DataTableProps } from '@semcore/data-table';
import { ACCORDION, DataTable } from '@semcore/data-table';
import React from 'react';

export type TableInTableProps = {
  variant?: DataTableProps<typeof data, any, any>['variant'];
  use?: DataTableProps<typeof data, any, any>['use'];
  compact?: DataTableProps<typeof data, any, any>['compact'];

};

const Demo = (props: TableInTableProps) => (
  <>
    <style>
      {`
      #card-with-table {
        padding: 0 0 var(--intergalactic-spacing-1x);
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
          variant={props.variant}
          use={props.use}
          compact={props.compact}
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

export const tableInTableDefaultProps: TableInTableProps = {
  variant: 'card',
  use: undefined,
  compact: undefined,
};

Demo.defaultProps = tableInTableDefaultProps;

const data = [
  {
    keyword: 'ebay buy',
    kd: '77.8',
    cpc: '$1.25',
    vol: '32,500,000',
    [ACCORDION]: [
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
    ],
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
  {
    keyword: 'www.ebay.com',
    kd: '11.2',
    cpc: '$3.4',
    vol: '65,457,920',
    [ACCORDION]: [
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
    ],
  },
];

export default Demo;
