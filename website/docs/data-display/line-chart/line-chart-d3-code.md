---
title: Line chart
fileSource: d3-chart
tabs: Design('line-chart'), A11y('line-chart-a11y'), API('line-chart-api'), Examples('line-chart-d3-code'), Changelog('d3-chart-changelog')
---

::: tip
For core principles, concept description, API and changelog, refer to the [D3 chart principles](/data-display/d3-chart/d3-chart).
:::

## Basic usage

::: sandbox

<script lang="tsx">
import React from 'react';
import { Chart } from '@semcore/ui/d3-chart';

const Demo = () => {
  return (
    <Chart.Line
      data={data}
      plotWidth={500}
      plotHeight={200}
      groupKey={'x'}
      xTicksCount={data.length / 2}
    />
  );
};

const data = Array(20)
  .fill({})
  .map((d, i) => ({
    x: i,
    y1: Math.random() * 10,
    y2: Math.random() * 10,
  }));
</script>

:::

## Line

- Line charts are displayed using the `Line` component.
- `Dots` are the dots on the line chart.

::: sandbox

<script lang="tsx">
import React from 'react';
import { Plot, Line, XAxis, YAxis, minMax } from '@semcore/ui/d3-chart';
import { scaleLinear } from 'd3-scale';

const Demo = () => {
  const MARGIN = 40;
  const width = 500;
  const height = 300;

  const xScale = scaleLinear()
    .range([MARGIN, width - MARGIN])
    .domain(minMax(data, 'x'));

  const yScale = scaleLinear()
    .range([height - MARGIN, MARGIN])
    .domain([0, 10]);

  return (
    <Plot data={data} scale={[xScale, yScale]} width={width} height={height}>
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
  );
};

const data = Array(20)
  .fill({})
  .map((d, i) => ({
    x: i,
    y: Math.random() * 10,
  }));
</script>

:::

## Line with area

- You must define `y0` and `y1` in `Line.Area` props and in the `data`.

::: sandbox

<script lang="tsx">
import React from 'react';
import { Plot, Line, XAxis, YAxis, minMax } from '@semcore/ui/d3-chart';
import { scaleLinear } from 'd3-scale';

const Demo = () => {
  const MARGIN = 40;
  const width = 500;
  const height = 300;

  const xScale = scaleLinear()
    .range([MARGIN, width - MARGIN])
    .domain(minMax(data, 'x'));

  const yScale = scaleLinear()
    .range([height - MARGIN, MARGIN])
    .domain([0, 10]);

  return (
    <Plot data={data} scale={[xScale, yScale]} width={width} height={height}>
      <YAxis>
        <YAxis.Ticks />
        <YAxis.Grid />
      </YAxis>
      <XAxis>
        <XAxis.Ticks />
      </XAxis>
      <Line x='x' y='y'>
        <Line.Area y0='y0' y1='y1' />
      </Line>
    </Plot>
  );
};

const data = Array(20)
  .fill({})
  .map((d, i) => {
    const y = Math.random() * 10;

    return {
      x: i,
      y,
      y0: y + 2,
      y1: y - 2,
    };
  });
</script>

:::

## Hover line

- The `HoverLine` component is responsible for the hover effect. Use it with line charts.
- You can set the orientation of the component using the `vertical` and `horizontal` properties.

::: sandbox

<script lang="tsx">
import React from 'react';
import { Plot, XAxis, YAxis, HoverLine, minMax } from '@semcore/ui/d3-chart';
import { scaleLinear } from 'd3-scale';

const Demo = () => {
  const MARGIN = 40;
  const width = 500;
  const height = 300;

  const xScale = scaleLinear()
    .range([MARGIN, width - MARGIN])
    .domain(minMax(data, 'x'));

  const yScale = scaleLinear()
    .range([height - MARGIN, MARGIN])
    .domain(minMax(data, 'y'));

  return (
    <Plot data={data} scale={[xScale, yScale]} width={width} height={height}>
      <YAxis>
        <YAxis.Ticks />
      </YAxis>
      <XAxis>
        <XAxis.Ticks />
      </XAxis>
      <HoverLine x='x' y='y' />
    </Plot>
  );
};

const data = Array(20)
  .fill({})
  .map((d, i) => ({
    x: i,
    y: i,
  }));
</script>

:::

## Tooltip

You can add a tooltip to any element of a chart. The internal content can be easily identified with a function.

::: sandbox

<script lang="tsx">
import React from 'react';
import { Plot, Line, XAxis, YAxis, HoverLine, minMax } from '@semcore/ui/d3-chart';
import { scaleLinear } from 'd3-scale';
import { Flex } from '@semcore/ui/flex-box';
import { Text } from '@semcore/ui/typography';

