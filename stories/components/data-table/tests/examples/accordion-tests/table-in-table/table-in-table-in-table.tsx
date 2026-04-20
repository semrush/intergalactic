import { DataTable, ACCORDION } from '@semcore/ui/data-table';
import type { DataTableSort, DataTableProps } from '@semcore/ui/data-table';
import { Text } from '@semcore/ui/typography';
import { NoData } from '@semcore/ui/widget-empty';
import React from 'react';

type SortableColumn = Exclude<keyof typeof data[0], 'keyword'>;
export type TableInTableInTableProps = {
  accordionMode: DataTableProps<typeof data, any, any>['accordionMode'];
  use?: DataTableProps<typeof data, any, any>['use'];
  compact?: DataTableProps<typeof data, any, any>['compact'];
  justifyContent?: string;
  withSkeletonsAndAsyncDataLoading: boolean;
};

const initData = new Array(7).fill({
  keyword: '-',
  kd: '-',
  cpc: '-',
  vol: '-',
}).map((item, index) => {
  return {
    id: (index + 1).toString(),
    ...item,
  };
});

const Demo = (props: TableInTableInTableProps) => {
  const [tableData, setData] = React.useState<typeof data>(props.withSkeletonsAndAsyncDataLoading ? initData : data);
  const [sort, setSort] = React.useState<DataTableSort<keyof typeof data[0]>>(['kd', 'desc']);
  const sortedData = React.useMemo(
    () =>
      [...tableData].sort((aRow, bRow) => {
        const [prop, sortDirection] = sort;
        const a = aRow[prop as SortableColumn]!;
        const b = bRow[prop as SortableColumn]!;
        if (a === b) return 0;
        if (sortDirection === 'asc') return a > b ? 1 : -1;
        else return a > b ? -1 : 1;
      }).map((row) => {
        return {
          ...row,
          [ACCORDION]: Array.isArray(row[ACCORDION])
            ? row[ACCORDION].sort((aRow, bRow) => {
                const [prop, sortDirection] = sort;
                // @ts-ignore
                const a = aRow[prop];
                // @ts-ignore
                const b = bRow[prop];
                if (a === b) return 0;
                if (sortDirection === 'asc') return a > b ? 1 : -1;
                else return a > b ? -1 : 1;
              })
            : row[ACCORDION],
        };
      }),
    [sort, tableData],
  );
  const handleSortChange: (sort: DataTableSort<keyof typeof sortedData[0]>, e?: React.SyntheticEvent) => void = (newSort) => {
    setSort(newSort as DataTableSort<SortableColumn>);
  };

  React.useEffect(() => {
    if (props.withSkeletonsAndAsyncDataLoading) {
      setTimeout(() => {
        setData(data);
      }, 400);
    }
  }, []);

  return (
    <DataTable
      aria-label='Parent'
      h='100%'
      data={sortedData}
      sort={sort}
      uniqueRowKey='id'
      accordionMode={props.accordionMode}
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

const TableExample = () => {
  const containerRef = React.useRef(null);
  const [containerElement, setContainerElement] = React.useState<HTMLDivElement | null>(null);

  React.useEffect(() => {
    setContainerElement(containerRef.current);
  }, []);

  const renderCell: DataTableProps<any, any, any>['renderCell'] = React.useMemo(() => {
    return (props) => {
      if (props.columnName === 'vol' && containerElement) {
        return (
          <Text
            ellipsis:cropPosition='middle'
            ellipsis:containerElement={containerElement}
            ellipsis:recalculateContainerWidth={typeof props.row.vol === 'string'
              ? undefined
              : (width: number) => {
                  return width - 26;
                }}
          >
            {props.value}
          </Text>
        );
      }

      return props.defaultRender();
    };
  }, [containerElement]);

  return (
    <DataTable
      data={data1}
      aria-label='Table title'
      variant='card'
      use='secondary'
      columns={[
        { name: 'keyword', children: 'Keyword', gtcWidth: '200px' },
        { name: 'kd', children: 'KD,%' },
        { name: 'cpc', children: 'CPC' },
        { name: 'vol', children: 'Vol.', gtcWidth: '100px', ref: containerRef },
      ]}
      renderCell={renderCell}
      onKeyDown={(e) => {
        if (e.key !== 'Escape') {
          e.stopPropagation();
        }
      }}
    />
  );
};

const ChartExample = () => {
  return (
    <NoData type='nothing-found' my={7} mx='auto'>
    </NoData>
  );
};
const TableExample1 = () => {
  const containerRef = React.useRef(null);
  const [containerElement, setContainerElement] = React.useState<HTMLDivElement | null>(null);

  React.useEffect(() => {
    setContainerElement(containerRef.current);
  }, []);

  const renderCell: DataTableProps<any, any, any>['renderCell'] = React.useMemo(() => {
    return (props) => {
      if (props.columnName === 'vol' && containerElement) {
        return (
          <Text
            ellipsis:cropPosition='middle'
            ellipsis:containerElement={containerElement}
            ellipsis:recalculateContainerWidth={typeof props.row.vol === 'string'
              ? undefined
              : (width: number) => {
                  return width - 26;
                }}
          >
            {props.value}
          </Text>
        );
      }

      return props.defaultRender();
    };
  }, [containerElement]);

  return (
    <DataTable
      data={data2}
      aria-label='Table title2'
      variant='card'
      columns={[
        { name: 'keyword', children: 'Keyword', gtcWidth: '200px' },
        { name: 'kd', children: 'KD,%' },
        { name: 'cpc', children: 'CPC' },
        { name: 'vol', children: 'Vol.', gtcWidth: '100px', ref: containerRef },
      ]}
      renderCell={renderCell}
      onKeyDown={(e) => {
        if (e.key !== 'Escape') {
          e.stopPropagation();
        }
      }}
    />
  );
};

export const tableInTableInTableProps: TableInTableInTableProps = {
  accordionMode: 'independent',
  use: undefined,
  compact: undefined,
  justifyContent: undefined,
  withSkeletonsAndAsyncDataLoading: false,
};

Demo.defaultProps = tableInTableInTableProps;

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
    vol: {
      toString: () => '65,457,920',
      [ACCORDION]: (<TableExample1 />),
    },
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
    [ACCORDION]: [
      { keyword: 'www.ebay.com www.ebay.com www.ebay.com www.ebay.com мv www.ebay.comм м м мwww.ebay.comvwww.ebay.com мм м м www.ebay.comwww.ebay.comwww.ebay.comwww.ebay.comwww.ebay.com  www.ebay.comм мwww.ebay.comvм www.ebay.comvwww.ebay.comмv www.ebay.comwww.ebay.com www.ebay.comм', kd: '10', cpc: '$3.4', vol: '65,457,920' },
      { keyword: 'www.ebay.com', kd: '11', cpc: '$0.65', vol: '47,354,640' },
      { keyword: 'ebay buy', kd: '-', cpc: '$0', vol: 'n/a' },
    ],
  },
];

const data2 = [
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
    vol: {
      toString: () => '65,457,920',
      [ACCORDION]: (<ChartExample />),
    },
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
    [ACCORDION]: [
      { keyword: 'www.ebay.com www.ebay.com www.ebay.com www.ebay.com мv www.ebay.comм м м мwww.ebay.comvwww.ebay.com мм м м www.ebay.comwww.ebay.comwww.ebay.comwww.ebay.comwww.ebay.com  www.ebay.comм мwww.ebay.comvм www.ebay.comvwww.ebay.comмv www.ebay.comwww.ebay.com www.ebay.comм', kd: '10', cpc: '$3.4', vol: '65,457,920' },
      { keyword: 'www.ebay.com', kd: '11', cpc: '$0.65', vol: '47,354,640' },
      { keyword: 'ebay buy', kd: '-', cpc: '$0', vol: 'n/a' },
    ],
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
      [ACCORDION]: (<TableExample />),
    },
  },
  {
    id: '3',
    keyword: 'www.ebay.com',
    kd: '10',
    cpc: '$0.65',
    vol: '47,354,640',
    [ACCORDION]: (<TableExample />),
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
