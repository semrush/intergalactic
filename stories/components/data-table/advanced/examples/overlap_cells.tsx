import { Flex } from '@semcore/base-components';
import Card from '@semcore/card';
import type { DataTableData } from '@semcore/data-table';
import { DataTable } from '@semcore/data-table';
import React from 'react';

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
          return <div style={{ filter: 'blur(4px)', opacity: 0.5 }}>{props.value}</div>;
        }

        return props.defaultRender();
      }}

      renderCellOverlay={() => {
        return (
          <Flex alignItems='center' justifyContent='center' h='100%' style={{ gridArea: `4 / 2 / ${data.length + 2} / -1` }} zIndex={16}>
            <Card w={280} h={200} style={{ boxShadow: 'var(--intergalactic-box-shadow-modal)' }}>
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
