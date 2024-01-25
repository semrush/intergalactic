---
title: Radar chart
fileSource: d3-chart
tabs: Design('radar-chart'), API('radar-chart-api'), Examples('radar-chart-code')
---

::: tip
For core principles, concept description, API and changelog, refer to the [D3 chart principles](/data-display/d3-chart/d3-chart).
:::

## Basic usage

::: sandbox

<script lang="tsx">
import React from 'react';
import { Chart, colors } from '@semcore/ui/d3-chart';

const Demo = () => {
  return <Chart.Radar data={data} groupKey={'categories'} plotWidth={400} plotHeight={400} />;
};

const data = {
  categories: ['Variable 1', 'Variable 2', 'Variable 3', 'Variable 4', 'Variable 5', 'Variable 6'],
  data_1: [1, 3, 5, 5, 9, 2],
  data_2: [5, 2, 1, 2, 7, 6],
};
</script>

:::

## Scale

You must pass a scale with a specified `domain`, `range` doesn't need to be specified as it is calculated automatically.
You can modify the range or use a non-linear scale.

::: sandbox

<script lang="tsx">
import React from 'react';
import { scaleLinear } from 'd3-scale';
import { Plot, Radar } from '@semcore/ui/d3-chart';
import { Flex } from '@semcore/ui/flex-box';

const Demo = () => {
  const width = 250;
  const height = 250;

  const scale_1 = scaleLinear().domain([0, 10]);
  const scale_2 = scaleLinear().domain([0, 20]);

  return (
    <Flex>
      <Plot data={data} width={width} height={height}>
        <Radar scale={scale_1}>
          <Radar.Axis dataKey='categories'>
            <Radar.Axis.Ticks />
            <Radar.Axis.Labels />
          </Radar.Axis>
          <Radar.Polygon dataKey='data_1'>
            <Radar.Polygon.Line />
            <Radar.Polygon.Dots />
          </Radar.Polygon>
        </Radar>
      </Plot>
      <Plot data={data} width={width} height={height}>
        <Radar scale={scale_2}>
          <Radar.Axis dataKey='categories'>
            <Radar.Axis.Ticks />
            <Radar.Axis.Labels />
          </Radar.Axis>
          <Radar.Polygon dataKey='data_1'>
            <Radar.Polygon.Line />
            <Radar.Polygon.Dots />
          </Radar.Polygon>
        </Radar>
      </Plot>
    </Flex>
  );
};

const data = {
  categories: ['Cat 1', 'Cat 2', 'Cat 3', 'Cat 4', 'Cat 5', 'Cat 6'],
  data_1: [10, 2, 10, 2, 10, 2],
};
</script>

:::

## Color

You can change the color by passing the `color` property to the `<Radar.Polygon/>`.
It is also possible to pass the 'color' property to `<Radar.Polygon.Line/>` and `<Radar.Polygon.Dots/>`.

::: sandbox

<script lang="tsx">
import React from 'react';
import { Plot, Radar } from '@semcore/ui/d3-chart';
import { scaleLinear } from 'd3-scale';

const Demo = () => {
  const width = 500;
  const height = 500;

  const scale = scaleLinear().domain([0, 10]);

  return (
    <Plot data={data} width={width} height={height}>
      <Radar scale={scale}>
        <Radar.Axis dataKey='categories'>
          <Radar.Axis.Ticks />
          <Radar.Axis.Labels />
        </Radar.Axis>
        <Radar.Polygon dataKey='data_1' color='chart-palette-order-1'>
          <Radar.Polygon.Line />
          <Radar.Polygon.Dots />
        </Radar.Polygon>
        <Radar.Polygon dataKey='data_2' color='chart-palette-order-2'>
          <Radar.Polygon.Line />
          <Radar.Polygon.Dots />
        </Radar.Polygon>
      </Radar>
    </Plot>
  );
};

const data = {
  categories: ['Variable 1', 'Variable 2', 'Variable 3', 'Variable 4', 'Variable 5', 'Variable 6'],
  data_1: [1, 3, 5, 5, 9, 2],
  data_2: [5, 2, 1, 2, 7, 6],
};
</script>

:::

## Background color

You can use the `fill="transparent"` property to make polygons transparent.

::: sandbox

<script lang="tsx">
import React from 'react';
import { Plot, Radar, colors } from '@semcore/ui/d3-chart';
import { scaleLinear } from 'd3-scale';

