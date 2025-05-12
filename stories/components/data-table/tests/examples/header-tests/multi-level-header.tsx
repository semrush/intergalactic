import React from 'react';
import { DataTable } from '@semcore/data-table';
import { Hint } from '@semcore/tooltip';
import { Text } from '@semcore/typography';
import Ellipsis from '@semcore/ellipsis';
import AmazonM from '@semcore/icon/color/Amazon/m';

const Demo = () => {

  return (
    <>
      <DataTable
        data={data}
        aria-label={'Borders'}
        defaultGridTemplateColumnWidth={'1fr'} h={'100%'}

        columns={[
          { name: 'other', children: 'Other' },
          {
            children: 'Borders left',
            borders: 'left',
            columns: [
              {
                name: 'kd',
                gtcWidth: '100px',
                children: (
                  <>
                    <Text>
                      Kd Organic Sessions Organic Sessions
                      <Hint tag={AmazonM} title='AmazonM non interactive' color='icon-secondary-neutral' />
                    </Text>
                  </>
                )


              },
              { name: 'cpc', children: 'CPC' },
              { name: 'vol', children: 'Vol.' },

            ]
          },

          { name: 'keyword', children: 'Keyword' },
          {
            children: (
              <Ellipsis>Borders both - Organic Sessions rganic Sessions rganic Sessions</Ellipsis>
            ),
            borders: 'both',
            columns: [
              {
                name: 'kd2',
                gtcWidth: '100px',
                children: (
                  <>
                    <Ellipsis>
                      Kd Organic Sessions Organic Sessions
                    </Ellipsis>
                    <Hint tag={AmazonM} title='AmazonM non interactive' color='icon-secondary-neutral' />
                  </>
                )


              },
              { name: 'cpc', children: 'CPC' },
              { name: 'vol', children: 'Vol.' },

            ]
          },

          { name: 'other', children: 'Other' },

          {
            children: 'Borders right',
            borders: 'right',
            columns: [
              {
                name: 'kd',
                gtcWidth: '100px',
                children: (
                  <>
                    <Text>
                      Kd Organic Sessions Organic Sessions
                      <Hint tag={AmazonM} title='AmazonM non interactive' color='icon-secondary-neutral' />
                    </Text>
                  </>
                )

              },
              { name: 'cpc', children: 'CPC' },

            ]
          },

          { name: 'other', children: 'Other' },

          {
            children: 'Borders default',
            columns: [
              {
                name: 'kd',
                gtcWidth: '100px',
                children: (
                  <>
                    <Text>
                      Kd Organic Sessions Organic Sessions
                      <Hint tag={AmazonM} title='AmazonM non interactive' color='icon-secondary-neutral' />
                    </Text>
                  </>
                )


              },
              { name: 'cpc', children: 'CPC' },

            ]
          },


        ]}
      />
    </>
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
