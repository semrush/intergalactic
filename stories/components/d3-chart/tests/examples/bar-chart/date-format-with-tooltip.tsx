import React from 'react';
import { scaleLinear, scaleBand } from 'd3-scale';
import { Bar, ResponsiveContainer, XAxis, Plot, YAxis, HoverRect } from '@semcore/d3-chart';
import { Flex } from '@semcore/flex-box';
import { Text } from '@semcore/typography';

const Demo = () => {
  const [[width, height], setSize] = React.useState([0, 0]);
  const MARGIN = 40;

  const data = React.useMemo(() => {
    return [...Array(10).keys()].map((d, i) => {
      const date = new Date(1594791280000 + 1000000000 * i);
      return {
        download: 172 + 10 * i,
        date_chart: date.toISOString(), 
        date_original: date, 
        category: `Item ${i + 1}`,
        bar: `${172 + 10 * i}`,
      };
    });
  }, []);

  const xScale = scaleBand()
    .domain(data.map((d) => d.date_chart)) 
    .range([MARGIN, width - MARGIN])
    .paddingInner(0.4)
    .paddingOuter(0.2);

  const yScale = scaleLinear()
    .domain([0, Math.max(...data.map((d) => d.download))])
    .range([height - MARGIN, MARGIN]);

  const getDate = (date: Date) =>
    new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    }).format(date);

  return (
    <ResponsiveContainer h={300} onResize={setSize}>
      <Plot data={data} scale={[xScale, yScale]} width={width} height={height}>
        <YAxis ticks={yScale.ticks(4)}>
          <YAxis.Ticks />
          <YAxis.Grid />
        </YAxis>
        <XAxis>
          <XAxis.Ticks>
            {({ value, index }) => {
              const item = data.find((d) => d.date_chart === value);
              return {
                children: item && index % 2 === 0 ? getDate(item.date_original) : '',
                value,
              };
            }}
          </XAxis.Ticks>
        </XAxis>
        <HoverRect.Tooltip x="date_chart" wMin={100}>
          {({ xIndex }) => {
            const item = data[xIndex];
            return {
              children: (
                <>
                  <HoverRect.Tooltip.Title>{item.category}</HoverRect.Tooltip.Title>
                  <Flex justifyContent="space-between">
                    <HoverRect.Tooltip.Dot mr={4}>Bar</HoverRect.Tooltip.Dot>
                    <Text bold>{item.bar}</Text>
                  </Flex>
                </>
              ),
            };
          }}
        </HoverRect.Tooltip>
        <Bar x="date_chart" y="download" />
      </Plot>
    </ResponsiveContainer>
  );
};

export default Demo;