const Demo = () => {
  const width = 500;
  const height = 500;

  const scale = scaleLinear().domain([0, 10]);

  return (
    <Plot data={data} width={width} height={height}>
      <Radar scale={scale}>
        <Radar.Axis dataKey='categories'>
          <Radar.Axis.Ticks />
          <Radar.Axis.Labels />
        </Radar.Axis>
        <Radar.Polygon dataKey='data_1' color='chart-palette-order-1' fill='transparent'>
          <Radar.Polygon.Line />
          <Radar.Polygon.Dots />
        </Radar.Polygon>
        <Radar.Polygon dataKey='data_2' color='chart-palette-order-2' fill='transparent'>
          <Radar.Polygon.Line />
          <Radar.Polygon.Dots />
        </Radar.Polygon>
      </Radar>
    </Plot>
  );
};

const data = {
  categories: ['Variable 1', 'Variable 2', 'Variable 3', 'Variable 4', 'Variable 5', 'Variable 6'],
  data_1: [1, 3, 5, 5, 9, 2],
  data_2: [5, 2, 1, 2, 7, 6],
};
</script>

:::

## Label long

If your labels are too long, you can move them to the next line using the line break symbol `\n`.

::: sandbox

<script lang="tsx">
import React from 'react';
import { scaleLinear } from 'd3-scale';
import { Plot, Radar } from '@semcore/ui/d3-chart';
import { Flex } from '@semcore/ui/flex-box';

const Demo = () => {
  const width = 250;
  const height = 250;

  const scale = scaleLinear().domain([0, 10]);

  return (
    <Flex>
      <Plot data={data} width={width} height={height}>
        <Radar scale={scale}>
          <Radar.Axis dataKey='categories'>
            <Radar.Axis.Ticks />
            <Radar.Axis.Labels />
          </Radar.Axis>
          <Radar.Polygon dataKey='data_1'>
            <Radar.Polygon.Line />
            <Radar.Polygon.Dots />
          </Radar.Polygon>
        </Radar>
      </Plot>
    </Flex>
  );
};

const data = {
  categories: ['Cat 1', 'Cat tender\nDog sweet', 'Cat 3', 'Cat 4', 'Cat 5', 'Cat 6'],
  data_1: [10, 2, 10, 2, 10, 2],
};
</script>

:::

## Label custom

If you need a custom React component instead of a label, you can change the display in the render function.

::: sandbox

<script lang="tsx">
import React from 'react';
import { scaleLinear } from 'd3-scale';
import { Plot, Radar, getLabelOffsetPosition } from '@semcore/ui/d3-chart';
import { Flex } from '@semcore/ui/flex-box';
import Tag from '@semcore/ui/tag';

const Demo = () => {
  const width = 250;
  const height = 250;

  const scale = scaleLinear().domain([0, 10]);
  const maxLabelWidth = 50;

  return (
    <Flex>
      <Plot data={data} width={width} height={height}>
        <Radar scale={scale} offset={maxLabelWidth}>
          <Radar.Axis dataKey='categories'>
            <Radar.Axis.Ticks />
            <Radar.Axis.Labels>
              {(props) => {
                const width = maxLabelWidth;
                const height = 20;
                const [xOffset, yOffset] = getLabelOffsetPosition(
                  props.xDirection,
                  props.yDirection,
                  width,
                  height,
                );
                return {
                  tag: 'g',
                  children: (
                    <foreignObject
                      x={props.x - xOffset}
                      y={props.y - yOffset}
                      width={width}
                      height={height}
                    >
                      <Tag interactive>{props.children}</Tag>
                    </foreignObject>
                  ),
                };
              }}
            </Radar.Axis.Labels>
          </Radar.Axis>
          <Radar.Polygon dataKey='data_1'>
            <Radar.Polygon.Line />
            <Radar.Polygon.Dots />
          </Radar.Polygon>
        </Radar>
      </Plot>
    </Flex>
  );
};

const data = {
  categories: ['Cat 1', 'Cat 2', 'Cat 3', 'Cat 4', 'Cat 5', 'Cat 6'],
  data_1: [10, 2, 10, 2, 10, 2],
};
</script>

:::

## Tooltip

You need to use the `<Radar.Tooltip />` component to add interactivity.

::: sandbox

<script lang="tsx">
import React from 'react';
import { Plot, Radar } from '@semcore/ui/d3-chart';
import { scaleLinear } from 'd3-scale';

