import InfoM from '@semcore/icon/Info/m';
import LinkExternalM from '@semcore/icon/LinkExternal/m';
import { Flex } from '@semcore/ui/base-components';
import type { BoxProps } from '@semcore/ui/base-components';
import { ButtonLink } from '@semcore/ui/button';
import Checkbox from '@semcore/ui/checkbox';
import { DataTable } from '@semcore/ui/data-table';
import type { DataTableSort, DataTableProps } from '@semcore/ui/data-table';
import Link from '@semcore/ui/link';
import Tooltip, { DescriptionTooltip } from '@semcore/ui/tooltip';
import { Text } from '@semcore/ui/typography';
import React from 'react';

type SortableColumn = Exclude<keyof typeof data[0], 'keyword'>;

export type OneLevelInteractiveExampleProps = {
  compact?: DataTableProps<typeof data, any, any>['compact'];
  use?: DataTableProps<typeof data, any, any>['use'];
  loading?: DataTableProps<typeof data, any, any>['loading'];
  defaultGridTemplateColumnWidth?: DataTableProps<typeof data, any, any>['defaultGridTemplateColumnWidth'];
  sticky: boolean;
  withScrollBar?: boolean;
  sideIndents?: DataTableProps<typeof data, any, any>['sideIndents'];
  top?: number;

} & BoxProps;

const columns: DataTableProps<typeof data, any, any>['columns'] = [

  {
    name: 'cpc',
    children: (
      <Flex alignItems='center'>
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
      </Flex>
    ),
  },
  {
    name: 'cpc',
    children: (
      <Flex alignItems='center'>
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
      </Flex>
    ),
  },
  {
    name: 'cpc',
    children: (
      <Flex alignItems='center'>
        <Tooltip
          tag={Link}
          title='Default tooltip contains short text explaining something about the trigger.'
          data-test-id='tooltip-with-tag-link'
        >
          Keywords
        </Tooltip>
      </Flex>
    ),
  },
  {
    name: 'kd',
    sortable: 'asc',
    children: (
      <Flex alignItems='center'>
        <Text noWrap>
          Keyword
          {' '}
          <Text color='text-secondary'>(100)</Text>
        </Text>
        <ButtonLink
          ml={1}
          addonLeft={LinkExternalM}
          title='Go to our awesome article'
          data-test-id='interactive-icon'
          color='icon-secondary-neutral'
        />
      </Flex>
    ),
  },
  {
    name: 'keyword',
    children: (
      <Flex alignItems='center'>
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
      </Flex>
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
];

const Demo = (props: OneLevelInteractiveExampleProps) => {
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
      defaultGridTemplateColumnWidth={props.defaultGridTemplateColumnWidth}
      compact={props.compact}
      sideIndents={props.sideIndents}
      loading={props.loading}
      wMax={props.wMax}
      h={props.h}
      use={props.use}
      onSortChange={setSort}
      sort={sort}

      headerProps={{
        sticky: props.sticky,
        withScrollBar: props.withScrollBar,
      }}
      selectedRows={selectedRows}
      onSelectedRowsChange={setSelectedRows}
      columns={columns}
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
              <Text ellipsis={{ cropPosition: 'middle' }}>
                {props.value}
              </Text>
            </>
          );
        }

        return props.defaultRender();
      }}
    />
  );
};

export const oneLevelInteractiveExampleProps: OneLevelInteractiveExampleProps = {
  sideIndents: undefined,
  compact: undefined,
  h: '400px',
  wMax: '1200px',
  defaultGridTemplateColumnWidth: '1fr',
  loading: undefined,
  sticky: true,
  withScrollBar: undefined,
  use: 'primary',

};
Demo.defaultProps = oneLevelInteractiveExampleProps;

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
