import type { NSBox } from '@semcore/ui/base-components';
import { Flex } from '@semcore/ui/base-components';
import { DataTable } from '@semcore/ui/data-table';
import type { DataTableData } from '@semcore/ui/data-table';
import { Text } from '@semcore/ui/typography';
import React from 'react';

export type StickyHeaderScrollSyncProps = {
  sticky: boolean;
  withScrollBar?: boolean;
  multiLevel?: boolean;
  limitEnabled?: boolean;
  rowsLimit?: number;
  columnsLimit?: number;
} & NSBox.Props;

const flatColumns = [
  { name: 'keyword', children: 'Keyword', gtcWidth: '200px' },
  { name: 'kd', children: 'KD,%', gtcWidth: '200px' },
  { name: 'cpc', children: 'CPC', gtcWidth: '200px' },
  { name: 'vol', children: 'Vol.', gtcWidth: '200px' },
  { name: 'extra', children: 'Extra', gtcWidth: '200px' },
];

const multiLevelColumns = [
  { name: 'keyword', children: 'Keyword', gtcWidth: '200px' },
  {
    name: 'group1',
    children: 'Group 1',
    columns: [
      { name: 'kd', children: 'KD,%', gtcWidth: '200px' },
      { name: 'cpc', children: 'CPC', gtcWidth: '200px' },
    ],
  },
  {
    name: 'group2',
    children: 'Group 2',
    columns: [
      { name: 'vol', children: 'Vol.', gtcWidth: '200px' },
      { name: 'extra', children: 'Extra', gtcWidth: '200px' },
    ],
  },
];

const Demo = (props: StickyHeaderScrollSyncProps) => {
  return (
    <>
      <div style={{ height: '200px', background: '#f0f0f0' }}>Spacer above</div>
      <DataTable
        data={data}
        aria-label='Sticky header scroll sync'
        wMax={props.wMax}
        headerProps={{
          sticky: props.sticky,
          withScrollBar: props.withScrollBar,
        }}
        columns={props.multiLevel ? multiLevelColumns : flatColumns}
        limit={
          props.limitEnabled
            ? {
                fromRow: props.rowsLimit,
                fromColumn: props.columnsLimit,
                renderOverlay() {
                  return (
                    <Flex alignItems='center' direction='column' gap={3} py={6} wMax={320}>
                      <Text size={300} fontWeight='bold' textAlign='center'>
                        You've reached your report limit for today
                      </Text>
                      <Text size={200} textAlign='center'>
                        To increase your daily report limit, upgrade to a Guru plan.
                      </Text>
                    </Flex>
                  );
                },
              }
            : undefined
        }
      />
      <div style={{ height: '400px', background: '#f0f0f0' }}>Spacer below</div>
    </>
  );
};

const data: DataTableData = [
  { keyword: 'ebay buy', kd: '77.8', cpc: '$1.25', vol: '32,500,000', extra: 'A' },
  { keyword: 'www.ebay.com', kd: '11.2', cpc: '$3.4', vol: '65,457,920', extra: 'B' },
  { keyword: 'www.ebay.com', kd: '10', cpc: '$0.65', vol: '47,354,640', extra: 'C' },
  { keyword: 'ebay buy', kd: '-', cpc: '$0', vol: 'n/a', extra: 'D' },
  { keyword: 'ebay buy', kd: '75.89', cpc: '$0', vol: '21,644,290', extra: 'E' },
  { keyword: 'www.ebay.com', kd: '10', cpc: '$0.65', vol: '47,354,640', extra: 'F' },
];

export const defaultProps: StickyHeaderScrollSyncProps = {
  sticky: true,
  withScrollBar: true,
  multiLevel: false,
  wMax: '400px',
  limitEnabled: false,
  rowsLimit: 3,
  columnsLimit: 3,
};

Demo.defaultProps = defaultProps;

export default Demo;
