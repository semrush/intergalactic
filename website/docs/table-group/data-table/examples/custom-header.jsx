import React from 'react';
import DataTable from '@semcore/data-table';
import Tooltip from '@semcore/tooltip';
import { Text } from '@semcore/typography';
import DropdownMenu from '@semcore/dropdown-menu';
import { LinkTrigger } from '@semcore/base-trigger';

export default () => {
  return (
    <DataTable data={data}>
      <DataTable.Head>
        <DataTable.Column name="keyword">
          <Tooltip title="Jesus Christ, Joe, fucking forget about it. I'm Mr. Pink. Let's move on.">
            <Text noWrap>
              Keyword <Text color="gray60">(1 – 100)</Text>
            </Text>
          </Tooltip>
        </DataTable.Column>
        <DataTable.Column name="kd">
          <DropdownMenu>
            <DropdownMenu.Trigger tag={LinkTrigger} color="gray20">
              KD,%
            </DropdownMenu.Trigger>
            <DropdownMenu.Menu>
              <DropdownMenu.Item>Options 1</DropdownMenu.Item>
              <DropdownMenu.Item>Options 2</DropdownMenu.Item>
            </DropdownMenu.Menu>
          </DropdownMenu>
        </DataTable.Column>
        <DataTable.Column name="cpc">
          <Tooltip title="Jesus Christ, Joe, fucking forget about it. I'm Mr. Pink. Let's move on.">
            CPC
          </Tooltip>
        </DataTable.Column>
        <DataTable.Column name="vol">
          <Tooltip title="Jesus Christ, Joe, fucking forget about it. I'm Mr. Pink. Let's move on.">
            Vol.
          </Tooltip>
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
