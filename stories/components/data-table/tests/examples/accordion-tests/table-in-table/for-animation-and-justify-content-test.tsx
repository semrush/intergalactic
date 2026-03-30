import { DataTable, ACCORDION } from '@semcore/ui/data-table';
import type { DataTableSort, DataTableProps } from '@semcore/ui/data-table';
import { Text } from '@semcore/ui/typography';
import React from 'react';

type SortableColumn = Exclude<keyof typeof data[0], 'keyword'>;
export type AccordionWithTablenProps = {
  accordionMode: DataTableProps<typeof data, any, any>['accordionMode'];
  sideIndents?: DataTableProps<typeof data, any, any>['sideIndents'];
  use?: DataTableProps<typeof data, any, any>['use'];
  compact?: DataTableProps<typeof data, any, any>['compact'];
  justifyContent?: string;
};

const Demo = (props: AccordionWithTablenProps) => {
  const [sort, setSort] = React.useState<DataTableSort<keyof typeof data[0]>>(['kd', 'desc']);
  const sortedData = React.useMemo(
    () =>
      [...data].sort((aRow, bRow) => {
        const [prop, sortDirection] = sort;
        const a = aRow[prop as SortableColumn]!;
        const b = bRow[prop as SortableColumn]!;
        if (a === b) return 0;
        if (sortDirection === 'asc') return a > b ? 1 : -1;
        else return a > b ? -1 : 1;
      }).map((row) => {
        return {
          ...row,
          [ACCORDION]: row[ACCORDION]?.sort((aRow, bRow) => {
            const [prop, sortDirection] = sort;
            // @ts-ignore
            const a = aRow[prop];
            // @ts-ignore
            const b = bRow[prop];
            if (a === b) return 0;
            if (sortDirection === 'asc') return a > b ? 1 : -1;
            else return a > b ? -1 : 1;
          }),
        };
      }),
    [sort],
  );
  const handleSortChange: (sort: DataTableSort<keyof typeof sortedData[0]>, e?: React.SyntheticEvent) => void = (newSort) => {
    setSort(newSort as DataTableSort<SortableColumn>);
  };

  return (
    <DataTable
      aria-label='Parent'
      h='100%'
      data={sortedData}
      sort={sort}
      uniqueRowKey='id'
      accordionMode={props.accordionMode}
      sideIndents={props.sideIndents}
      use={props.use}
      compact={props.compact}
      onSortChange={handleSortChange}
      columns={[
        { name: 'keyword', children: 'Keyword', gtcWidth: '200px', fixed: 'left', sortable: true, justifyContent: props.justifyContent },
        { name: 'kd', children: 'KD,%', gtcWidth: '200px', sortable: true },
        { name: 'cpc', children: 'CPC', gtcWidth: '200px', sortable: true },
        { name: 'vol', children: 'Vol.', gtcWidth: '200px', sortable: true },
      ]}
    />
  );
};

const ChartExample = () => {
  return (
    <DataTable
      data={data1}
      aria-label='Table title'
      columns={[
        { name: 'keyword', children: 'Keyword' },
        { name: 'kd', children: 'KD,%' },
        { name: 'cpc', children: 'CPC' },
        { name: 'vol', children: 'Vol.', gtcWidth: '100px' },
      ]}
      expandedRows={new Set<string>()}
      renderCell={(props) => {
        if (props.columnName === 'vol') {
          return (
            <Text ellipsis:cropPosition='middle' display='block'>
              {props.value}
            </Text>
          );
        }

        return props.defaultRender();
      }}
      onKeyDown={(e) => {
        if (e.key !== 'Escape') {
          e.stopPropagation();
        }
      }}
    />
  );
};

export const accordionWithTablenProps: AccordionWithTablenProps = {
  accordionMode: 'independent',
  sideIndents: undefined,
  use: undefined,
  compact: undefined,
  justifyContent: undefined,
};

Demo.defaultProps = accordionWithTablenProps;

const data1 = [
  {
    keyword: 'ebay buy',
    kd: '77.8',
    cpc: '$1.25',
    vol: '32,500,000,500,00032,500,000,500,00032,500,000,500,000',
  },
  {
    keyword: 'www.ebay.com',
    kd: '11.2',
    cpc: '$3.4',
    vol: '65,457,920,000,50032,500,000,500,00032,500,000,500,000',
  },
  {
    keyword: 'www.ebay.com',
    kd: '10',
    cpc: '$0.65',
    vol: '47,354,640,000,50032,500,000,500,00032,500,000,500,00032,500,000,500,000',
  },
  {
    keyword: 'ebay buy',
    kd: '75.89',
    cpc: '$0',
    vol: '21,644,290,000,500',
  },
];