const Demo = () => {
  const width = 500;
  const height = 500;

  const scale = scaleLinear().domain([0, 10]);

  return (
    <Plot data={data} width={width} height={height}>
      <Radar scale={scale}>
        <Radar.Axis dataKey='categories'>
          <Radar.Axis.Ticks />
          <Radar.Axis.Labels />
        </Radar.Axis>
        <Radar.Tooltip wMin={100}>
          {({ index }) => {
            return {
              children: (
                <>
                  <Radar.Tooltip.Title>{data.categories[index]}</Radar.Tooltip.Title>
                  <Radar.Tooltip.Dot>{data['data_1'][index]}</Radar.Tooltip.Dot>
                  <Radar.Tooltip.Dot>{data['data_2'][index]}</Radar.Tooltip.Dot>
                </>
              ),
            };
          }}
        </Radar.Tooltip>
        <Radar.Polygon dataKey='data_1'>
          <Radar.Polygon.Line />
          <Radar.Polygon.Dots />
        </Radar.Polygon>
        <Radar.Polygon dataKey='data_2'>
          <Radar.Polygon.Line />
          <Radar.Polygon.Dots />
        </Radar.Polygon>
      </Radar>
    </Plot>
  );
};

const data = {
  categories: ['Variable 1', 'Variable 2', 'Variable 3', 'Variable 4', 'Variable 5', 'Variable 6'],
  data_1: [1, 3, 5, 5, 9, 2],
  data_2: [5, 2, 1, 2, 7, 6],
};
</script>

:::

## Circle

To make the chart round, you need to pass the parameter `type="circle"`.
You can also round the polygons by passing the "curve" parameter from D3 into them.

::: sandbox

<script lang="tsx">
import React from 'react';
import { Plot, Radar } from '@semcore/ui/d3-chart';
import { scaleLinear } from 'd3-scale';
import { curveCardinalClosed } from 'd3-shape';

const Demo = () => {
  const width = 500;
  const height = 500;

  const scale = scaleLinear().domain([0, 10]);

  return (
    <Plot data={data} width={width} height={height}>
      <Radar scale={scale} type='circle'>
        <Radar.Axis dataKey='categories'>
          <Radar.Axis.Ticks />
          <Radar.Axis.Labels />
        </Radar.Axis>
        <Radar.Tooltip wMin={100}>
          {({ index }) => {
            return {
              children: (
                <>
                  <Radar.Tooltip.Title>{data.categories[index]}</Radar.Tooltip.Title>
                  <Radar.Tooltip.Dot>{data['data_1'][index]}</Radar.Tooltip.Dot>
                  <Radar.Tooltip.Dot>{data['data_2'][index]}</Radar.Tooltip.Dot>
                </>
              ),
            };
          }}
        </Radar.Tooltip>
        <Radar.Polygon dataKey='data_1' curve={curveCardinalClosed}>
          <Radar.Polygon.Line />
          <Radar.Polygon.Dots />
        </Radar.Polygon>
        <Radar.Polygon dataKey='data_2' curve={curveCardinalClosed}>
          <Radar.Polygon.Line />
          <Radar.Polygon.Dots />
        </Radar.Polygon>
      </Radar>
    </Plot>
  );
};

const data = {
  categories: ['Variable 1', 'Variable 2', 'Variable 3', 'Variable 4', 'Variable 5', 'Variable 6'],
  data_1: [1, 3, 5, 5, 9, 2],
  data_2: [5, 2, 1, 2, 7, 6],
};
</script>

:::

## Tick size

To change the distance between the grid lines, you need to change the value of the `tickSize` parameter.

::: sandbox

<script lang="tsx">
import React from 'react';
import { Plot, Radar } from '@semcore/ui/d3-chart';
import { scaleLinear } from 'd3-scale';

const Demo = () => {
  const width = 500;
  const height = 500;

  const scale = scaleLinear().domain([0, 10]);

  return (
    <Plot data={data} width={width} height={height}>
      <Radar scale={scale}>
        <Radar.Axis dataKey='categories'>
          <Radar.Axis.Ticks tickSize={30} />
          <Radar.Axis.Labels />
        </Radar.Axis>
        <Radar.Polygon dataKey='data_1'>
          <Radar.Polygon.Line />
          <Radar.Polygon.Dots />
        </Radar.Polygon>
        <Radar.Polygon dataKey='data_2'>
          <Radar.Polygon.Line />
          <Radar.Polygon.Dots />
        </Radar.Polygon>
      </Radar>
    </Plot>
  );
};

