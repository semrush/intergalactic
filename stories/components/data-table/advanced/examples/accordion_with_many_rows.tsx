import type { DataTableProps } from '@semcore/ui/data-table';
import { DataTable, ACCORDION } from '@semcore/ui/data-table';
import React from 'react';

export type TableInTableProps = {
  accordionMode: DataTableProps<typeof data, any, any>['accordionMode'];
  onAccordionToggle?: DataTableProps<
          typeof data,
    any,
    any
  >['onAccordionToggle'];
};

const Demo = (props: TableInTableProps) => {
  return (
    <DataTable
      data={data}
      aria-label='Parent'
      uniqueRowKey='keyword'
      columns={[
        { name: 'keyword', children: 'Keyword' },
        { name: 'kd', children: 'KD %' },
        { name: 'cpc', children: 'CPC' },
        { name: 'vol', children: 'Vol.' },
        { name: 'kd1', children: 'KD %' },
        { name: 'cpc1', children: 'CPC' },
        { name: 'vol1', children: 'Vol.' },
        { name: 'kd2', children: 'KD %' },
        { name: 'cpc2', children: 'CPC' },
        { name: 'vol2', children: 'Vol.' },
        { name: 'kd3', children: 'KD %' },
        { name: 'cpc3', children: 'CPC' },
        { name: 'vol3', children: 'Vol.' },
        { name: 'kd4', children: 'KD %' },
        { name: 'cpc4', children: 'CPC' },
        { name: 'vol4', children: 'Vol.' },
      ]}
    />
  );
};

export const accordionTableInTableDefaultProps: TableInTableProps = {
  accordionMode: 'independent',
};

Demo.defaultProps = accordionTableInTableDefaultProps;

const acc = Array(300)
  .fill(null)
  .map((item, id) => ({
    keyword: 'www.ebay.com' + id,
    kd: '11.2',
    cpc: '$3.4',
    vol: '65,457,920',

    kd1: '1.2',
    cpc1: '$4.4',
    vol1: '457,920',

    kd2: '1',
    cpc2: '$4.4',
    vol2: '457',

    kd3: '6',
    cpc3: '$4.4',
    vol3: '20',

    kd4: '8',
    cpc4: '$1',
    vol4: '0',
  }));

const data = [
  {
    keyword: 'ebay buy',
    kd: '77.8',
    cpc: '$1.25',
    vol: '32,500,000',

    kd1: '1.2',
    cpc1: '$4.4',
    vol1: '457,920',

    kd2: '1',
    cpc2: '$4.4',
    vol2: '457',

    kd3: '6',
    cpc3: '$4.4',
    vol3: '20',

    kd4: '8',
    cpc4: '$1',
    vol4: '0',
    [ACCORDION]: acc,
  },
  {
    keyword: 'www.ebay.com',
    kd: '11.2',
    cpc: '$3.4',
    vol: '65,457,920',

    kd1: '1.2',
    cpc1: '$4.4',
    vol1: '457,920',

    kd2: '1',
    cpc2: '$4.4',
    vol2: '457',

    kd3: '6',
    cpc3: '$4.4',
    vol3: '20',

    kd4: '8',
    cpc4: '$1',
    vol4: '0',
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

    kd1: '1.2',
    cpc1: '$4.4',
    vol1: '457,920',

    kd2: '1',
    cpc2: '$4.4',
    vol2: '457',

    kd3: '6',
    cpc3: '$4.4',
    vol3: '20',

    kd4: '8',
    cpc4: '$1',
    vol4: '0',
  },
  {
    keyword: 'ebay buy22221112221212',
    kd: '-',
    cpc: '$0',
    vol: 'n/a',

    kd1: '1.2',
    cpc1: '$4.4',
    vol1: '457,920',

    kd2: '1',
    cpc2: '$4.4',
    vol2: '457',

    kd3: '6',
    cpc3: '$4.4',
    vol3: '20',

    kd4: '8',
    cpc4: '$1',
    vol4: '0',
  },
  {
    keyword: 'ebay buy555444333xwww',
    kd: '75.89',
    cpc: '$0',
    vol: '21,644,290',

    kd1: '1.2',
    cpc1: '$4.4',
    vol1: '457,920',

    kd2: '1',
    cpc2: '$4.4',
    vol2: '457',

    kd3: '6',
    cpc3: '$4.4',
    vol3: '20',

    kd4: '8',
    cpc4: '$1',
    vol4: '0',
  },
];

export default Demo;
