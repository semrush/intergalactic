import InfoM from '@semcore/icon/Info/m';
import LinkExternalM from '@semcore/icon/LinkExternal/m';
import { Flex } from '@semcore/ui/base-components';
import { ButtonLink } from '@semcore/ui/button';
import type { DataTableProps, DataTableSort } from '@semcore/ui/data-table';
import { DataTable } from '@semcore/ui/data-table';
import Link from '@semcore/ui/link';
import { DescriptionTooltip } from '@semcore/ui/tooltip';
import React from 'react';

type TableProps = DataTableProps<any, any, any>;

export type OneLevelHeaderProps = {
  use: 'primary' | 'secondary';
  sticky: boolean;
  h: number;
  rowsCount: number;
};

export const oneLevelHeaderProps: OneLevelHeaderProps = {
  use: 'secondary',
  sticky: true,
  h: 400,
  rowsCount: 100,
};

type Row = typeof rows[0];
type SortableColumn = Exclude<keyof Row, 'keyword'>;

const Demo = (props: OneLevelHeaderProps) => {
  const [sort, setSort] = React.useState<DataTableSort<keyof Row>>(['kd', 'asc']);
  const sortedData = React.useMemo(
    () =>
      Array.from({ length: props.rowsCount }, (_, index) => rows[index % rows.length]).sort((aRow, bRow) => {
        const [prop, sortDirection] = sort;
        const a = aRow[prop as SortableColumn];
        const b = bRow[prop as SortableColumn];
        if (a === b) return 0;
        if (sortDirection === 'asc') return a > b ? 1 : -1;
        else return a > b ? -1 : 1;
      }),
    [sort, props.rowsCount],
  );

  return (
    <DataTable
      virtualScroll
      data={sortedData}
      use={props.use}
      defaultGridTemplateColumnWidth='1fr'
      aria-label='One level header'
      sort={sort}
      onSortChange={setSort}
      h={props.h}
      headerProps={{ sticky: props.sticky }}
      columns={columns}
    />
  );
};

const columns: TableProps['columns'] = [
  { name: 'keyword', children: 'Keyword', sortable: true },
  {
    name: 'kd',
    sortable: 'asc',
    children: (
      <Flex alignItems='center'>
        <DescriptionTooltip placement='right'>
          KD,%
          <DescriptionTooltip.Trigger
            ml={1}
            tag={ButtonLink}
            size={100}
            addonLeft={InfoM}
            color='icon-secondary-neutral'
            aria-label='About KD'
            data-test-id='tooltip-with-interactive-el'
          />
          <DescriptionTooltip.Popper aria-label='About KD'>
            Keyword difficulty.
            {' '}
            <Link>Learn more</Link>
          </DescriptionTooltip.Popper>
        </DescriptionTooltip>
      </Flex>
    ),
  },
  { name: 'cpc', children: 'CPC', sortable: 'desc' },
  {
    name: 'vol',
    children: (
      <Flex alignItems='center'>
        Vol.
        <ButtonLink
          ml={1}
          size={100}
          addonLeft={LinkExternalM}
          title='Go to our awesome article'
          data-test-id='interactive-icon'
          color='icon-secondary-neutral'
        />
      </Flex>
    ),
  },
];

const rows = [
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
  }, {
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
  }, {
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
  }, {
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
  }, {
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
