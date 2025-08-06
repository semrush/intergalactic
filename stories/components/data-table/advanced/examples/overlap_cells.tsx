import { Box, Flex } from '@semcore/base-components';
import Card from '@semcore/card';
import type { DataTableData } from '@semcore/data-table';
import { DataTable } from '@semcore/data-table';
import Skeleton from '@semcore/skeleton';
import React from 'react';
import { Grid } from 'react-virtualized';

const Demo = () => {
  return (
    <DataTable
      data={data}
      aria-label='Overlap cells example'
      defaultGridTemplateColumnWidth='auto'
      wMax='800px'
      headerProps={{
        sticky: true,
      }}
      columns={[
        {
          name: 'keyword',
          children: 'Keyword',
        },
        {
          name: 'kd',
          children: 'KD %',
        },
        {
          name: 'cpc',
          children: 'CPC',
        },
        {
          name: 'hiddenColumn',
          children: 'Empty',
        },
        {
          name: 'vol',
          children: 'Vol.',
        },
      ]}

      renderCell={(props) => {
        if (props.rowIndex > 1 && props.columnIndex > 0) {
          return <Skeleton h={20} duration={-1}><Skeleton.Text amount={1} /></Skeleton>;
        }

        return props.defaultRender();
      }}

      renderCellOverlay={() => {
        return (
          <Flex alignItems='center' justifyContent='center' h='100%' style={{ background: 'rgba(255, 255, 255, 0.6)', gridArea: `4 / 2 / ${data.length + 2} / -1` }} zIndex={16}>
            <Card style={{ background: '#fff', width: '260px', height: '240px' }}>
              <Card.Body>
                Some overlay text
              </Card.Body>
            </Card>
          </Flex>
        );
      }}
    />
  );
};

const data: DataTableData = [
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
    kd: null,
    cpc: '$0',
    vol: 'n/a',
  },
  {
    keyword: 'ebay buy',
    kd: 75.89,
    cpc: '$0',
    vol: '21,644,290',
  },
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
    kd: null,
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
