import { Plot, Line, XAxis, YAxis, ResponsiveContainer, minMax } from '@semcore/ui/d3-chart';
import type { DataTableData } from '@semcore/ui/data-table';
import { DataTable, ACCORDION } from '@semcore/ui/data-table';
import { scaleLinear } from 'd3-scale';
import React from 'react';

export type AccordionInTableProps = {
  loading: boolean;
};

const Demo = (props: AccordionInTableProps) => {
  return (
    <DataTable
      loading={props.loading}
      data={data}
      aria-label='Accordion inside table'
      h='100%'
      defaultGridTemplateColumnWidth='1fr'
      columns={[
        { name: 'keyword', children: 'Keyword', gtcWidth: 'minmax(20%, 50%)' },
        {
          name: 'group',
          children: 'Organic Sessions',
          borders: 'both',
          columns: [
            { name: 'kd', children: 'KD %' },
            { name: 'cpc', children: 'CPC' },
            { name: 'vol', children: 'Vol.' },
          ],
        },
      ]}
    />
  );
};

export const accordionInsideTableDefaultProps = {
  loading: false,
};

Demo.defaultProps = accordionInsideTableDefaultProps;

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
    <ResponsiveContainer onResize={setSize} h={300} w='100%'>
      <Plot
        data={dataChart}
        scale={[xScale, yScale]}
        width={width}
        height={height}
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

const data: DataTableData = [
  {
    keyword: 'ebay buy',
    kd: '77.8',
    cpc: '$1.25',
    vol: '32,500,000',
    [ACCORDION]: <ChartExample />,
  },
  {
    keyword: 'www.ebay.com',
    kd: '11.2',
    cpc: '$3.4',
    vol: {
      toString: () => '65,457,920',
      [ACCORDION]: <ChartExample />,
    },
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
    [ACCORDION]: <ChartExample />,
  },
  {
    keyword: 'ebay buy',
    kd: '75.89',
    cpc: '$0',
    vol: '21,644,290',
    [ACCORDION]: <ChartExample />,
  },
];

export default Demo;
