import type { DataTableProps } from '@semcore/ui/data-table';
import { DataTable } from '@semcore/ui/data-table';
import React from 'react';

type TableProps = DataTableProps<any, any, any>;

export type HorizontalScrollLayout = 'oneLevel' | 'keywordAndGroup' | 'allInGroup' | 'fixedGroups';

export type HorizontalScrollProps = {
  layout: HorizontalScrollLayout;
  sticky: boolean;
  withScrollBar: boolean;
  wMax?: number;
  h?: number;
  rowsCount: number;
};

// undefined wMax/h fall back to the values of the layout
export const horizontalScrollProps: HorizontalScrollProps = {
  layout: 'oneLevel',
  sticky: true,
  withScrollBar: true,
  wMax: undefined,
  h: undefined,
  rowsCount: 5,
};

const layoutSizes: Record<HorizontalScrollLayout, { wMax: number; h?: number }> = {
  oneLevel: { wMax: 200 },
  keywordAndGroup: { wMax: 200 },
  allInGroup: { wMax: 200 },
  fixedGroups: { wMax: 800, h: 200 },
};

const columns: Record<HorizontalScrollLayout, TableProps['columns']> = {
  oneLevel: [
    { name: 'keyword', children: 'Keyword', gtcWidth: '200px' },
    { name: 'kd', children: 'KD,%', gtcWidth: '100px' },
    { name: 'cpc', children: 'CPC', gtcWidth: '200px' },
    { name: 'vol', children: 'Vol.', gtcWidth: '150px' },
  ],
  keywordAndGroup: [
    { name: 'keyword', children: 'Keyword', gtcWidth: '200px' },
    {
      name: 'group1',
      children: 'Organic Sessions',
      borders: 'both',
      columns: [
        { name: 'kd', children: 'KD,%', gtcWidth: '100px' },
        { name: 'cpc', children: 'CPC', gtcWidth: '80px' },
        { name: 'vol', children: 'Vol.', gtcWidth: '150px' },
      ],
    },
  ],
  allInGroup: [
    {
      name: 'group1',
      children: 'Organic Sessions',
      borders: 'both',
      columns: [
        { name: 'keyword', children: 'Keyword', gtcWidth: '200px' },
        { name: 'kd', children: 'KD,%', gtcWidth: '100px' },
        { name: 'cpc', children: 'CPC', gtcWidth: '80px' },
        { name: 'vol', children: 'Vol.', gtcWidth: '150px' },
      ],
    },
  ],
  fixedGroups: [
    {
      name: 'group1',
      children: 'Borders right Fixed left',
      borders: 'right',
      fixed: 'left',
      columns: [
        { name: 'keyword', children: 'Keyword', gtcWidth: '150px' },
        { name: 'kd', children: 'KD,%', gtcWidth: '100px' },
      ],
    },
    { name: 'cpc', children: 'CPC', gtcWidth: '150px' },
    { name: 'cpc2', children: 'CPC', gtcWidth: '250px' },
    { name: 'cpc3', children: 'CPC', gtcWidth: '350px' },
    {
      name: 'group2',
      children: 'Borders left Fixed right',
      borders: 'left',
      fixed: 'right',
      columns: [
        { name: 'vol', children: 'Vol.', gtcWidth: '200px' },
        { name: 'vol1', children: 'Vol.', gtcWidth: '150px' },
      ],
    },
  ],
};

const Demo = (props: HorizontalScrollProps) => {
  const sizes = layoutSizes[props.layout];
  const data = React.useMemo(
    () => Array.from({ length: props.rowsCount }, (_, index) => rows[index % rows.length]),
    [props.rowsCount],
  );

  return (
    <DataTable
      key={props.layout}
      virtualScroll
      data={data}
      aria-label='Horizontal scroll'
      wMax={props.wMax ?? sizes.wMax}
      h={props.h ?? sizes.h}
      headerProps={{
        sticky: props.sticky,
        withScrollBar: props.withScrollBar,
      }}
      columns={columns[props.layout]}
    />
  );
};

const rows = [
  { keyword: 'ebay buy', kd: '77.8', cpc: '$1.25', cpc2: '$1.25', cpc3: '$1.25', vol: '32,500,000', vol1: '32,500,000' },
  { keyword: 'www.ebay.com', kd: '11.2', cpc: '$3.4', cpc2: '$3.4', cpc3: '$3.4', vol: '65,457,920', vol1: '32,500,000' },
  { keyword: 'www.ebay.com', kd: '10', cpc: '$0.65', cpc2: '$0.65', cpc3: '$0.65', vol: '47,354,640', vol1: '32,500,000' },
  { keyword: 'ebay buy', kd: '-', cpc: '$0', cpc2: '$0', cpc3: '$0', vol: 'n/a', vol1: '32,500,000' },
  { keyword: 'ebay buy', kd: '75.89', cpc: '$0', cpc2: '$0', cpc3: '$0', vol: '21,644,290', vol1: '32,500,000' },
];

export default Demo;
