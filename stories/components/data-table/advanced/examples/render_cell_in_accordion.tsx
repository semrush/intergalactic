import { DataTable, ACCORDION, type DataTableProps } from '@semcore/ui/data-table';
import { Text } from '@semcore/ui/typography';
import { NoData } from '@semcore/ui/widget-empty';
import React from 'react';

const ChartExample1 = () => {
  return (
    <NoData type='nothing-found' my={7} mx='auto'>
    </NoData>
  );
};

export function renderCell(cellProps: any) {
  const { column, rawData, defaultRender, isAccordionRow } = cellProps;

  if (isAccordionRow) {
    console.log('render accordion cell', rawData);
  }

  const rawValue = rawData[column.name];

  if (rawValue === null || rawValue === undefined) {
    return '—';
  }

  return defaultRender();
}

const Demo = () => {
  return (
    <DataTable
      aria-label='Parent'
      h='100%'
      data={data}
      uniqueRowKey='id'
      accordionDuration={400}
      renderCell={renderCell}
      columns={[
        { name: 'keyword', children: 'Keyword', gtcWidth: '200px', fixed: 'left' },
        { name: 'kd', children: 'KD,%', gtcWidth: '200px' },
        { name: 'cpc', children: 'CPC', gtcWidth: '200px' },
        { name: 'vol', children: 'Vol.', gtcWidth: '200px' },
      ]}
    />
  );
};

const ChartExample = () => {
  const containerRef = React.useRef(null);
  const [containerElement, setContainerElement] = React.useState<HTMLDivElement | null>(null);

  React.useEffect(() => {
    setContainerElement(containerRef.current);
  }, []);

  const renderCell: DataTableProps<any, any, any>['renderCell'] = React.useMemo(() => {
    return (props) => {
      if (props.columnName === 'vol' && containerElement) {
        return (
          <Text ellipsis:cropPosition='middle' ellipsis:containerElement={containerElement}>
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
      columns={[
        { name: 'keyword', children: 'Keyword' },
        { name: 'kd', children: 'KD,%' },
        { name: 'cpc', children: 'CPC' },
        { name: 'vol', children: 'Vol.', gtcWidth: '100px', ref: containerRef },
      ]}
      expandedRows={new Set<string>()}
      renderCell={renderCell}
      onKeyDown={(e) => {
        if (e.key !== 'Escape') {
          e.stopPropagation();
        }
      }}
    />
  );
};

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
      { keyword: null, kd: '11.2', cpc: undefined, vol: '65,457,920' },
      { keyword: null, kd: '10', cpc: '$0.65', vol: '47,354,640' },
      { keyword: 'ebay buy', kd: '-', cpc: '$0', vol: 'n/a' },
      { keyword: null, kd: '11.2', cpc: undefined, vol: '65,457,920' },
      { keyword: null, kd: '10', cpc: '$0.65', vol: '47,354,640' },
      { keyword: 'ebay buy', kd: '-', cpc: '$0', vol: 'n/a' },
      { keyword: null, kd: '11.2', cpc: undefined, vol: '65,457,920' },
      { keyword: 'www.ebay.com', kd: '10', cpc: '$0.65', vol: '47,354,640' },
      { keyword: 'ebay buy', kd: '-', cpc: '$0', vol: 'n/a' },
      { keyword: 'www.ebay.com', kd: '11.2', cpc: undefined, vol: '65,457,920' },
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
    id: '4',
    keyword: 'ebay buy',
    kd: '-',
    cpc: '$0',
    vol: 'n/a',
    [ACCORDION]: (<ChartExample1 />),
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
