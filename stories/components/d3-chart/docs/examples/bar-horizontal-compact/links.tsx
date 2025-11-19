import { Flex } from '@semcore/ui/base-components';
import { Plot, CompactHorizontalBar } from '@semcore/ui/d3-chart';
import Link from '@semcore/ui/link';
import { Text } from '@semcore/ui/typography';
import { scaleLinear, scaleBand } from 'd3-scale';
import React from 'react';

import BarMockData from '../../../__mocks__/d3-chart/bar';

const Demo = () => {
  const MARGIN = 30;
  const width = 500;
  const height = 500;

  const sum = data.reduce((acc, d) => acc + d.bar, 0);

  const xScale = scaleLinear().range([0, width]).domain([0, sum]);

  const yScale = scaleBand()
    .range([height - MARGIN, MARGIN])
    .domain([...data].reverse().map((d) => d.category))
    .paddingInner(0.6)
    .paddingOuter(0.2);

  return (
    <Plot data={data} scale={[xScale, yScale]} width={width} height={height}>
      <CompactHorizontalBar x='bar' y='category'>
        <CompactHorizontalBar.Hover />
        <CompactHorizontalBar.Tooltip>
          {({ index }) => {
            return {
              children: (
                <>
                  <CompactHorizontalBar.Tooltip.Title>
                    {data[index].category}
                  </CompactHorizontalBar.Tooltip.Title>
                  <Flex justifyContent='space-between'>
                    <CompactHorizontalBar.Tooltip.Dot mr={4}>Bar</CompactHorizontalBar.Tooltip.Dot>
                    <Text bold>{data[index].bar}</Text>
                  </Flex>
                </>
              ),
            };
          }}
        </CompactHorizontalBar.Tooltip>
        <CompactHorizontalBar.Annotation>
          <CompactHorizontalBar.Label />
          <CompactHorizontalBar.Percent />
          <CompactHorizontalBar.Value tag={Link} href='https://semrush.com'>
            {({ formatted }) => {
              return (
                <Link.Text>
                  ~
                  {formatted}
                </Link.Text>
              );
            }}
          </CompactHorizontalBar.Value>
        </CompactHorizontalBar.Annotation>
        <CompactHorizontalBar.Bar>
          <CompactHorizontalBar.Bar.Background />
          <CompactHorizontalBar.Bar.Fill />
        </CompactHorizontalBar.Bar>
      </CompactHorizontalBar>
    </Plot>
  );
};

const data = BarMockData.Default;

export default Demo;
