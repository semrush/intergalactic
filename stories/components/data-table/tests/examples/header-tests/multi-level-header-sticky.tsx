import React from 'react';
import { DataTable } from '@semcore/data-table';
import { Hint } from '@semcore/tooltip';
import AmazonM from '@semcore/icon/color/Amazon/m';

const Demo = () => {
  return (

    <>
      <DataTable
        data={data}
        aria-label={'Fixed multi level header with 2 scroll'}
        defaultGridTemplateColumnWidth={'1fr'} hMax={500}
        headerProps={{
          sticky: true,
        }}
        columns={[
          { name: 'other', children: 'Other' },
          {
            children: 'Group',
            columns: [
              {
                name: 'kd',
                children: (
                  <>
                    <Hint tag={AmazonM} title='AmazonM non interactive' color='icon-secondary-neutral' />
                    <Hint tag={AmazonM} title='AmazonM non interactive' color='icon-secondary-neutral' />
                  </>
                )


              },
              { name: 'cpc', children: 'CPC' },
              { name: 'vol', children: 'Vol.' },

            ]
          },

          { name: 'keyword', children: 'Keyword' },

        ]}
      />

    </>
  )
};

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
