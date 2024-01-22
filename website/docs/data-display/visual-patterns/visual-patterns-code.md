---
title: Visual patterns
fileSource: d3-chart
tabName: Design
docs: true
tabs: Visual patterns('visual-patterns'), API('visual-patterns-api'), Examples('visual-patterns-code')
---

# Simple use

To enable visual patterns on chart, simple add `pattern` prop to the chart component that accepts it.

`pattern` prop is inherited by all children components. So, you can apply it both to _end_ components like `Line` and to _container_ components like `Plot` .

::: sandbox

<script lang="tsx">
import React from 'react'; 
import { Chart } from '@semcore/ui/d3-chart'; 
import { curveCardinal } from 'd3-shape'; 

const Demo = () => {
  return (
    <Chart.Area
      data={data}
      plotWidth={500}
      plotHeight={200}
      groupKey={'time'}
      stacked={true}
      curve={curveCardinal}
      patterns
      showXAxis={false}
    />
  ); 
}; 

const date = new Date(); 
const data = [... Array(5).keys()].map((d, i) => ({
  time: new Date(date.setDate(date.getDate() + 5)), 
  stack1: Math.random() * 5, 
  stack2: Math.random() * 5, 
  stack3: Math.random() * 5, 
})); 
</script>

:::

# Enforcing patterns

You can enforce use of build-in patterns by using it's names. The following list of patterns is available:

1. `starSmall`
1. `romb`
1. `circleOutline`
1. `triangleDown`
1. `rombOutline`
1. `square`
1. `trees`
1. `wave`
1. `star`
1. `cogwheel`
1. `crossesDiagonal`
1. `triangleOutline`
1. `chain`
1. `squama`
1. `linesDouble`
1. `zigzagVertical`
1. `triangleDownOutline`
1. `crosses`
1. `linesDoubleHorizontal`
1. `waveVertical`
1. `squareOutline`
1. `triangle`
1. `crescent`
1. `zigzag`

::: sandbox

<script lang="tsx">
import React from 'react';
import { Plot, XAxis, YAxis, minMax, StackedArea, HoverLine } from '@semcore/ui/d3-chart';
import { scaleLinear } from 'd3-scale';
import { Flex, Box } from '@semcore/ui/flex-box';
import { Text } from '@semcore/ui/typography';
import { curveCardinal } from 'd3-shape';

const Demo = () => {
  const MARGIN = 40;
  const width = 500;
  const height = 300;

  const xScale = scaleLinear()
    .range([MARGIN, width - MARGIN])
    .domain(minMax(data, 'time'));

  const yScale = scaleLinear()
    .range([height - MARGIN, MARGIN])
    .domain([0, 15]);

  return (
    <Plot data={data} scale={[xScale, yScale]} width={width} height={height}>
      <YAxis>
        <YAxis.Ticks />
        <YAxis.Grid />
      </YAxis>
      <StackedArea x='time'>
        <StackedArea.Area y='stack1' curve={curveCardinal} patterns="crosses">
          <StackedArea.Area.Dots />
        </StackedArea.Area>
        <StackedArea.Area y='stack2' curve={curveCardinal} patterns="linesDouble">
          <StackedArea.Area.Dots />
        </StackedArea.Area>
        <StackedArea.Area y='stack3' curve={curveCardinal} patterns="linesDoubleHorizontal">
          <StackedArea.Area.Dots />
        </StackedArea.Area>
      </StackedArea>
    </Plot>
  );
};

const date = new Date();
const data = [...Array(5).keys()].map((d, i) => ({
  time: new Date(date.setDate(date.getDate() + 5)),
  stack1: Math.random() * 5,
  stack2: Math.random() * 5,
  stack3: Math.random() * 5,
}));
</script>

:::

# Custom patterns

You can provide custom pattern object to enforce it's form. The pattern object should include both fill and symbol properties.

The fill data is used for rendering charts like a `Area` while symbol data is needed to render corresponding symbol in chart legend or on line dots.

::: sandbox 

<script  lang="tsx">
import React from 'react';
import { Chart, Pattern } from '@semcore/ui/d3-chart';

const customPattern: Pattern = {
  fill: {
    viewBox: '0 0 21 20',
    children: (
      <>
        <path d='M9.17 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 0 0 .951.69h3.461c.969 0 1.372 1.24.588 1.81l-2.8 2.034a1 1 0 0 0-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.539 1.118l-2.8-2.034a1 1 0 0 0-1.175 0l-2.8 2.034c-.784.57-1.839-.197-1.54-1.118l1.07-3.292a1 1 0 0 0-.363-1.118L3.1 8.72c-.784-.57-.381-1.81.587-1.81H7.15a1 1 0 0 0 .95-.69l1.07-3.292Z' />
      </>
    ),
  },
  symbol: {
    viewBox: '0 0 33 32',
    size: [16.41, 15.66],
    children: (
      <>
        <path d='M15.049.927c.3-.921 1.603-.921 1.902 0l2.866 8.82a1 1 0 0 0 .95.69h9.274c.97 0 1.372 1.24.588 1.81l-7.502 5.45a1 1 0 0 0-.364 1.119l2.866 8.82c.3.92-.755 1.687-1.539 1.117l-7.502-5.45a1 1 0 0 0-1.176 0l-7.502 5.45c-.784.57-1.838-.196-1.54-1.118l2.867-8.82a1 1 0 0 0-.364-1.117l-7.502-5.451c-.784-.57-.381-1.81.588-1.81h9.273a1 1 0 0 0 .951-.69L15.05.927Z' />
      </>
    ),
  },
}

