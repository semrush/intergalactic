import React from 'react';
import { scaleLinear } from 'd3-scale';
import DataTable from '@semcore/data-table';
import Accordion from '@semcore/accordion';
import { Flex } from '@semcore/flex-box';
import { Plot, Line, XAxis, YAxis, ResponsiveContainer, minMax } from '@semcore/d3-chart';

const RowAccordion = React.forwardRef(function (
  { value, collapse = {}, ...props }: any,
  ref: React.Ref<HTMLDivElement>,
) {
  return (
    <Accordion.Item value={value} ref={ref}>
      <Accordion.Item.Toggle {...props} />
      <Accordion.Item.Collapse {...collapse} preserveNode />
    </Accordion.Item>
  );
});

const Demo = () => {
  const [exapnded, setExapnded] = React.useState<number[]>([]);

  return (
    /* [1] Wrapping the table in the Accordion control component; */
    <Accordion value={exapnded} onChange={setExapnded}>
      <DataTable data={data} aria-label={'Table title. Accordion inside table'}>
        <DataTable.Head>
          <DataTable.Column name='keyword' children='Keyword' />
          <DataTable.Column name='kd' children='KD,%' />
          <DataTable.Column name='cpc' children='CPC' />
          <DataTable.Column name='vol' children='Vol.' />
        </DataTable.Head>
        <DataTable.Body>
          {/* [2] Replacing the tag in DataTable.Row with our extended tag with Accordion.Item */}
          <DataTable.Row tag={RowAccordion}>
            {(_props, _row, index) => {
              return {
                /* [3] Setting the value for Accordion.Item; */
                value: index,
                /* [4] Calculating the active line to highlight it */
                active: exapnded.includes(index),
                collapse: {
                  /* [5] Render the children to accordion content; */
                  children: <ChartExample />,
                },
              };
            }}
          </DataTable.Row>
          <DataTable.Cell data={data} name='keyword'>
            {(props) => {
              return {
                children: (
                  <Flex alignItems='center'>
                    {/* [6] Set the arrow (Chevron icon), if necessary. */}
                    <Accordion.Item.Chevron color='icon-secondary-neutral' mr={2} />
                    {props.children}
                  </Flex>
                ),
              };
            }}
          </DataTable.Cell>
        </DataTable.Body>
      </DataTable>
    </Accordion>
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
    <ResponsiveContainer h={300} onResize={setSize}>
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

const data = [
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
