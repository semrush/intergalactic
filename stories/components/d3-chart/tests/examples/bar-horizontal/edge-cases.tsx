import React from 'react';
import {
  Plot,
  Chart,
  GroupBar,
  HorizontalBar,
  YAxis,
  XAxis,
  HoverRect,
} from '@semcore/d3-chart';
import { scaleBand, scaleLinear } from 'd3-scale';
import { Flex } from '@semcore/flex-box';
import { Text } from '@semcore/typography';

const BarChartExamples = () => {
  const width = 400;
  const height = 150;
  const MARGIN = 40;

  // Общие масштабные функции
  const x = scaleLinear().domain([0, 15]).range([MARGIN * 2, width - MARGIN]);
  const y = scaleBand()
    .domain(['Alpha', 'Beta'])
    .range([height - MARGIN, MARGIN])
    .padding(0.2);

  const xGroup = scaleLinear().domain([0, 10]).range([MARGIN * 2, width - MARGIN]);
  const yGroup = scaleBand()
    .domain(['Group A', 'Group B'])
    .range([height - MARGIN, MARGIN])
    .padding(0.3);

  return (
    <Flex direction='column'>
      <Flex direction='row'>
      {/* 1. Chart.Bar (basic, invertAxis) */}
      <Chart.Bar
        groupKey="category"
        data={[
          { category: 'Cat A', bar: 3 },
          { category: 'Cat B', bar: 7 },
        ]}
        plotWidth={width}
        plotHeight={height}
        invertAxis
        aria-label="Basic horizontal chart"
      />

      {/* 2. Chart.Bar with group type */}
      <Chart.Bar
        groupKey="category"
        type="group"
        invertAxis
        data={[
          { category: 'Cat A', bar1: 2, bar2: 3 },
          { category: 'Cat B', bar1: 5, bar2: 1 },
        ]}
        plotWidth={width}
        plotHeight={height}
        onClickHoverRect={(index, e) => console.log('HoverRect clicked', index)}
        onClickBar={(index, key, e) => console.log('Bar clicked', index, key)}
      />

     
</Flex>
<Flex direction='row'>
      {/* 4. HorizontalBar with full props */}
      <Plot data={[{ name: 'Alpha', value: 10 }, { name: 'Beta', value: 5 }]} scale={[x, y]} width={width} height={height}>
        <YAxis>
          <YAxis.Ticks />
        </YAxis>
        <XAxis>
          <XAxis.Ticks />
        </XAxis>
        <HorizontalBar
          x="value"
          y="name"
          color="tomato"
          duration={0}
          r={[6, 6, 0, 0]}
          onClick={(d, e, i, key) => console.log('Clicked:', d, key)}
          transparent
          maxBarSize={20}
        />
      </Plot>

      {/* 5. GroupBar.HorizontalBar with scaleGroup and maxBarSize and transparent */}
      <Plot
        data={[
          { group: 'Group A', v1: 2, v2: 4 },
          { group: 'Group B', v1: 3, v2: 5 },
        ]}
        scale={[xGroup, yGroup]}
        width={width}
        height={height}
      >
        <YAxis>
          <YAxis.Ticks />
        </YAxis>
        <XAxis>
          <XAxis.Ticks />
        </XAxis>
        <GroupBar y="group" maxBarSize={20}>
          <GroupBar.HorizontalBar x="v1" transparent={true}/>
          <GroupBar.HorizontalBar x="v2" />
        </GroupBar>
      </Plot>

    
      </Flex>
      </Flex>
  );
};

export default BarChartExamples;