const Demo = () => {
  return (
    <Chart.Line
      data={data}
      plotWidth={500}
      plotHeight={200}
      groupKey={'x'}
      xTicksCount={data.length / 2}
      patterns={customPattern}
      showDots
      showTooltip
    />
  );
};

const data = Array(20)
  .fill({})
  .map((d, i) => ({
    x: i,
    y1: Math.random() * 10,
  }));
</script>

:::

You can also provide a list of patterns.

::: sandbox

<script lang="tsx">
import React from 'react';
import { Plot, Venn, colors } from '@semcore/ui/d3-chart';
import { Text } from '@semcore/ui/typography';

const data = {
  G: 200,
  F: 200,
  C: 500,
  U: 1,
  'G/F': 100,
  'G/C': 100,
  'F/C': 100,
  'G/F/C': 100,
};

const patterns = [
   {
    fill: {
      viewBox: '0 0 12 12',
      children: (
        <>
          <path
            fillRule='evenodd'
            clipRule='evenodd'
            d='M5.625 8.875C5.625 9.4067 5.91354 10.0738 6.77174 10.5888L8.05798 11.3605L6.5145 13.933L5.22826 13.1612C3.58646 12.1762 2.625 10.5933 2.625 8.875C2.625 7.1567 3.58646 5.57384 5.22826 4.58876C6.08646 4.07384 6.375 3.4067 6.375 2.875C6.375 2.3433 6.08646 1.67616 5.22826 1.16124L3.94202 0.389496L5.4855 -2.18298L6.77174 -1.41124C8.41354 -0.42616 9.375 1.1567 9.375 2.875C9.375 4.5933 8.41354 6.17616 6.77174 7.16124C5.91354 7.67616 5.625 8.3433 5.625 8.875Z'
          />
        </>
      ),
    },
    symbol: {
      viewBox: '0 0 21 20',
      size: [16, 17.14],
      children: (
        <>
          <path d='M8.823 1.336 6.596 0h8.62a8.593 8.593 0 0 1 1.29 4.512c0 3.183-1.78 6.116-4.823 7.941-1.59.954-2.125 2.19-2.125 3.176 0 .985.535 2.22 2.125 3.175L13.677 20H5.206A8.578 8.578 0 0 1 4 15.629c0-3.184 1.781-6.117 4.823-7.942 1.59-.954 2.125-2.19 2.125-3.175 0-.986-.534-2.222-2.125-3.176Z' />
        </>
      ),
    },
  },
  {
    fill: {
      viewBox: '0 0 12 12',
      children: (
        <>
          <path
            fillRule='evenodd'
            clipRule='evenodd'
            d='M3 5.5C2.4683 5.5 1.80116 5.78854 1.28624 6.64674L0.514495 7.93298L-2.05798 6.3895L-1.28624 5.10326C-0.30116 3.46146 1.2817 2.5 3 2.5C4.7183 2.5 6.30116 3.46146 7.28624 5.10326C7.80116 5.96146 8.4683 6.25 9 6.25C9.5317 6.25 10.1988 5.96146 10.7138 5.10326L11.4855 3.81702L14.058 5.3605L13.2862 6.64674C12.3012 8.28854 10.7183 9.25 9 9.25C7.2817 9.25 5.69884 8.28854 4.71376 6.64674C4.19884 5.78854 3.5317 5.5 3 5.5Z'
          />
        </>
      ),
    },
    symbol: {
      viewBox: '0 0 21 20',
      size: [17.14, 14],
      children: (
        <>
          <path d='m20.121 6.457-.027-.017-1.43 2.383c-.954 1.59-2.19 2.125-3.176 2.125-.985 0-2.22-.534-3.175-2.125C10.488 5.781 7.555 4 4.372 4c-1.503 0-2.95.397-4.25 1.136v8.339l1.074-1.792c.954-1.59 2.19-2.125 3.176-2.125.985 0 2.22.535 3.175 2.125 1.825 3.042 4.758 4.823 7.942 4.823 1.651 0 3.235-.479 4.632-1.365V6.457Z' />
        </>
      ),
    },
  },
]

const Demo = () => {
  return (
    <Plot height={300} width={400} data={data} patterns={patterns}>
      <Venn>
        <Venn.Circle dataKey='G' name='Good' />
        <Venn.Circle dataKey='F' name='Fast' />
        <Venn.Intersection dataKey='G/F' name='Good & Fast' />
      </Venn>
    </Plot>
  );
};
</script>

:::