const Demo = () => {
  const MARGIN = 40;
  const width = 500;
  const height = 300;

  const xScale = scaleLinear()
    .range([MARGIN, width - MARGIN])
    .domain(minMax(data, 'x'));

  const yScale = scaleLinear()
    .range([height - MARGIN, MARGIN])
    .domain([0, 10]);

  return (
    <Plot data={data} scale={[xScale, yScale]} width={width} height={height}>
      <YAxis>
        <YAxis.Ticks />
        <YAxis.Grid />
      </YAxis>
      <XAxis>
        <XAxis.Ticks />
      </XAxis>
      <HoverLine.Tooltip x='x' wMin={100}>
        {({ xIndex }) => {
          return {
            children: (
              <>
                <HoverLine.Tooltip.Title>{data[xIndex].x}</HoverLine.Tooltip.Title>
                <Flex justifyContent='space-between'>
                  <HoverLine.Tooltip.Dot mr={4}>Line</HoverLine.Tooltip.Dot>
                  <Text bold>{data[xIndex].y}</Text>
                </Flex>
              </>
            ),
          };
        }}
      </HoverLine.Tooltip>
      <Line x='x' y='y'>
        <Line.Dots />
      </Line>
    </Plot>
  );
};

const data = Array(20)
  .fill({})
  .map((d, i) => ({
    x: i,
    y: Math.random() * 10,
  }));
</script>

:::

## Time

