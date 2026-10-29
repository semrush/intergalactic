import AmazonM from '@semcore/icon/color/Amazon/m';
import InfoM from '@semcore/icon/Info/m';
import { Flex } from '@semcore/ui/base-components';
import { LinkTrigger } from '@semcore/ui/base-trigger';
import { ButtonLink } from '@semcore/ui/button';
import Checkbox from '@semcore/ui/checkbox';
import type { DataTableProps, DataTableSort } from '@semcore/ui/data-table';
import { DataTable } from '@semcore/ui/data-table';
import Link from '@semcore/ui/link';
import Select from '@semcore/ui/select';
import { DescriptionTooltip } from '@semcore/ui/tooltip';
import { Text } from '@semcore/ui/typography';
import React from 'react';

type TableProps = DataTableProps<any, any, any>;

export type MultiLevelHeaderProps = {
  header: 'bordersAndSorting' | 'interactive';
  sticky: boolean;
  withScrollBar: boolean;
  h: number;
  defaultGridTemplateColumnWidth?: TableProps['defaultGridTemplateColumnWidth'];
  compact: boolean;
  rowsCount: number;
};

export const multiLevelHeaderProps: MultiLevelHeaderProps = {
  header: 'bordersAndSorting',
  sticky: true,
  withScrollBar: false,
  h: 400,
  defaultGridTemplateColumnWidth: undefined,
  compact: false,
  rowsCount: 100,
};

// used when defaultGridTemplateColumnWidth is empty
const variantColumnWidth = {
  bordersAndSorting: '1fr',
  interactive: 'auto',
} as const;

// source rows repeated to rowsCount, so the table always has a vertical scroll
const repeatRows = <T,>(rows: T[], count: number) =>
  Array.from({ length: count }, (_, index) => rows[index % rows.length]);

const options = Array(6)
  .fill('')
  .map((_, index) => ({
    value: index,
    label: `Option ${index}`,
    children: `Option ${index}`,
  }));

const CustomSelect = () => {
  const [isVisible, setIsVisible] = React.useState(false);
  const [value, setValue] = React.useState<number | undefined>(undefined);

  return (
    <Select
      visible={isVisible}
      onVisibleChange={setIsVisible}
      value={value}
      onChange={setValue}
    >
      <Select.Trigger
        tag={LinkTrigger}
        aria-label='Select option'
        color='text-primary'
        size={100}
        data-test-id='select-header'
        onKeyDown={(e: React.KeyboardEvent) => {
          if (!isVisible && (e.key === 'ArrowDown' || e.key === 'ArrowUp')) {
            return false;
          }
          if (
            (e.key === 'ArrowLeft' ||
              e.key === 'ArrowRight' ||
              e.key === 'ArrowDown' ||
              e.key === 'ArrowUp') &&
              isVisible
          ) {
            e.stopPropagation();
          }
        }}
      >
        {value !== undefined ? options[value].label : 'Select option'}
      </Select.Trigger>
      <Select.Menu>
        {options.map((option) => (
          <Select.Option key={option.value} value={option.value}>
            {option.label}
          </Select.Option>
        ))}
      </Select.Menu>
    </Select>
  );
};

type SortableColumn = Exclude<keyof typeof sortingData[0], 'keyword'>;

const Demo = (props: MultiLevelHeaderProps) => {
  const [sort, setSort] = React.useState<DataTableSort<PropertyKey>>(['kd', 'desc']);
  const sortedData = React.useMemo(
    () =>
      repeatRows(sortingData, props.rowsCount).sort((aRow, bRow) => {
        const [prop, sortDirection] = sort;
        const a = aRow[prop as SortableColumn];
        const b = bRow[prop as SortableColumn];
        if (a === b) return 0;
        if (sortDirection === 'asc') return a > b ? 1 : -1;
        else return a > b ? -1 : 1;
      }),
    [sort, props.rowsCount],
  );
  const repeatedInteractiveData = React.useMemo(
    () => repeatRows(interactiveData, props.rowsCount),
    [props.rowsCount],
  );
  const isSorting = props.header === 'bordersAndSorting';
  const data: TableProps['data'] = isSorting ? sortedData : repeatedInteractiveData;

  return (
    <DataTable
      key={props.header}
      virtualScroll
      aria-label='Multi level header'
      data={data}
      sort={isSorting ? sort : undefined}
      onSortChange={isSorting ? setSort : undefined}
      h={props.h}
      defaultGridTemplateColumnWidth={props.defaultGridTemplateColumnWidth || variantColumnWidth[props.header]}
      compact={props.compact}
      headerProps={{
        sticky: props.sticky,
        withScrollBar: props.withScrollBar,
      }}
      columns={isSorting ? sortingColumns : interactiveColumns}
    />
  );
};