const data = {
  categories: ['Variable 1', 'Variable 2', 'Variable 3', 'Variable 4', 'Variable 5', 'Variable 6'],
  data_1: [1, 3, 5, 5, 9, 2],
  data_2: [5, 2, 1, 2, 7, 6],
};
</script>

:::

## Rotated

To change base angle of the chart, set `angleOffset` (in radians) parameter.

::: sandbox

<script lang="tsx">
import React from 'react';
import { Plot, Radar } from '@semcore/ui/d3-chart';
import { scaleLinear } from 'd3-scale';
import { curveCardinalClosed } from 'd3-shape';
import Slider from '@semcore/slider';

const scale = scaleLinear().domain([0, 10]);
const Demo = () => {
  const width = 500;
  const height = 500;
  const [angleDegOffset, setAngleDegOffset] = React.useState(45);

  const angleOffset = React.useMemo(() => (angleDegOffset / 180) * Math.PI, [angleDegOffset]);

  return (
    <div>
      <Slider
        value={angleDegOffset}
        onChange={setAngleDegOffset}
        step={1}
        min={-360}
        max={360}
        w={360}
      />
      <div>
        Angle: {angleOffset.toFixed(2)} rad ({angleDegOffset.toFixed(0)} deg)
      </div>
      <Plot data={data} width={width} height={height}>
        <Radar scale={scale} type='circle' angleOffset={angleOffset}>
          <Radar.Axis dataKey='categories'>
            <Radar.Axis.Ticks />
            <Radar.Axis.Labels />
          </Radar.Axis>
          <Radar.Tooltip wMin={100}>
            {({ index }) => {
              return {
                children: (
                  <>
                    <Radar.Tooltip.Title>{data.categories[index]}</Radar.Tooltip.Title>
                    <Radar.Tooltip.Dot>{data['data_1'][index]}</Radar.Tooltip.Dot>
                    <Radar.Tooltip.Dot>{data['data_2'][index]}</Radar.Tooltip.Dot>
                  </>
                ),
              };
            }}
          </Radar.Tooltip>
          <Radar.Polygon dataKey='data_1' curve={curveCardinalClosed}>
            <Radar.Polygon.Line />
            <Radar.Polygon.Dots />
          </Radar.Polygon>
          <Radar.Polygon dataKey='data_2' curve={curveCardinalClosed}>
            <Radar.Polygon.Line />
            <Radar.Polygon.Dots />
          </Radar.Polygon>
        </Radar>
      </Plot>
    </div>
  );
};

const data = {
  categories: ['Variable 1', 'Variable 2', 'Variable 3', 'Variable 4', 'Variable 5', 'Variable 6'],
  data_1: [1, 3, 5, 5, 9, 2],
  data_2: [5, 2, 1, 2, 7, 6],
};
</script>

:::

## Legend and pattern fill

Note that for ChartLegend `patterns` property works only with default `shape={'Checkbox'}`.

::: sandbox

<script lang="tsx">
import React from 'react';
import { Plot, Radar, colors, LegendItem, ChartLegend } from '@semcore/ui/d3-chart';
import { scaleLinear } from 'd3-scale';

const Demo = () => {
  const width = 500;
  const height = 500;

  const scale = scaleLinear().domain([0, 10]);

  return (
    <>
      <ChartLegend items={legendItems} patterns/>
      <Plot data={data} width={width} height={height} patterns>
        <Radar scale={scale}>
          <Radar.Axis dataKey='categories'>
            <Radar.Axis.Ticks />
            <Radar.Axis.Labels />
          </Radar.Axis>
          <Radar.Polygon dataKey='data_1' color={colors['orange-04']}>
            <Radar.Polygon.Line />
            <Radar.Polygon.Dots />
          </Radar.Polygon>
          <Radar.Polygon dataKey='data_2' color={colors['violet-04']}>
            <Radar.Polygon.Line />
            <Radar.Polygon.Dots />
          </Radar.Polygon>
        </Radar>
      </Plot>
    </>
  );
};

const legendItems: LegendItem[] = [
  {
    id: 'data_1',
    label: 'Label for 1',
    checked: true,
    color: colors['orange-04'],
  },
  {
    id: 'data_2',
    label: 'Label for 2',
    checked: true,
    color: colors['violet-04'],
  },
];

const data = {
  categories: ['Variable 1', 'Variable 2', 'Variable 3', 'Variable 4', 'Variable 5', 'Variable 6'],
  data_1: [1, 3, 5, 5, 9, 2],
  data_2: [5, 2, 1, 2, 7, 6],
};
</script>

:::
