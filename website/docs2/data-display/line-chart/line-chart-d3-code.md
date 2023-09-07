---
title: Examples
fileSource: d3-chart
tabs: Line chart('line-chart'), A11y('line-chart-a11y'), API('line-chart-api'), Examples('line-chart-d3-code'), Changelog('d3-chart-changelog')
---

::: tip
See core principles, concept description, API and changelog in the [Chart principles](/data-display/d3-chart/d3-chart).
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
      <Line x='x' y='y'>
        <Line.Dots />
      </Line>
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
      <Line x='time' y='line'>
        <Line.Dots display />
      </Line>
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
      <Line x='x' y='y' curve={curveCardinal}>
        <Line.Dots />
      </Line>
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
import { Line, minMax, Plot, XAxis, YAxis } from '@semcore/ui/d3-chart';
import { Flex } from '@semcore/ui/flex-box';
import resolveColor from '@semcore/ui/utils/color';
import { scaleLinear } from 'd3-scale';
import Checkbox from '@semcore/ui/checkbox';

const lineColors = {
  line1: resolveColor('blue-300'),
  line2: resolveColor('orange-400'),
  line3: resolveColor('green-200'),
};

const Demo = () => {
  const MARGIN = 30;
  const width = 500;
  const height = 300;

  const xScale = scaleLinear()
    .range([MARGIN, width - MARGIN])
    .domain(minMax(data, 'x'));

  const yScale = scaleLinear()
    .range([height - MARGIN, 0])
    .domain([0, 10]);

  const linesList = Object.keys(data[0]).filter((name) => name !== 'x');
  const [displayLines, setDisplayLines] = React.useState(
    linesList.reduce((o, key) => ({ ...o, [key]: true }), {}),
  );
  const [opacityLines, setOpacityLines] = React.useState(
    linesList.reduce((o, key) => ({ ...o, [key]: false }), {}),
  );
  const displayedLinesList = React.useMemo(
    () =>
      Object.entries(displayLines)
        .filter(([, displayed]) => displayed)
        .map(([line]) => line),
    [displayLines],
  );

  const handleMouseEnter = (line) => () => {
    if (displayedLinesList.includes(line)) {
      const opacity = { ...opacityLines };

      Object.keys(opacity).forEach((key) => {
        if (key !== line) {
          opacity[key] = true;
        }
      });

      setOpacityLines({ ...opacity });
    }
  };

  const handleMouseLeave = () => {
    setOpacityLines(linesList.reduce((o, key) => ({ ...o, [key]: false }), {}));
  };

  return (
    <Card w={'550px'}>
      <Card.Header pt={4}> Chart legend</Card.Header>
      <Card.Body tag={Flex} direction='column'>
        <Flex flexWrap w={width} mt={1}>
          {linesList.map((line) => {
            return (
              <Checkbox
                key={line}
                theme={lineColors[line]}
                mr={4}
                mb={2}
                onMouseEnter={handleMouseEnter(line)}
                onMouseLeave={handleMouseLeave}
              >
                <Checkbox.Value
                  checked={displayLines[line]}
                  onChange={(checked) =>
                    setDisplayLines((prevDisplayedLines) => ({
                      ...prevDisplayedLines,
                      [line]: checked,
                    }))
                  }
                />
                <Checkbox.Text>{line}</Checkbox.Text>
              </Checkbox>
            );
          })}
        </Flex>
        <Plot data={data} scale={[xScale, yScale]} width={width} height={height}>
          <YAxis>
            <YAxis.Ticks ticks={yScale.ticks(4)} />
            <YAxis.Grid ticks={yScale.ticks(4)} />
          </YAxis>
          <XAxis>
            <XAxis.Ticks ticks={xScale.ticks(5)} />
          </XAxis>
          {displayedLinesList.map((line) => {
            return (
              <Line
                x='x'
                y={line}
                key={line}
                color={lineColors[line]}
                transparent={opacityLines[line]}
              >
                <Line.Dots display />
              </Line>
            );
          })}
        </Plot>
      </Card.Body>
    </Card>
  );
};

const data = [...Array(5).keys()].map((d, i) => ({
  x: i,
  line1: Math.random() * 10,
  line2: Math.random() * 10,
  line3: Math.random() * 10,
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
