import { ButtonLink } from '@semcore/button';
import Checkbox from '@semcore/checkbox';
import type { DataTableSort } from '@semcore/data-table';
import { DataTable } from '@semcore/data-table';
import Ellipsis from '@semcore/ellipsis';
import InfoM from '@semcore/icon/Info/m';
import LinkExternalM from '@semcore/icon/LinkExternal/m';
import Link from '@semcore/link';
import Tooltip, { Hint, DescriptionTooltip } from '@semcore/tooltip';
import { Text } from '@semcore/typography';
import React from 'react';
type SortableColumn = Exclude<keyof typeof data[0], 'keyword'>;

const Demo = () => {
  const [sort, setSort] = React.useState<DataTableSort<keyof typeof data[0]>>(['kd', 'asc']);
  const sortedData = React.useMemo(
    () =>
      [...data].sort((aRow, bRow) => {
        const [prop, sortDirection] = sort;
        const a = aRow[prop as SortableColumn];
        const b = bRow[prop as SortableColumn];
        if (a === b) return 0;
        if (sortDirection === 'asc') return a > b ? 1 : -1;
        else return a > b ? -1 : 1;
      }),
    [sort],
  );
  const [selectedRows, setSelectedRows] = React.useState<string[]>([]);
  return (

    <DataTable
      data={sortedData}
      aria-label='Base table example'
      defaultGridTemplateColumnWidth='1fr'
      wMax='1200px'
      hMax='200px'
      sort={sort}
      onSortChange={setSort}
      headerProps={{
        sticky: true,
      }}
      selectedRows={selectedRows}
      onSelectedRowsChange={setSelectedRows}
      columns={[
        {
          name: 'cpc',
          children: (
            <DescriptionTooltip placement='right'>
              Cpc 1
              <DescriptionTooltip.Trigger
                ml={1}
                tag={ButtonLink}
                addonLeft={InfoM}
                color='icon-secondary-neutral'
                aria-label='Additional info 1'
                data-test-id='tooltip-without-interactive-el'
              />
              <DescriptionTooltip.Popper aria-label='Additional info about item 1'>
                Jesus Christ, Joe,
                Pink. Let's move on.
              </DescriptionTooltip.Popper>
            </DescriptionTooltip>
          ),
        },
        {
          name: 'cpc',
          children: (
            <DescriptionTooltip placement='right'>
              Cpc 2
              <DescriptionTooltip.Trigger
                ml={1}
                tag={ButtonLink}
                addonLeft={InfoM}
                color='icon-secondary-neutral'
                aria-label='Additional info 2'
                data-test-id='tooltip-with-interactive-el'
              />
              <DescriptionTooltip.Popper aria-label='Additional info about item 2'>
                Jesus Christ, Joe,
                {' '}
                <Link>fucking forget</Link>
                {' '}
                about it. I'm Mr. Pink. Let's move on.
              </DescriptionTooltip.Popper>
            </DescriptionTooltip>
          ),
        },
        {
          name: 'cpc',
          children: (
            <Tooltip
              tag={Link}
              title='Default tooltip contains short text explaining something about the trigger.'
              data-test-id='tooltip-with-tag-link'
            >
              Keywords
            </Tooltip>
          ),
        },
        {
          name: 'kd',
          sortable: 'asc',
          children: (
            <>
              <Text noWrap>
                Keyword
                {' '}
                <Text color='text-secondary'>(100)</Text>
              </Text>
              <Hint
                ml={1}
                tag={LinkExternalM}
                interactive
                title='Go to our awesome article'
                data-test-id='interactive-icon'
                color='icon-secondary-neutral'
              />
            </>
          ),
        },
        {
          name: 'keyword',
          children: (
            <>
              <Checkbox data-test-id='header-checkbox' />
              <DescriptionTooltip placement='right'>
                Hello
                <DescriptionTooltip.Trigger
                  ml={1}
                  tag={ButtonLink}
                  addonLeft={InfoM}
                  color='icon-secondary-neutral'
                  aria-label='Additional info'
                  data-test-id='few-interactive'
                />
                <DescriptionTooltip.Popper aria-label='Additional info about checkbox item'>
                  Place an additional information here!
                </DescriptionTooltip.Popper>
              </DescriptionTooltip>
            </>
          ),
        },
        {
          name: 'vol',
          sortable: 'desc',
          children: 'Vol.',
          tag: Tooltip,

          title: (
            <>
              Jesus Christ, Joe,
              {' '}
              <Link>fucking forget</Link>
              {' '}
              about it. I'm Mr. Pink. Let's move on.
            </>
          ),
        },
      ]}

      renderCell={(props) => {
        if (props.columnName === 'keyword') {
          return (
            <ButtonLink
              onClick={() => {
                alert(`Click row
                 props: ${JSON.stringify(Object.keys(props), null, '  ')};
                 row: ${JSON.stringify(props.row, null, '  ')};
                 index: ${props.rowIndex};`);
              }}
            >
              {props.value}
            </ButtonLink>
          );
        }
        if (props.columnName === 'vol') {
          return (
            <>
              <Ellipsis trim='middle'>
                {props.value}
              </Ellipsis>
            </>
          );
        }

        return props.defaultRender();
      }}
    />
  );
};

const data = [
  {
    keyword: 'ebay buy',
    kd: '77.8',
    cpc: '$1.25',
    vol: '32,5nknjk00,000',
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
