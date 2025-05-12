import React from 'react';
import Card from '@semcore/card';
import SettingsM from '@semcore/icon/Settings/m';
import { DataTable } from '@semcore/data-table';

const tooltipContent = `Hey! Don't forget to place some useful information here.`;
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

const Demo = () => (
  <Card>
    <Card.Header>
      <Card.Title innerHint={tooltipContent} tag='h4' inline my={0}>
        Card Title
      </Card.Title>
      <SettingsM
        style={{ float: 'right' }}
        mt={1}
        color='icon-secondary-neutral'
        interactive
        aria-label='Open settings'
      />
      <Card.Description my={0}>
        This is a description with additional information or insights.
      </Card.Description>
    </Card.Header>
    <Card.Body p={'0 0 20px 0'}>
      <DataTable
        data={data}
        aria-label={'Table in card'}
        columns={[
          { name: 'keyword', children: 'Keyword' },
          { name: 'kd', children: 'KD,%' },
          { name: 'cpc', children: 'CPC' },
          { name: 'vol', children: 'Vol.' },
        ]}
      />
    </Card.Body>
  </Card>
);

export default Demo;
