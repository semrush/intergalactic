import type { DataTableProps } from '@semcore/data-table';
import { DataTable } from '@semcore/data-table';
import AmazonM from '@semcore/icon/color/Amazon/m';
import { Hint } from '@semcore/tooltip';
import React from 'react';

const Demo = () => {
  return (

    <>
      <DataTable
        data={data}
        aria-label='Fixed multi level header with 2 scroll'
        defaultGridTemplateColumnWidth='1fr'
        hMax={500}
        w={700}
        headerProps={{
          sticky: true,
          withScrollBar: true,
        }}
        columns={columns}
      />

    </>
  );
};

const columns: DataTableProps<typeof data, any, any>['columns'] = [
  {
    name: '1',
    children: 'Group1',
    fixed: 'left',
    columns: [
      {
        name: 'kd',
        gtcWidth: '100px',
        children: (
          <>
            <Hint tag={AmazonM} title='AmazonM non interactive' color='icon-secondary-neutral' />
            <Hint tag={AmazonM} title='AmazonM non interactive' color='icon-secondary-neutral' />
          </>
        ),

      },
      { name: 'cpc', children: 'CPC', gtcWidth: '100px' },
      { name: 'vol', children: 'Vol.', gtcWidth: '100px' },

    ],
  },
  {
    name: '2',
    children: 'Group2',
    columns: [
      {
        name: 'kd2',
        gtcWidth: '100px',
        children: (
          <>
            <Hint tag={AmazonM} title='AmazonM non interactive' color='icon-secondary-neutral' />
            <Hint tag={AmazonM} title='AmazonM non interactive' color='icon-secondary-neutral' />
          </>
        ),

      },
      { name: 'cpc2', children: 'CPC', gtcWidth: '100px' },
      { name: 'vol2', children: 'Vol.', gtcWidth: '100px' },

    ],
  },
  {
    name: '3',
    children: 'Group3',
    columns: [
      {
        name: 'kd3',
        gtcWidth: '100px',
        children: (
          <>
            <Hint tag={AmazonM} title='AmazonM non interactive' color='icon-secondary-neutral' />
            <Hint tag={AmazonM} title='AmazonM non interactive' color='icon-secondary-neutral' />
          </>
        ),

      },
      { name: 'cpc3', children: 'CPC', gtcWidth: '100px' },
      { name: 'vol3', children: 'Vol.', gtcWidth: '100px' },

    ],
  },
  {
    name: '4',
    children: 'Group4',
    columns: [
      {
        name: 'kd4',
        gtcWidth: '100px',
        children: (
          <>
            <Hint tag={AmazonM} title='AmazonM non interactive' color='icon-secondary-neutral' />
            <Hint tag={AmazonM} title='AmazonM non interactive' color='icon-secondary-neutral' />
          </>
        ),

      },
      { name: 'cpc4', children: 'CPC', gtcWidth: '100px' },
      { name: 'vol4', children: 'Vol.', gtcWidth: '100px' },

    ],
  },

  {
    name: '5',
    fixed: 'right',
    children: 'Group5',
    columns: [
      {
        name: 'kd5',
        gtcWidth: '100px',
        children: (
          <>
            <Hint tag={AmazonM} title='AmazonM non interactive' color='icon-secondary-neutral' />
            <Hint tag={AmazonM} title='AmazonM non interactive' color='icon-secondary-neutral' />
          </>
        ),

      },
      { name: 'cpc5', children: 'CPC', gtcWidth: '100px' },
      { name: 'vol5', children: 'Vol.', gtcWidth: '100px' },

    ],
  },
];

