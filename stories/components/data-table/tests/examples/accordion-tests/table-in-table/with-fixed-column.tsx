import { DataTable, ACCORDION } from '@semcore/ui/data-table';
import type { DataTableProps, DataTableSort } from '@semcore/ui/data-table';
import React from 'react';

type SortableColumn = 'keyword';

export type TableInTableFixedColumnProps = {
  accordionMode: DataTableProps<typeof data, any, any>['accordionMode'];
  variant?: DataTableProps<typeof data, any, any>['variant'];
  use?: DataTableProps<typeof data, any, any>['use'];
  compact?: DataTableProps<typeof data, any, any>['compact'];
  loading?: DataTableProps<typeof data, any, any>['loading'];
  defaultGridTemplateColumnWidth?: DataTableProps<typeof data, any, any>['defaultGridTemplateColumnWidth'];
  sticky: boolean;
  withScrollBar: boolean;
};
const Demo = (props: TableInTableFixedColumnProps) => {
  const [sort, setSort] = React.useState<DataTableSort<SortableColumn>>(['keyword', 'asc']);

  const sortedData = React.useMemo(() => {
    const [sortBy, sortDirection] = sort;

    return [...data].sort((aRow, bRow) => {
      const a = aRow[sortBy];
      const b = bRow[sortBy];

      if (a === b) return 0;

      return sortDirection === 'asc' ? (a > b ? 1 : -1) : (a > b ? -1 : 1);
    });
  }, [sort]);

  const handleSortChange: (sort: DataTableSort<keyof typeof data[0]>) => void = (newSort) => {
    setSort(newSort as DataTableSort<SortableColumn>);
  };

  return (
    <DataTable
      data={sortedData}
      uniqueRowKey='id'
      sort={sort}
      onSortChange={handleSortChange}
      aria-label='Parent'
      accordionMode={props.accordionMode}
      headerProps={{ sticky: props.sticky, withScrollBar: props.withScrollBar }}

      variant={props.variant}
      loading={props.loading}
      use={props.use}
      compact={props.compact}
      onAccordionToggle={(type, rowIndex) => {
        console.log(`Accordion ${type} for row #${rowIndex}`);
      }}
      h={200}
      w={400}
      columns={[
        { name: 'keyword', children: 'Keyword', gtcWidth: '200px', fixed: 'left', sortable: true },
        { name: 'kd', children: 'KD,%', gtcWidth: '200px' },
        { name: 'cpc', children: 'CPC', gtcWidth: '200px' },
        { name: 'vol', children: 'Vol.', gtcWidth: '200px' },
      ]}
    />
  );
};

export const tableInTableFixedColumnDefaultProps: TableInTableFixedColumnProps = {
  accordionMode: 'independent',
  variant: undefined,
  use: undefined,
  compact: undefined,
  defaultGridTemplateColumnWidth: '1fr',
  loading: undefined,
  withScrollBar: false,
  sticky: false,
};

Demo.defaultProps = tableInTableFixedColumnDefaultProps;

const data = [
  {
    id: '1',
    keyword: 'ebay buy',
    kd: '77.8',
    cpc: '$1.25',
    vol: '32,500,000',
    [ACCORDION]: [
      {
        id: '1-1',
        keyword: 'www.ebay.com',
        kd: '11.2',
        cpc: '$3.4',
        vol: '65,457,920',
      },
      {
        id: '1-2',
        keyword: 'www.ebay.com',
        kd: '10',
        cpc: '$0.65',
        vol: '47,354,640',
      },
      {
        id: '1-3',
        keyword: 'ebay buy',
        kd: '-',
        cpc: '$0',
        vol: 'n/a',
      },
    ],
  },
  {
    id: '2',
    keyword: 'www.ebay.com',
    kd: '11.2',
    cpc: '$3.4',
    vol: '65,457,920',
    [ACCORDION]: [
      {
        id: '2-1',
        keyword: 'www.ebay.com',
        kd: '11.2',
        cpc: '$3.4',
        vol: '65,457,920',
      },
      {
        id: '2-2',
        keyword: 'www.ebay.com',
        kd: '10',
        cpc: '$0.65',
        vol: '47,354,640',
      },
      {
        id: '2-3',
        keyword: 'ebay buy',
        kd: '-',
        cpc: '$0',
        vol: 'n/a',
      },
    ],
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
    keyword: 'ebay buy',
    kd: '75.89',
    cpc: '$0',
    vol: '21,644,290',
  },
];

export default Demo;
