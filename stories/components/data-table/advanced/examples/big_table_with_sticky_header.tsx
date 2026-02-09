import AmazonM from '@semcore/icon/color/Amazon/m';
import { Box } from '@semcore/ui/base-components';
import { ButtonLink } from '@semcore/ui/button';
import { DataTable } from '@semcore/ui/data-table';
import React from 'react';

const Demo = () => {
  const [_, forceUpdate] = React.useState(0);

  return (
    <>
      <Box h={50}>
        Some scrollable text before table
      </Box>
      <Box h={20} position='sticky' zIndex={100} style={{ background: 'lightslategrey', top: 0 }}>
        Some sticky text
      </Box>
      <DataTable
        data={data}
        aria-label='Fixed multi level header with 2 scroll'
        defaultGridTemplateColumnWidth='1fr'
        headerProps={{
          sticky: true,
          top: 20,
          withScrollBar: true,
        }}
        w='100%'
        onResize={() => {
          console.log('handle resize');
          forceUpdate((prev) => prev + 1);
        }}
        columns={[
          {
            name: 'group1',
            children: 'Group',
            fixed: 'left',
            columns: [
              {
                name: 'kd',
                children: (
                  <>
                    <ButtonLink addonLeft={AmazonM} title='AmazonM non interactive' color='icon-secondary-neutral' />
                    <ButtonLink addonLeft={AmazonM} title='AmazonM non interactive' color='icon-secondary-neutral' />
                  </>
                ),
                gtcWidth: 'minmax(20%, 250px)',
              },
              { name: 'cpc', children: 'CPC', gtcWidth: '250px' },
              { name: 'vol', children: 'Vol.', gtcWidth: '250px' },

            ],
          },
          { name: 'other', children: 'Other', gtcWidth: '250px' },

          { name: 'keyword', children: 'Keyword', gtcWidth: 'minmax(20%, 250px)' },

        ]}
      />

    </>
  );
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
