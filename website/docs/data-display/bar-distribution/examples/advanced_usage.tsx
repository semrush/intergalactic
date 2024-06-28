import React from 'react';
import { Plot, DistributionBar, YAxis, XAxis, HoverRect } from '@semcore/ui/d3-chart';
import { scaleLinear, scaleBand } from 'd3-scale';
import { Flex } from '@semcore/ui/flex-box';
import { Text } from '@semcore/ui/typography';

const Demo = () => {
  const MARGIN = 30;
  const width = 500;
  const height = 500;

  const sum = data.reduce((acc, d) => acc + d.value, 0);

  const xScale = scaleLinear()
    .range([MARGIN * 2, width - MARGIN])
    .domain([0, sum]);

  const yScale = scaleBand()
    .range([height - MARGIN, MARGIN])
    .domain(data.map((d) => d.category))
    .paddingInner(0.7)
    .paddingOuter(0.2);

  return (
    <Plot data={data} scale={[xScale, yScale]} width={width} height={height}>

      <DistributionBar x='value' y='category'>
        <DistributionBar.Hover />
        <DistributionBar.Tooltip>
          {({ index }) => {
            return {
              children: (
                <>
                  <DistributionBar.Tooltip.Title>{data[index].category}</DistributionBar.Tooltip.Title>
                  <Flex justifyContent='space-between'>
                    <DistributionBar.Tooltip.Dot mr={4}>Bar</DistributionBar.Tooltip.Dot>
                    <Text bold>{data[index].value}</Text>
                  </Flex>
                </>
              ),
            };
          }}
        </DistributionBar.Tooltip>
        <DistributionBar.Annotation>
          <DistributionBar.Label />
          <DistributionBar.Percent />
          <DistributionBar.Value />
        </DistributionBar.Annotation>
        <DistributionBar.Bar>
          <DistributionBar.Bar.Background />
          <DistributionBar.Bar.Fill />
        </DistributionBar.Bar>
      </DistributionBar>
    </Plot>
  );
};

const data = [
  {
    category: 'Schema.org (Microdata)',
    value: 0,
  },
  {
    category: 'Open graph',
    value: 9650,
  },
  {
    category: 'Twitter cards',
    value: 7650,
  },
  {
    category: 'Microformats',
    value: 14650,
  },
  {
    category: 'Schema.org (JSON-LD)',
    value: 135650,
  },
];

export default Demo;
