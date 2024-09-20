import React from 'react';
import DataTable from 'intergalactic/data-table';
import Tooltip from 'intergalactic/tooltip';
import { Text } from 'intergalactic/typography';
import DropdownMenu from 'intergalactic/dropdown-menu';
import { LinkTrigger } from 'intergalactic/base-trigger';

const Demo = () => {
  return (
    <DataTable data={data} aria-label={'Table title. Customizing header'}>
      <DataTable.Head>
        <DataTable.Column
          name='keyword'
          tag={Tooltip}
          title="Jesus Christ, Joe, fucking forget about it. I'm Mr. Pink. Let's move on."
          tabIndex={0}
        >
          <Text noWrap>
            Keyword <Text color='text-secondary'>(1 - 100)</Text>
          </Text>
        </DataTable.Column>
        <DataTable.Column name='kd'>
          <DropdownMenu>
            <DropdownMenu.Trigger>
              <LinkTrigger color='text-primary' style={{ fontSize: '12px' }}>
                KD,%
              </LinkTrigger>
            </DropdownMenu.Trigger>
            <DropdownMenu.Menu>
              <DropdownMenu.Item>Options 1</DropdownMenu.Item>
              <DropdownMenu.Item>Options 2</DropdownMenu.Item>
            </DropdownMenu.Menu>
          </DropdownMenu>
        </DataTable.Column>
        <DataTable.Column
          name='cpc'
          tag={Tooltip}
          title="Jesus Christ, Joe, fucking forget about it. I'm Mr. Pink. Let's move on."
          tabIndex={0}
        >
          CPC
        </DataTable.Column>
        <DataTable.Column
          name='vol'
          tag={Tooltip}
          title="Jesus Christ, Joe, fucking forget about it. I'm Mr. Pink. Let's move on."
          tabIndex={0}
        >
          Vol.
        </DataTable.Column>
      </DataTable.Head>
      <DataTable.Body />
    </DataTable>
  );
};

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

export default Demo;