const data = [
  {
    keyword: 'ebay buy',
    kd: '77.8',
    cpc: '$1.25',
    vol: '32,500,000',
    other: 'xs',
  },
  {
    keyword: 'www.ebay.comwww.ebay.comwww.ebay.comwww.ebay.comwww.ebay.com',
    kd: '11.2',
    cpc: '$3.4',
    vol: '65,457,920',
    other: 'xs',
  },
  {
    keyword: 'www.ebay.com',
    kd: '10',
    cpc: '$0.65',
    vol: '47,354,640',
    other: 'www.ebay.com',
  },
  {
    keyword: 'ebay buy',
    kd: '-',
    cpc: '$0',
    vol: 'n/a',
    other: 'n/a',
  },
  {
    keyword: 'ebay buy',
    kd: '75.89',
    cpc: '$0',
    vol: '21,644,290',
    other: 'n/a',
  },
  {
    keyword: 'ebay buy',
    kd: '77.8',
    cpc: '$1.25',
    vol: '32,500,000',
    other: 'm',
  },
  {
    keyword: 'www.ebay.comwww.ebay.comwww.ebay.comwww.ebay.comwww.ebay.com',
    kd: '11.2',
    cpc: '$3.4',
    vol: '65,457,920',
    other: 'n/a',
  },
  {
    keyword: 'www.ebay.com',
    kd: '10',
    cpc: '$0.65',
    vol: '47,354,640',
    other: '-',
  },
  {
    keyword: 'ebay buy',
    kd: '-',
    cpc: '$0',
    vol: 'n/a',
    other: 'n/a',
  },
  {
    keyword: 'ebay buy',
    kd: '75.89',
    cpc: '$0',
    vol: '21,644,290',
    other: 'n/a',
  },
  {
    keyword: 'ebay buy',
    kd: '77.8',
    cpc: '$1.25',
    vol: '32,500,000',
    other: 'xs',
  },
  {
    keyword: 'www.ebay.comwww.ebay.comwww.ebay.comwww.ebay.comwww.ebay.com',
    kd: '11.2',
    cpc: '$3.4',
    vol: '65,457,920',
    other: 'xxl',
  },
  {
    keyword: 'www.ebay.com',
    kd: '10',
    cpc: '$0.65',
    vol: '47,354,640',
    other: 'n/a',
  },
  {
    keyword: 'ebay buy',
    kd: '-',
    cpc: '$0',
    vol: 'n/a',
    other: 'n/a',
  },
  {
    keyword: 'ebay buy',
    kd: '75.89',
    cpc: '$0',
    vol: '21,644,290',
    other: 'n/a',
  },
  {
    keyword: 'ebay buy',
    kd: '77.8',
    cpc: '$1.25',
    vol: '32,500,000',
    other: 'n/a',
  },
  {
    keyword: 'www.ebay.comwww.ebay.comwww.ebay.comwww.ebay.comwww.ebay.com',
    kd: '11.2',
    cpc: '$3.4',
    vol: '65,457,920',
    other: 'n/a',
  },
  {
    keyword: 'www.ebay.com',
    kd: '10',
    cpc: '$0.65',
    vol: '47,354,640',
    other: 'n/a',
  },
  {
    keyword: 'ebay buy',
    kd: '-',
    cpc: '$0',
    vol: 'n/a',
    other: 'n/a',
  },
  {
    keyword: 'ebay buy',
    kd: '75.89',
    cpc: '$0',
    vol: '21,644,290',
    other: 'n/a',
  },
  {
    keyword: 'ebay buy',
    kd: '77.8',
    cpc: '$1.25',
    vol: '32,500,000',
    other: 'n/a',
  },
  {
    keyword: 'www.ebay.comwww.ebay.comwww.ebay.comwww.ebay.comwww.ebay.com',
    kd: '11.2',
    cpc: '$3.4',
    vol: '65,457,920',
    other: 'n/a',
  },
  {
    keyword: 'www.ebay.com',
    kd: '10',
    cpc: '$0.65',
    vol: '47,354,640',
    other: 'n/a',
  },
  {
    keyword: 'ebay buy',
    kd: '-',
    cpc: '$0',
    vol: 'n/a',
    other: 'n/a',
  },
  {
    keyword: 'ebay buy',
    kd: '75.89',
    cpc: '$0',
    vol: '21,644,290',
    other: 'n/a',
  },
];

export default Demo;
