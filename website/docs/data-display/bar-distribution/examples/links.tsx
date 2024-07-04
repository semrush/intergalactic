import React from 'react';
import { Plot, DistributionBar } from 'intergalactic/d3-chart';
import { scaleLinear, scaleBand } from 'd3-scale';
import { Flex } from 'intergalactic/flex-box';
import { Text } from 'intergalactic/typography';
import Link from 'intergalactic/link';

const Demo = () => {
  const MARGIN = 30;
  const width = 500;
  const height = 500;

  const sum = data.reduce((acc, d) => acc + d.value, 0);

  const xScale = scaleLinear()
    .range([0, width])
    .domain([0, sum]);

  const yScale = scaleBand()
    .range([height - MARGIN, MARGIN])
    .domain([...data].reverse().map((d) => d.category))
    .paddingInner(0.6)
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
          <DistributionBar.Value tag={Link} href="https://semrush.com">
            {({ formatted }) => {
              return <Link.Text>~{formatted}</Link.Text>
            }}
          </DistributionBar.Value>
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
