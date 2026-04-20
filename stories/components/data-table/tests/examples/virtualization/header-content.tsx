import AmazonM from '@semcore/icon/color/Amazon/m';
import WhatsAppM from '@semcore/icon/color/WhatsApp/m';
import { ButtonLink } from '@semcore/ui/button';
import { DataTable } from '@semcore/ui/data-table';
import { Text } from '@semcore/ui/typography';
import React from 'react';

const keyword = ['ebay buy', 'www.ebay.com', 'ebay buy'];
const kd = ['77.8', '10', '11.2', '-', '75.89'];
const cpc = ['$3.4', '$0.65', '$1.25', '$0', '$0'];
const vol = ['32,500,000', '65,457,920', '47,354,640', 'n/a', '21,644,290'];

const data = Array(10000)
  .fill(0)
  .map((_, index) => ({
    id: `#${index + 1}`,
    keyword: keyword[Math.floor(keyword.length * Math.random())],
    // [ROW_GROUP]: [
    //   {
    kd: kd[Math.floor(kd.length * Math.random())],
    cpc: cpc[Math.floor(cpc.length * Math.random())],
    vol: vol[Math.floor(vol.length * Math.random())],
    // },
    // ],
  }));

const Demo = () => {
  return (

    <>
      <DataTable
        data={data}
        aria-label='Header with different content'
        hMax={200}
        virtualScroll
        headerProps={{
          sticky: true,
        }}
        columns={[
          {
            name: 'keyword', gtcWidth: '65px', sortable: true,
            children: (
              <Text ellipsis={true}>
                ,
                Keyword
                <Text color='text-secondary'>(Keyword 1-100)</Text>
              </Text>
            ),
          },
          {
            name: 'kd',
            gtcWidth: '85px',
            children: (
              <Text>
                Difficulty Difficlty 123
                <ButtonLink addonLeft={WhatsAppM} title='AmazonM non interactive' color='icon-secondary-neutral' />
                <ButtonLink addonLeft={AmazonM} title='AmazonM non interactive' color='icon-secondary-neutral' />
              </Text>
            ),
          },
          {
            name: 'cpc', gtcWidth: '85px',
            children: (
              <>
                <Text ellipsis={true}>Difficulty Difficulty</Text>
                <ButtonLink addonLeft={WhatsAppM} title='AmazonM non interactive' color='icon-secondary-neutral' />
                <ButtonLink addonLeft={AmazonM} title='AmazonM non interactive' color='icon-secondary-neutral' />
              </>
            ),
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
            ),
          }, {
            name: 'md',
            gtcWidth: '90px',
            children: (
              <Text>
                Marketing SEO
                <Text color='text-secondary'>(Marketing SEO Marketing SEO 1-100)</Text>
              </Text>
            ),
          },
        ]}
      />

    </>
  );
};

export default Demo;
