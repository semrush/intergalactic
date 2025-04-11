import React from 'react';
import { DataTable } from '@semcore/data-table';
import { Hint } from '@semcore/tooltip';
import { Text } from '@semcore/typography';
import Ellipsis from '@semcore/ellipsis';
import AmazonM from '@semcore/icon/color/Amazon/m';

const Demo = () => {

  return (
    <DataTable data={data} aria-label={'Borders'} defaultGridTemplateColumnWidth={'1fr'}  >
      <DataTable.Head>
        <DataTable.Head.Group borders={'left'} title={'Borders left'}>
          <DataTable.Head.Column name='kd' gtcWidth={'100px'}>
            <Text>
              Kd Organic Sessions Organic Sessions
              <Hint tag={AmazonM} title='AmazonM non interactive' color='icon-secondary-neutral' />
            </Text>
          </DataTable.Head.Column>
          <DataTable.Head.Column name='cpc' children='CPC' />
          <DataTable.Head.Column name='vol' children='Vol.' />


        </DataTable.Head.Group >
        <DataTable.Head.Column name='keyword' children='Keyword' />
        <DataTable.Head.Group borders={'both'} title={(<Ellipsis>Bprders both - Organic Sessions rganic Sessions rganic Sessions</Ellipsis>)}>

          <DataTable.Head.Column name='kd2' gtcWidth={'100px'} >
            <Ellipsis>
              Kd Organic Sessions Organic Sessions
            </Ellipsis>
            <Hint tag={AmazonM} title='AmazonM non interactive' color='icon-secondary-neutral' />

          </DataTable.Head.Column>

          <DataTable.Head.Column name='cpc' children='CPC' />
          <DataTable.Head.Column name='vol' children='Vol.' />
        </DataTable.Head.Group>
        <DataTable.Head.Column name='other' children='Other' />

        <DataTable.Head.Group borders={'right'} title={'Borders right'}>
          <DataTable.Head.Column name='kd'>
            <Hint tag={AmazonM} title='AmazonM non interactive' color='icon-secondary-neutral' />
            <Hint tag={AmazonM} title='AmazonM non interactive' color='icon-secondary-neutral' />
          </DataTable.Head.Column>
          <DataTable.Head.Column name='cpc' children='CPC' />
        </DataTable.Head.Group>
        <DataTable.Head.Column name='other' children='Other' />

        <DataTable.Head.Group title={'Default borders'}>
          <DataTable.Head.Column name='kd'>
            <Hint tag={AmazonM} title='AmazonM non interactive' color='icon-secondary-neutral' />
            <Hint tag={AmazonM} title='AmazonM non interactive' color='icon-secondary-neutral' />
          </DataTable.Head.Column>
          <DataTable.Head.Column name='cpc' children='CPC' />
        </DataTable.Head.Group>


      </DataTable.Head>
      <DataTable.Body />
    </DataTable>
  );
};

const data = [
  {
    keyword: 'ebay buy',
    kd: '77.8',
    kd2: '77.8',
    cpc: '1.25',
    vol: '32,500,000',
    other: 'ebay buy',
  },
  {
    keyword: 'www.ebay.com',
    kd: '11.2',
    kd2: '77.8',
    cpc: '3.4',
    vol: '65,457,920',
    other: 'ebay buy',
  },
  {
    keyword: 'www.ebay.com',
    kd: '10',
    kd2: '77.8',
    cpc: '0.65',
    vol: '47,354,640',
    other: 'ebay buy',
  },
  {
    keyword: 'ebay buy',
    kd: '-',
    kd2: '77.8',
    cpc: '0',
    vol: '2,456,789',
    other: 'ebay buy',
  },
  {
    keyword: 'ebay buy',
    kd: '75.89',
    cpc: '0',
    kd2: '77.8',
    vol: '21,644,290',
    other: 'ebay buy',
  },
  {
    keyword: 'ebay buy',
    kd: '77.8',
    cpc: '1.25',
    kd2: '77.8',
    vol: '32,500,000',
    other: 'ebay buy',
  },
  {
    keyword: 'www.ebay.com',
    kd: '11.2',
    cpc: '3.4',
    kd2: '77.8',
    vol: '65,457,920',
    other: 'ebay buy',
  },
  {
    keyword: 'www.ebay.com',
    kd: '10',
    cpc: '0.65',
    kd2: '77.8',
    vol: '47,354,640',
    other: 'ebay buy',
  },
  {
    keyword: 'ebay buy',
    kd: '-',
    cpc: '0',
    kd2: '77.8',
    vol: '2,456,789',
    other: 'ebay buy',
  },
  {
    keyword: 'ebay buy',
    kd: '75.89',
    cpc: '0',
    kd2: '77.8',
    vol: '21,644,290',
    other: 'ebay buy',
  },
];

export default Demo;