const data = [
  {
    id: '1',
    keyword: 'ebay buy1',
    kd: '77.8',
    cpc: '$1.25',
    vol: '32,500,000',
    [ACCORDION]: [
      { keyword: 'www.ebay.com', kd: '11.2', cpc: '$3.4', vol: '65,457,920' },
      { keyword: 'www.ebay.com', kd: '10', cpc: '$0.65', vol: '47,354,640' },
      { keyword: 'ebay buy', kd: '-', cpc: '$0', vol: 'n/a' },
      { keyword: 'www.ebay.com', kd: '11.2', cpc: '$3.4', vol: '65,457,920' },
      { keyword: 'www.ebay.com', kd: '10', cpc: '$0.65', vol: '47,354,640' },
      { keyword: 'ebay buy', kd: '-', cpc: '$0', vol: 'n/a' },
      { keyword: 'www.ebay.com', kd: '11.2', cpc: '$3.4', vol: '65,457,920' },
      { keyword: 'www.ebay.com', kd: '10', cpc: '$0.65', vol: '47,354,640' },
      { keyword: 'ebay buy', kd: '-', cpc: '$0', vol: 'n/a' },
      { keyword: 'www.ebay.com', kd: '11.2', cpc: '$3.4', vol: '65,457,920' },
      { keyword: 'www.ebay.com', kd: '10', cpc: '$0.65', vol: '47,354,640' },
      { keyword: 'ebay buy', kd: '-', cpc: '$0', vol: 'n/a' },
      { keyword: 'www.ebay.com', kd: '11.2', cpc: '$3.4', vol: '65,457,920' },
      { keyword: 'www.ebay.com', kd: '10', cpc: '$0.65', vol: '47,354,640' },
      { keyword: 'ebay buy', kd: '-', cpc: '$0', vol: 'n/a' },
      { keyword: 'www.ebay.com', kd: '11.2', cpc: '$3.4', vol: '65,457,920' },
      { keyword: 'www.ebay.com', kd: '10', cpc: '$0.65', vol: '47,354,640' },
      { keyword: 'ebay buy', kd: '-', cpc: '$0', vol: 'n/a' },
      { keyword: 'www.ebay.com', kd: '11.2', cpc: '$3.4', vol: '65,457,920' },
      { keyword: 'www.ebay.com', kd: '10', cpc: '$0.65', vol: '47,354,640' },
      { keyword: 'ebay buy', kd: '-', cpc: '$0', vol: 'n/a' },
    ],
  },
  {
    id: '2',
    keyword: 'www.ebay.com',
    kd: '11.2',
    cpc: '$3.4',
    vol: {
      toString: () => '65,457,920',
      [ACCORDION]: (<ChartExample />),
    },
  },
  {
    id: '3',
    keyword: 'www.ebay.com',
    kd: '10',
    cpc: '$0.65',
    vol: '47,354,640',
  },
  {
    id: '4',
    keyword: 'ebay buy',
    kd: '-',
    cpc: '$0',
    vol: 'n/a',
  },
  {
    id: '5',
    keyword: 'ebay buy2',
    kd: '75.89',
    cpc: '$0',
    vol: '21,644,290',
    [ACCORDION]: [
      { keyword: 'www.ebay.com www.ebay.com www.ebay.com www.ebay.com мv www.ebay.comм м м мwww.ebay.comvwww.ebay.com мм м м www.ebay.comwww.ebay.comwww.ebay.comwww.ebay.comwww.ebay.com  www.ebay.comм мwww.ebay.comvм www.ebay.comvwww.ebay.comмv www.ebay.comwww.ebay.com www.ebay.comм', kd: '10', cpc: '$3.4', vol: '65,457,920' },
      { keyword: 'www.ebay.com', kd: '11', cpc: '$0.65', vol: '47,354,640' },
      { keyword: 'ebay buy', kd: '-', cpc: '$0', vol: 'n/a' },
    ],
  },
  {
    id: '6',
    keyword: 'ebay buy3',
    kd: '100',
    cpc: '$0',
    vol: '21,644',
    [ACCORDION]: [
      { keyword: 'www.ebay.com', kd: '10', cpc: '$3.4', vol: '65,457,920' },
      { keyword: 'www.ebay.com', kd: '11', cpc: '$0.65', vol: '47,354,640' },
      { keyword: 'ebay buy', kd: '-', cpc: '$0', vol: 'n/a' },
    ],
  },
  {
    id: '7',
    keyword: 'ebay buy4',
    kd: '-',
    cpc: '$0',
    vol: '21,644',
    [ACCORDION]: [
      { keyword: 'www.ebay.com', kd: '10', cpc: '$3.4', vol: '65,457,920' },
      { keyword: 'www.ebay.com', kd: '11', cpc: '$0.65', vol: '47,354,640' },
      { keyword: 'ebay buy', kd: '-', cpc: '$0', vol: 'n/a' },
    ],
  },
];

export default Demo;
