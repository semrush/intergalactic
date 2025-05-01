import React from 'react';
import { DataTable } from '@semcore/data-table';
import Ellipsis from '@semcore/ellipsis';
import WhatsAppM from '@semcore/icon/color/WhatsApp/m';
import { Hint } from '@semcore/tooltip';
import { Text } from '@semcore/typography';
import AmazonM from '@semcore/icon/color/Amazon/m';

const Demo = () => {
  return (

    <>
      <DataTable data={data} aria-label={'Header with different content'} hMax={200}
      headerProps={{
        sticky: true,
      }}
        columns={[
          {
            name: 'keyword', gtcWidth: '65px', sortable: true,
            children: (<Text noWrap>,
              Keyword <Text color='text-secondary'>(Keyword 1-100)</Text>
            </Text>)
          },
          {
            name: 'kd',
            gtcWidth: '85px',
            children: (
              <Text>
                Difficulty Difficlty 123
                <Hint tag={WhatsAppM} title='AmazonM non interactive' color='icon-secondary-neutral' />
                <Hint tag={AmazonM} title='AmazonM non interactive' color='icon-secondary-neutral' />
              </Text>
            )
          },
          {
            name: 'cpc', gtcWidth: '85px',
            children: (
              <>
                <Ellipsis>Difficulty Difficulty</Ellipsis>
                <Hint tag={WhatsAppM} title='AmazonM non interactive' color='icon-secondary-neutral' />
                <Hint tag={AmazonM} title='AmazonM non interactive' color='icon-secondary-neutral' />
              </>
            )
          },
          { name: 'cpc', gtcWidth: '90px', children: 'CPC CPC CPC CPC CPC' },
          { name: 'vol', children: 'Vol.', gtcWidth: 'minmax(0, 300px)' },
          {
            name: 'md',
            gtcWidth: '90px',
            children: (
              <Text>
                Marketing SEO
                <Text color='text-secondary'>(Marketing SEO Marketing SEO 1-100)</Text>
              </Text>
            )
          }, {
            name: 'md',
            gtcWidth: '90px',
            children: (
              <Text>
                Marketing SEO
                <Text color='text-secondary'>(Marketing SEO Marketing SEO 1-100)</Text>
              </Text>
            )
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
    cpc: '$1.25',
    vol: '32,500,000',
    md: '221',
  },
  {
    keyword: 'www.ebay.com',
    kd: '11.2',
    cpc: '$3.4',
    vol: '65,457,920',
    md: '221',
  },
  {
    keyword: 'www.ebay.com',
    kd: '10',
    cpc: '$0.65',
    vol: '47,354,640',
    md: 'n/a',
  },
  {
    keyword: 'ebay buy',
    kd: '-',
    cpc: '$0',
    vol: 'n/a',
    md: '221',
  },
  {
    keyword: 'ebay buy',
    kd: '75.89',
    cpc: '$0',
    vol: '21,644,290',
    md: '221',
  },
];

export default Demo;
