import React from 'react';
import { scaleLinear } from 'd3-scale';
import { DataTable, ACCORDION, DataTableData } from '@semcore/data-table';
import { Plot, Line, XAxis, YAxis, ResponsiveContainer, minMax } from '@semcore/d3-chart';

const Demo = () => {
  return (
      <DataTable data={data} aria-label={'Accordion inside table'} h={'100%'} defaultGridTemplateColumnWidth={'1fr'} virtualScroll
                 columns={[
                   {name: 'keyword', children: 'Keyword', gtcWidth: 'minmax(60%, 80%)'},
                   {
                     children: 'Organic Sessions',
                     borders: 'both',
                     columns: [
                       {name: 'kd', children: 'KD,%'},
                       {name: 'cpc', children: 'CPC'},
                       {name: 'vol', children: 'Vol.'},
                     ]}
                 ]}
      />
  );
};

const ChartExample = () => {
  const [[width, height], setSize] = React.useState([0, 0]);
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
    <ResponsiveContainer h={300} onResize={setSize} style={{background: '#fff'}}>
      <Plot data={dataChart} scale={[xScale, yScale]} width={width} height={height}>
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
    [ACCORDION]: (<ChartExample/>),
  },
  {
    keyword: 'www.ebay.com',
    kd: '11.2',
    cpc: '$3.4',
    vol: {
      toString: () => '65,457,920',
      [ACCORDION]: (<ChartExample/>),
    },
  },
  {
    keyword: 'www.ebay.com',
    kd: '10',
    cpc: '$0.65',
    vol: '47,354,640',
    [ACCORDION]: (<ChartExample/>),
  },
  {
    keyword: 'ebay buy',
    kd: '-',
    cpc: '$0',
    vol: 'n/a',
    [ACCORDION]: (<ChartExample/>),
  },
  {
    keyword: 'ebay buy',
    kd: '75.89',
    cpc: '$0',
    vol: '21,644,290',
    [ACCORDION]: (<ChartExample/>),
  },
  {
    keyword: 'www.ebay.com',
    kd: '10',
    cpc: '$0.65',
    vol: '47,354,640',
    [ACCORDION]: (<ChartExample/>),
  },
  {
    keyword: 'ebay buy',
    kd: '-',
    cpc: '$0',
    vol: 'n/a',
    [ACCORDION]: (<ChartExample/>),
  },
  {
    keyword: 'ebay buy',
    kd: '75.89',
    cpc: '$0',
    vol: '21,644,290',
    [ACCORDION]: (<ChartExample/>),
  },{
    keyword: 'www.ebay.com',
    kd: '10',
    cpc: '$0.65',
    vol: '47,354,640',
    [ACCORDION]: (<ChartExample/>),
  },
  {
    keyword: 'ebay buy',
    kd: '-',
    cpc: '$0',
    vol: 'n/a',
    [ACCORDION]: (<ChartExample/>),
  },
  {
    keyword: 'ebay buy',
    kd: '75.89',
    cpc: '$0',
    vol: '21,644,290',
    [ACCORDION]: (<ChartExample/>),
  },{
    keyword: 'www.ebay.com',
    kd: '10',
    cpc: '$0.65',
    vol: '47,354,640',
    [ACCORDION]: (<ChartExample/>),
  },
  {
    keyword: 'ebay buy',
    kd: '-',
    cpc: '$0',
    vol: 'n/a',
    [ACCORDION]: (<ChartExample/>),
  },
  {
    keyword: 'ebay buy',
    kd: '75.89',
    cpc: '$0',
    vol: '21,644,290',
    [ACCORDION]: (<ChartExample/>),
  },
];

export default Demo;