Use `scaleTime` for calculating intermediate date values. See the [d3 Time Scales documentation](https://github.com/d3/d3-scale#time-scales) for more information.

::: tip
If you already have the tick values, you can use `scaleLine`.
:::

::: sandbox

<script lang="tsx">
import React from 'react';
import { Plot, Line, XAxis, YAxis, HoverLine, minMax } from '@semcore/ui/d3-chart';
import { Flex } from '@semcore/ui/flex-box';
import { Text } from '@semcore/ui/typography';
import { scaleLinear, scaleTime } from 'd3-scale';

function formatDate(value, options) {
  return new Intl.DateTimeFormat('en', options).format(value);
}

const Demo = () => {
  const MARGIN = 40;
  const width = 500;
  const height = 300;

  const xScale = scaleTime()
    .range([MARGIN, width - MARGIN])
    .domain(minMax(data, 'time'));

  const yScale = scaleLinear()
    .range([height - MARGIN, MARGIN])
    .domain([0, 10]);

  return (
    <Plot data={data} scale={[xScale, yScale]} width={width} height={height}>
      <YAxis>
        <YAxis.Ticks />
        <YAxis.Grid />
      </YAxis>
      <XAxis>
        <XAxis.Ticks>
          {({ value }) => ({
            children: formatDate(value, {
              month: 'short',
              day: 'numeric',
            }),
          })}
        </XAxis.Ticks>
      </XAxis>
      <HoverLine.Tooltip x='time' wMin={100}>
        {({ xIndex }) => {
          return {
            children: (
              <>
                <HoverLine.Tooltip.Title>
                  {formatDate(data[xIndex].time, {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </HoverLine.Tooltip.Title>
                <Flex justifyContent='space-between'>
                  <HoverLine.Tooltip.Dot mr={4}>Line</HoverLine.Tooltip.Dot>
                  <Text bold>{data[xIndex].line}</Text>
                </Flex>
              </>
            ),
          };
        }}
      </HoverLine.Tooltip>
      <Line x='time' y='line'>
        <Line.Dots display />
      </Line>
    </Plot>
  );
};

const date = new Date();
const data = Array(10)
  .fill({})
  .map((d, i) => {
    return {
      time: new Date(date.setDate(date.getDate() + 5)),
      line: Math.random() * 10,
    };
  });
</script>

:::

## Curve

To get smoothed lines, you need to transfer curve with the required rounding method to the chart. You can find all available methods in the [d3 Curves documentation](https://github.com/d3/d3-shape#curves).

::: sandbox

<script lang="tsx">
import React from 'react';
import { Plot, Line, XAxis, YAxis, HoverLine, minMax } from '@semcore/ui/d3-chart';
import { scaleLinear } from 'd3-scale';
import { Flex } from '@semcore/ui/flex-box';
import { Text } from '@semcore/ui/typography';
import { curveCardinal } from 'd3-shape';

const Demo = () => {
  const MARGIN = 40;
  const width = 500;
  const height = 300;

  const xScale = scaleLinear()
    .range([MARGIN, width - MARGIN])
    .domain(minMax(data, 'x'));

  const yScale = scaleLinear()
    .range([height - MARGIN, MARGIN])
    .domain([0, 10]);

  return (
    <Plot data={data} scale={[xScale, yScale]} width={width} height={height}>
      <YAxis>
        <YAxis.Ticks />
        <YAxis.Grid />
      </YAxis>
      <XAxis>
        <XAxis.Ticks />
      </XAxis>
      <HoverLine.Tooltip x='x' wMin={100}>
        {({ xIndex }) => {
          return {
            children: (
              <>
                <HoverLine.Tooltip.Title>{data[xIndex].x}</HoverLine.Tooltip.Title>
                <Flex justifyContent='space-between'>
                  <HoverLine.Tooltip.Dot mr={4}>Line</HoverLine.Tooltip.Dot>
                  <Text bold>{data[xIndex].y}</Text>
                </Flex>
              </>
            ),
          };
        }}
      </HoverLine.Tooltip>
      <Line x='x' y='y' curve={curveCardinal}>
        <Line.Dots />
      </Line>
    </Plot>
  );
};

const data = Array(20)
  .fill({})
  .map((d, i) => ({
    x: i,
    y: Math.random() * 10,
  }));
</script>

:::

## Legend

::: sandbox

<script lang="tsx">
import React from 'react';
import Card from '@semcore/ui/card';
import {
  Line,
  minMax,
  Plot,
  XAxis,
  YAxis,
  ChartLegend,
  makeDataHintsContainer,
} from '@semcore/ui/d3-chart';
import { Flex } from '@semcore/ui/flex-box';
import { scaleLinear } from 'd3-scale';

const dataHints = makeDataHintsContainer();

const Demo = () => {
  const MARGIN = 30;
  const width = 500;
  const height = 300;

  const xScale = scaleLinear()
    .range([MARGIN, width - MARGIN])
    .domain(minMax(data, 'x'));

  const yScale = scaleLinear()
    .range([height - MARGIN, MARGIN])
    .domain([0, 10]);

  const [legendItems, setLegendItems] = React.useState(
    Object.keys(data[0])
      .filter((name) => name !== 'x')
      .map((item, index) => {
        return {
          id: item,
          label: `Line${item}`,
          checked: true,
          color: `chart-palette-order-${index + 1}`,
        };
      }),
  );

  const [highlightedLine, setHighlightedLine] = React.useState(-1);

  const handleChangeVisible = React.useCallback((id: string, isVisible: boolean) => {
    setLegendItems((prevItems) => {
      return prevItems.map((item) => {
        if (item.id === id) {
          item.checked = isVisible;
        }

        return item;
      });
    });
  }, []);

  const handleMouseEnter = React.useCallback((id: string) => {
    setHighlightedLine(legendItems.findIndex((line) => line.id === id));
  }, []);
  const handleMouseLeave = React.useCallback(() => {
    setHighlightedLine(-1);
  }, []);

  return (
    <Card w={'550px'}>
      <Card.Header pt={4}>
        <Card.Title tag={'h4'} m={0} hint={'Chart about ...'} inline={true}>
          Chart legend
        </Card.Title>
      </Card.Header>
      <Card.Body tag={Flex} direction='column'>
        <ChartLegend
          dataHints={dataHints}
          items={legendItems}
          onChangeVisibleItem={handleChangeVisible}
          onMouseEnterItem={handleMouseEnter}
          onMouseLeaveItem={handleMouseLeave}
          patterns
        />
        <Plot
          data={data}
          scale={[xScale, yScale]}
          width={width}
          height={height}
          dataHints={dataHints}
          patterns
        >
          <YAxis>
            <YAxis.Ticks ticks={yScale.ticks(4)} />
            <YAxis.Grid ticks={yScale.ticks(4)} />
          </YAxis>
          <XAxis>
            <XAxis.Ticks ticks={xScale.ticks(5)} />
          </XAxis>
          {legendItems.map((item, index) => {
            return (
              item.checked && (
                <Line
                  x='x'
                  y={item.id}
                  key={item.id}
                  color={item.color}
                  transparent={highlightedLine !== -1 && highlightedLine !== index}
                >
                  <Line.Dots display />
                </Line>
              )
            );
          })}
        </Plot>
      </Card.Body>
    </Card>
  );
};

const data = [...Array(5).keys()].map((d, i) => ({
  x: i,
  1: Math.random() * 10,
  2: Math.random() * 10,
  3: Math.random() * 10,
}));
</script>

:::

## Interpolation

If exact values of specific point is not available, you can pass `interpolateValue` and value will be automatically interpolated.

::: sandbox

<script lang="tsx">
import React from 'react';
import { Plot, Line, XAxis, YAxis, minMax, interpolateValue } from '@semcore/ui/d3-chart';
import { scaleLinear } from 'd3-scale';

const Demo = () => {
  const MARGIN = 40;
  const width = 500;
  const height = 300;

  const xScale = scaleLinear()
    .range([MARGIN, width - MARGIN])
    .domain(minMax(data, 'x'));

  const yScale = scaleLinear()
    .range([height - MARGIN, MARGIN])
    .domain([0, 10]);

  return (
    <Plot data={data} scale={[xScale, yScale]} width={width} height={height}>
      <YAxis>
        <YAxis.Ticks />
        <YAxis.Grid />
      </YAxis>
      <XAxis>
        <XAxis.Ticks />
      </XAxis>
      <Line x='x' y='line1'>
        <Line.Dots display />
      </Line>
      <Line x='x' y='line2'>
        <Line.Dots display />
      </Line>
    </Plot>
  );
};

const data = [
  {
    x: 0,
    line1: 5,
    line2: 3,
  },
  {
    x: 1,
    line1: 8,
    line2: interpolateValue,
  },
  {
    x: 2,
    line1: 4,
    line2: 8,
  },
  {
    x: 3,
    line1: 5,
    line2: interpolateValue,
  },
  {
    x: 4,
    line1: 5,
    line2: interpolateValue,
  },
  {
    x: 5,
    line1: 3,
    line2: 1,
  },
];
</script>

:::
