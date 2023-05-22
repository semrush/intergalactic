import React, { useState } from 'react';
import { scaleLinear } from 'd3-scale';
import DataTable from '@semcore/ui/data-table';
import Accordion from '@semcore/ui/accordion';
import { Flex } from '@semcore/ui/flex-box';
import { Plot, Line, XAxis, YAxis, ResponsiveContainer, minMax } from '@semcore/ui/d3-chart';

const RowAccordion = React.forwardRef(function ({ value, collapse = {}, ...props }, ref) {
  return (
    <Accordion.Item value={value} ref={ref}>
      <Accordion.Item.Toggle {...props} />
      <Accordion.Item.Collapse {...collapse} />
    </Accordion.Item>
  );
});

export default () => {
  const [exapnded, setExapnded] = useState([]);
  return (
    /* [1] Wrapping the table in the Accordion control component; */
    <Accordion value={exapnded} onChange={setExapnded}>
      <DataTable data={data}>
        <DataTable.Head>
          <DataTable.Column name="keyword" children="Keyword" />
          <DataTable.Column name="kd" children="KD,%" />
          <DataTable.Column name="cpc" children="CPC" />
          <DataTable.Column name="vol" children="Vol." />
        </DataTable.Head>
        <DataTable.Body>
          {/* [2] Replacing the tag in DataTable.Row with our extended tag with Accordion.Item */}
          <DataTable.Row<typeof data> tag={RowAccordion}>
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
          <DataTable.Cell<typeof data> name="keyword">
            {(props) => {
              return {
                children: (
                  <Flex alignItems="center">
                    {/* [6] Set the arrow (Chevron icon), if necessary. */}
                    <Accordion.Item.Chevron color="stone" mr={2} />
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
  const [[width, height], setSize] = useState([0, 0]);
  const MARGIN = 40;
  const dataChart = Array(20)
    .fill({})
    .map((d, i) => ({
      x: i,
      y: Math.random() * 10,
    }));
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
        <Line x="x" y="y">
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