const sortingColumns: TableProps['columns'] = [
  {
    name: 'organicSessions',
    children: 'Organic Sessions',
    borders: 'left',
    columns: [
      {
        name: 'kd',
        sortable: true,
        gtcWidth: '100px',
        children: (
          <Text>
            Kd Organic Sessions Organic Sessions
            <ButtonLink addonLeft={AmazonM} title='AmazonM non interactive' color='icon-secondary-neutral' />
          </Text>
        ),
      },
      { name: 'cpc', children: 'CPC', sortable: true },
      { name: 'vol', children: 'Vol.' },
    ],
  },
  { name: 'keyword', children: 'Keyword', sortable: true },
  {
    name: 'organicSessions2',
    children: 'Organic Sessions Organic Sessions Organic SessionsOrganic Sessions Organic Sessions Organic Sessions',
    borders: 'both',
    columns: [
      {
        name: 'kd2',
        sortable: true,
        gtcWidth: '100px',
        children: (
          <>
            <Text ellipsis={true}>Kd Organic Sessions</Text>
            <ButtonLink addonLeft={AmazonM} title='AmazonM non interactive' color='icon-secondary-neutral' />
          </>
        ),
      },
      { name: 'cpc2', children: 'CPC', sortable: true },
      { name: 'vol', children: 'Vol.' },
    ],
  },
  { name: 'other', children: 'Other' },
  {
    name: 'organicSessions3',
    children: 'Organic Sessions',
    borders: 'right',
    columns: [
      {
        name: 'kd',
        children: (
          <>
            <ButtonLink addonLeft={AmazonM} title='AmazonM non interactive' color='icon-secondary-neutral' />
            <ButtonLink addonLeft={AmazonM} title='AmazonM non interactive' color='icon-secondary-neutral' />
          </>
        ),
      },
      { name: 'cpc', children: 'CPC' },
      { name: 'vol', children: 'Vol.' },
    ],
  },
  { name: 'other2', children: 'Other' },
];

const interactiveColumns: TableProps['columns'] = [
  {
    children: 'Keyword',
    name: 'keyword',
    gtcWidth: '300px',
  },
  {
    children: 'Group',
    name: 'group',
    columns: [
      {
        name: 'kd',
        gtcWidth: 'minmax(100px, max-content)',
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
                data-test-id='tooltip-with-interactive-el'
              />
              <DescriptionTooltip.Popper aria-label='Additional info about item 1'>
                Jesus Christ, Joe,
                {' '}
                <Link>fucking forget</Link>
                {' '}
                about it. I'm Mr.
                Pink. Let's move on.
              </DescriptionTooltip.Popper>
            </DescriptionTooltip>
          </Flex>
        ),
      },
      {
        name: 'cpc',
        gtcWidth: 'minmax(300px, max-content)',
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
                data-test-id='tooltip-without-interactive-el'
              />
              <DescriptionTooltip.Popper aria-label='Additional info about checkbox item'>
                Jesus Christ, Joe,
                Pink. Let's move on.
              </DescriptionTooltip.Popper>
            </DescriptionTooltip>
          </Flex>
        ),
      },
      {
        name: 'vol',
        gtcWidth: '300px',
        children: (<CustomSelect />),
      },
    ],
  },
];

const sortingData = [
  {
    keyword: 'ebay buy',
    kd: '77.8',
    kd2: '77.8',
    cpc: '1.25',
    vol: '32,500,000',
    other: 'ebay buy',
  },
  {
    keyword: 'www.ebay.com',
    kd: '11.2',
    kd2: '77.8',
    cpc: '3.4',
    vol: '65,457,920',
    other: 'ebay buy',
  },
  {
    keyword: 'www.ebay.com',
    kd: '10',
    kd2: '77.8',
    cpc: '0.65',
    vol: '47,354,640',
    other: 'ebay buy',
  },
  {
    keyword: 'ebay buy',
    kd: '-',
    kd2: '77.8',
    cpc: '0',
    vol: '2,456,789',
    other: 'ebay buy',
  },
  {
    keyword: 'ebay buy',
    kd: '75.89',
    cpc: '0',
    kd2: '77.8',
    vol: '21,644,290',
    other: 'ebay buy',
  },
  {
    keyword: 'ebay buy',
    kd: '77.8',
    cpc: '1.25',
    kd2: '77.8',
    vol: '32,500,000',
    other: 'ebay buy',
  },
  {
    keyword: 'www.ebay.com',
    kd: '11.2',
    cpc: '3.4',
    kd2: '77.8',
    vol: '65,457,920',
    other: 'ebay buy',
  },
  {
    keyword: 'www.ebay.com',
    kd: '10',
    cpc: '0.65',
    kd2: '77.8',
    vol: '47,354,640',
    other: 'ebay buy',
  },
  {
    keyword: 'ebay buy',
    kd: '-',
    cpc: '0',
    kd2: '77.8',
    vol: '2,456,789',
    other: 'ebay buy',
  },
  {
    keyword: 'ebay buy',
    kd: '75.89',
    cpc: '0',
    kd2: '77.8',
    vol: '21,644,290',
    other: 'ebay buy',
  },
];

const interactiveData = [
  {
    keyword: 'ebay buy',
    kd: '77.8',
    cpc: '$1.25',
    vol: '32,500,000',
  },
  {
    keyword: 'www.ebay.comwww.ebay.comwww.ebay.comwww.ebay.comwww.ebay.com',
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
    keyword: 'www.ebay.comwww.ebay.comwww.ebay.comwww.ebay.comwww.ebay.com',
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

];

export default Demo;
