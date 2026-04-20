import AmazonM from '@semcore/icon/color/Amazon/m';
import type { BoxProps } from '@semcore/ui/base-components';
import { Box } from '@semcore/ui/base-components';
import { ButtonLink } from '@semcore/ui/button';
import { DataTable } from '@semcore/ui/data-table';
import type { DataTableSort, DataTableProps } from '@semcore/ui/data-table';
import { Text } from '@semcore/ui/typography';
import React from 'react';

type RowData = typeof data[0];
type SortableColumn = Exclude<keyof RowData, 'keyword' | 'other'>;
export type MultiLevelSortingProps = {
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
    name: 'group1',
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
            <ButtonLink size={100} addonLeft={AmazonM} title='AmazonM non interactive' color='icon-secondary-neutral' />
          </Text>
        ),
      },
      {
        name: 'cpc',
        children: 'CPC',
        sortable: true,
      },
      {
        name: 'vol',
        children: 'Vol.',
      },
    ],
  },
  {
    name: 'keyword',
    children: 'Keyword',
    sortable: true,
  },
  {
    name: 'group2',
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
            <ButtonLink size={100} addonLeft={AmazonM} title='AmazonM non interactive' color='icon-secondary-neutral' />
          </>
        ),
      },
      {
        name: 'cpc2',
        children: 'CPC',
        sortable: true,

      },
      {
        name: 'vol2',
        children: (props) => {
          const containerRef = React.useRef<HTMLDivElement | null>(null);
          const [headerCell, setHeaderCell] = React.useState<HTMLElement | null>(null);

          React.useEffect(() => {
            if (containerRef.current) {
              const cell = containerRef.current.closest('[role="columnheader"]') as HTMLElement;
              if (cell) {
                setHeaderCell(cell);
                if (!cell.hasAttribute('tabindex')) {
                  cell.setAttribute('tabindex', '0');
                }
              }
            }
          }, []);

          return (
            <Box ref={containerRef} display='inline-flex' wMin={0}>
              <Text
                ellipsis={true}
                hint:placement='bottom'
                hint:triggerRef={{ current: headerCell }}
                wMin={0}
              >
                Vol.Vol.Vol.Vol.Vol.
              </Text>
            </Box>
          );
        },
      },
    ],
  },
  {
    name: 'other',
    children: 'Other',
  },
  {
    name: 'group3',
    children: 'Another Group',
    borders: 'right',
    columns: [
      {
        name: 'kd3',
        children: (
          <>
            <ButtonLink size={100} addonLeft={AmazonM} title='AmazonM non interactive' color='icon-secondary-neutral' />
            <ButtonLink size={100} addonLeft={AmazonM} title='AmazonM non interactive' color='icon-secondary-neutral' />
          </>
        ),
      },
      {
        name: 'cpc3',
        children: 'CPC',
      },
      {
        name: 'vol3',
        children: 'Vol.',
      },
    ],
  },
  {
    name: 'other2',
    children: 'Other 2',
  },
];

const Demo = (props: MultiLevelSortingProps) => {
  const [sort, setSort] = React.useState<DataTableSort<keyof RowData>>(['kd', 'desc']);

  const sortedData = React.useMemo(() => {
    const [prop, direction] = sort;
    return [...data].sort((a, b) => {
      const aValue = a[prop as SortableColumn];
      const bValue = b[prop as SortableColumn];

      if (aValue === bValue) return 0;
      if (direction === 'asc') return aValue > bValue ? 1 : -1;
      return aValue > bValue ? -1 : 1;
    });
  }, [sort]);

  return (
    <DataTable
      aria-label='Borders'
      sort={sort}
      onSortChange={setSort}
      defaultGridTemplateColumnWidth={props.defaultGridTemplateColumnWidth}
      compact={props.compact}
      sideIndents={props.sideIndents}
      loading={props.loading}
      w={props.w}
      h={props.h}
      use={props.use}
      headerProps={{
        sticky: props.sticky,
        withScrollBar: props.withScrollBar,
      }}
      data={sortedData}
      columns={columns}
    />
  );
};

export const multiLevelSortingProps: MultiLevelSortingProps = {
  sideIndents: undefined,
  compact: undefined,
  h: '100%',
  w: undefined,
  defaultGridTemplateColumnWidth: '1fr',
  loading: undefined,
  sticky: true,
  withScrollBar: undefined,
  use: 'primary',
};
Demo.defaultProps = multiLevelSortingProps;

const data = [
  {
    keyword: 'ebay buy',
    kd: '77.8',
    kd2: '77.8',
    cpc: '1.25',
    cpc2: '1.25',
    vol: '32,500,000',
    other: 'ebay buy',
    other2: 'ebay buy',
  },
  {
    keyword: 'www.ebay.com',
    kd: '11.2',
    kd2: '11.2',
    cpc: '3.4',
    cpc2: '3.4',
    vol: '65,457,920',
    other: 'ebay buy',
    other2: 'ebay buy',
  },
  {
    keyword: 'www.ebay.com',
    kd: '10',
    kd2: '10',
    cpc: '0.65',
    cpc2: '0.65',
    vol: '47,354,640',
    other: 'ebay buy',
    other2: 'ebay buy',
  },
  {
    keyword: 'ebay buy',
    kd: '-',
    kd2: '-',
    cpc: '0',
    cpc2: '0',
    vol: '2,456,789',
    other: 'ebay buy',
    other2: 'ebay buy',
  },
  {
    keyword: 'ebay buy',
    kd: '75.89',
    kd2: '75.89',
    cpc: '0',
    cpc2: '0',
    vol: '21,644,290',
    other: 'ebay buy',
    other2: 'ebay buy',
  },
];

export default Demo;
