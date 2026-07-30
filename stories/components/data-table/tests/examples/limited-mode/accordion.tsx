import { Flex } from '@semcore/ui/base-components';
import Button from '@semcore/ui/button';
import { DataTable, ACCORDION } from '@semcore/ui/data-table';
import type { DataTableProps } from '@semcore/ui/data-table';
import { Text } from '@semcore/ui/typography';
import { NoData } from '@semcore/ui/widget-empty';
import React from 'react';

export type TableInTableProps = {
  accordionMode: DataTableProps<typeof data, any, any>['accordionMode'];
  rowsLimit?: number;
  columnsLimit?: number;
};

const ChartExample1 = () => {
  return (
    <NoData type='nothing-found' my={7} mx='auto'>
    </NoData>
  );
};

const Demo = (props: TableInTableProps) => {
  const { rowsLimit, columnsLimit } = props;

  return (
    <DataTable
      aria-label='Parent'
      h='100%'
      data={data}
      accordionMode={props.accordionMode}
      limit={{
        fromRow: rowsLimit,
        fromColumn: columnsLimit,
        renderOverlay() {
          return (
            <Flex alignItems='center' direction='column' gap={3} py={6} wMax={320}>
              <Text size={300} fontWeight='bold' textAlign='center'>You've reached your report limit for today</Text>
              <Text size={200} textAlign='center'>
                To increase your daily report limit,upgrade to a Guru plan.
              </Text>
              <Button
                theme='success'
                use='primary'
              >
                Upgrade to Guru
              </Button>

            </Flex>
          );
        },
      }}
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
export const tableInTableDefaultProps: TableInTableProps = {
  accordionMode: 'independent',
  columnsLimit: 1,
  rowsLimit: 1,
};

Demo.defaultProps = tableInTableDefaultProps;

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

    keyword: 'ebay buy1',
    kd: '77.8',
    cpc: '$1.25',
    vol: '32,500,000',
    [ACCORDION]: [
      { keyword: 'www.ebay.com', kd: '11.2', cpc: '$3.4', vol: '65,457,920' },
      { keyword: 'www.ebay.com', kd: '10', cpc: '$0.65', vol: '47,354,640' },
      { keyword: 'ebay buy', kd: '-', cpc: '$0', vol: 'n/a' },
      { keyword: 'www.ebay.com', kd: '11.2', cpc: '$3.4', vol: '65,457,920' },
    ],
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

    keyword: 'ebay buy',
    kd: '-',
    cpc: '$0',
    vol: 'n/a',
    [ACCORDION]: (<ChartExample1 />),
  },
  {
    keyword: 'ebay buy2',
    kd: '75.89',
    cpc: '$0',
    vol: '21,644,290',
    [ACCORDION]: [
      { keyword: 'www.ebay.comww.ebbay.comww.eb bay.comww.eby.comм', kd: '10', cpc: '$3.4', vol: '65,457,920' },
      { keyword: 'www.ebay.com', kd: '11', cpc: '$0.65', vol: '47,354,640' },
      { keyword: 'ebay buy', kd: '-', cpc: '$0', vol: 'n/a' },
    ],
  },
  {
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
