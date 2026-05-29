import Card from '@semcore/ui/card';
import { Plot, Line, XAxis, YAxis, ResponsiveContainer, minMax } from '@semcore/ui/d3-chart';
import type { DataTableProps } from '@semcore/ui/data-table';
import { ACCORDION, DataTable } from '@semcore/ui/data-table';
import { scaleLinear } from 'd3-scale';
import React from 'react';

export const tableInCardDefaultProps: TableInCardProps = {
  variant: 'card',
  use: undefined,
  compact: undefined,
};

const Demo = (props: TableInCardProps) => (
  <Card>
    <Card.Header>
      <Card.Title tag='h3'>Card Title</Card.Title>
    </Card.Header>
    <Card.Body pt={0} px={0} pb={1}>
      <DataTable
        data={data}
        aria-label='Table in card'
        variant={props.variant}
        use={props.use}
        compact={props.compact}
        columns={[
          { name: 'keyword', children: 'Keyword' },
          { name: 'kd', children: 'KD,%' },
          { name: 'cpc', children: 'CPC' },
          { name: 'vol', children: 'Vol.' },
        ]}
      />
    </Card.Body>
  </Card>
);

const ChartExample = () => {
  const [[width, height], setSize] = React.useState([600, 300]);
  const MARGIN = 40;
  const [dataChart, setDataChart] = React.useState<any[]>([]);

  React.useEffect(() => {
    const dataChart = Array(20)
      .fill({})
      .map((d, i) => ({
        x: i,
        y: (i % 10) + 1,
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
    <ResponsiveContainer onResize={setSize} h={200} w='100%' bg='bg-primary-neutral'>
      <Plot
        data={dataChart}
        scale={[xScale, yScale]}
        width={width}
        height={height}
        bg='bg-primary-neutral'
      >
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

export type TableInCardProps = {
  variant?: DataTableProps<typeof data, any, any>['variant'];
  use?: DataTableProps<typeof data, any, any>['use'];
  compact?: DataTableProps<typeof data, any, any>['compact'];
};

Demo.defaultProps = tableInCardDefaultProps;

const data = [
  {
    keyword: 'ebay buy',
    kd: '77.8',
    cpc: '$1.25',
    vol: '32,500,000',
    [ACCORDION]: [
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
    ],
  },
  {
    keyword: 'www.ebay.com',
    kd: '10',
    cpc: '$0.65',
    vol: '47,354,640',
    [ACCORDION]: <ChartExample />,
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
    keyword: 'www.ebay.com',
    kd: '11.2',
    cpc: '$3.4',
    vol: '65,457,920',
    [ACCORDION]: [
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
    ],
  },
];

export default Demo;
