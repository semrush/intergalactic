import Button from '@semcore/button';
import { Plot, Line, XAxis, YAxis, ResponsiveContainer, minMax } from '@semcore/d3-chart';
import type { DataTableData, DataTableProps } from '@semcore/data-table';
import { DataTable, ACCORDION } from '@semcore/data-table';
import { Flex } from '@semcore/flex-box';
import { Text } from '@semcore/typography';
import { scaleLinear } from 'd3-scale';
import React from 'react';
export type AccordionWithButtonProps = {
  accordionMode: DataTableProps<typeof data, any, any>['accordionMode'];
  limitedRows?: number;
  limitedColumns?: number;
};

const Demo = (props: AccordionWithButtonProps) => {
  const { limitedRows, limitedColumns } = props;

  return (
    <DataTable
      data={data}
      aria-label='Accordion inside table'
      accordionMode={props.accordionMode}
      onAccordionToggle={(type, i) => {
        console.log('called', type, i);
      }}
      h='300px'
      defaultGridTemplateColumnWidth='1fr'
      limit={{
        rows: limitedRows,
        columns: limitedColumns,
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
        { name: 'keyword', children: 'Keyword', gtcWidth: 'minmax(20%, 50%)' },
        {
          name: 'group',
          children: 'Organic Sessions',
          borders: 'both',
          columns: [
            { name: 'kd', children: 'KD,%' },
            { name: 'cpc', children: 'CPC' },
            { name: 'vol', children: 'Vol.' },
          ],
        },
      ]}
    />
  );
};
export const accordionWithDefaultProps: AccordionWithButtonProps = {
  accordionMode: 'independent',
  limitedRows: undefined,
  limitedColumns: undefined,
};

Demo.defaultProps = accordionWithDefaultProps;

const ChartExample = () => {
  const [[width, height], setSize] = React.useState([600, 300]);
  const MARGIN = 40;
  const [dataChart, setDataChart] = React.useState<any[]>([]);

  React.useEffect(() => {
    const dataChart = Array(20)
      .fill({})
      .map((d, i) => ({
        x: i,
        y: Math.random() * 10,
      }));
    setDataChart(dataChart);
  }, []);
  const xScale = scaleLinear()
    .range([MARGIN, width - MARGIN])
    .domain(minMax(dataChart, 'x'));
  const yScale = scaleLinear()
    .range([height - MARGIN, MARGIN])
    .domain([0, 10]);
  return (
    <ResponsiveContainer onResize={setSize} h={300} w='100%' style={{ background: '#fff' }}>
      <Plot data={dataChart} scale={[xScale, yScale]} width={width} height={height} style={{ background: '#fff' }}>
        <YAxis>
          <YAxis.Ticks />
          <YAxis.Grid />
        </YAxis>
        <XAxis>
          <XAxis.Ticks />
        </XAxis>
        <Line x='x' y='y'>
          <Line.Dots display />
        </Line>
      </Plot>
    </ResponsiveContainer>
  );
};

const data: DataTableData = [
  {
    keyword: 'ebay buy',
    kd: '77.8',
    cpc: '$1.25',
    vol: '32,500,000',
    [ACCORDION]: (<ChartExample />),
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
    kd: (
      <span>
        10
        <Button>Click Me</Button>
      </span>
    ),
    cpc: '$0.65',
    vol: '47,354,640',
    [ACCORDION]: (<ChartExample />),
  },
  {
    keyword: 'ebay buy',
    kd: '-',
    cpc: '$0',
    vol: 'n/a',
    [ACCORDION]: (<ChartExample />),
  },
  {
    keyword: 'ebay buy',
    kd: '75.89',
    cpc: '$0',
    vol: '21,644,290',
    [ACCORDION]: (<ChartExample />),
  },
];

export default Demo;
