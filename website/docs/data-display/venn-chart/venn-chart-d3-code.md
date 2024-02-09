---
title: Venn chart
fileSource: d3-chart
tabs: Design('venn-chart'), A11y('venn-chart-a11y'), API('venn-chart-api'), Examples('venn-chart-d3-code'), Changelog('d3-chart-changelog')
---

::: tip
For core principles, concept description, API and changelog, refer to the [D3 chart](/data-display/d3-chart/d3-chart).
:::

## Basic usage

::: sandbox

<script lang="tsx">
import React from 'react';
import { Chart } from '@semcore/d3-chart';

const Demo = () => {
  return (
    <div style={{ width: '500px' }}>
      <Chart.Venn data={data} plotWidth={300} plotHeight={300} legendProps={legendProps} />
    </div>
  );
};

const data = {
  G: 200,
  F: 200,
  C: 500,
  U: 1,
  'G/F': 100,
  'G/C': 100,
  'F/C': 100,
  'G/F/C': 100, // intersection key must be `${key1}/${key2}/...`
};

const legendProps = {
  legendMap: {
    G: { label: 'Good' },
    F: { label: 'Fast' },
    C: { label: 'Clean' },
    U: { label: 'Uniq' },
  },
};
</script>

:::

## Venn

A Venn chart allows you to see all kinds of intersections between two or more data sets.

- `Circle` are a component for circles.
- `Intersection` is for intersections between the circles.

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

const Demo = () => {
  return (
    <Plot height={300} width={400} data={data}>
      <Venn>
        <Venn.Circle dataKey='G' name='Good' />
        <Venn.Circle dataKey='F' name='Fast' />
        <Venn.Circle dataKey='C' name='Cheap' />
        <Venn.Circle dataKey='U' name='Unknown' />
        <Venn.Intersection dataKey='G/F' name='Good & Fast' />
        <Venn.Intersection dataKey='G/C' name='Good & Cheap' />
        <Venn.Intersection dataKey='F/C' name='Fast & Cheap' />
        <Venn.Intersection dataKey='G/F/C' name='Good & Fast & Cheap' />
      </Venn>
      <Venn.Tooltip>
        {({ name, dataKey }) => {
          return {
            children: (
              <>
                <Venn.Tooltip.Title>{name}</Venn.Tooltip.Title>
                <Text bold>{data[dataKey]}</Text>
              </>
            ),
          };
        }}
      </Venn.Tooltip>
    </Plot>
  );
};
</script>

:::

## Custom intersection styles

If you want to change the intersection styles, you can add additional styles to the selected intersection.

::: sandbox

<script lang="tsx">
import React from 'react';
import { Plot, Venn } from '@semcore/ui/d3-chart';

const Demo = () => {
  return (
    <Plot height={300} width={400} data={data}>
      <Venn>
        <Venn.Circle dataKey='G' name='G' />
        <Venn.Circle dataKey='F' name='F' />
        <Venn.Circle dataKey='C' name='C' />
        <Venn.Intersection dataKey='G/F' name='G/F' />
        <Venn.Intersection dataKey='G/C' name='G/C' />
        <Venn.Intersection dataKey='F/C' name='F/C' />
        <Venn.Intersection
          dataKey='G/F/C'
          name='G/F/C'
          style={{
            stroke: '#F00',
            fill: '#0F0',
            fillOpacity: 0.3,
          }}
        />
      </Venn>
    </Plot>
  );
};

const data = {
  G: 200,
  F: 200,
  C: 200,
  'G/F': 100,
  'G/C': 100,
  'F/C': 100,
  'G/F/C': 100,
};
</script>

:::

## Setting orientation

You can also change the orientation and stacking order of the circles.

::: sandbox

<script lang="tsx">
import React from 'react';
import Button from '@semcore/ui/button';
import { colors, Plot, Venn } from '@semcore/ui/d3-chart';
import { Flex } from '@semcore/ui/flex-box';

const orders = [
  (val1, val2) => val2.radius - val1.radius,
  (val1, val2) => val1.radius - val2.radius,
];

const orientations = [Math.PI / 2, Math.PI];

const Demo = () => {
  const [orientation, setOrientation] = React.useState(0);
  const [order, setOrder] = React.useState(0);

  return (
    <Flex alignItems='flex-start' direction='column'>
      <Plot height={300} width={400} data={data}>
        <Venn orientation={orientations[orientation]} orientationOrder={orders[order]}>
          <Venn.Circle dataKey='F' name='F' />
          <Venn.Circle dataKey='S' name='S' />
          <Venn.Intersection dataKey='F/S' name='F/S' />
        </Venn>
      </Plot>
      <Flex direction='row'>
        <Button onClick={() => setOrientation(Number(!orientation))} mr={2}>
          Change orientation
        </Button>
        <Button onClick={() => setOrder(Number(!order))}>Change order</Button>
      </Flex>
    </Flex>
  );
};

const data = {
  F: 5,
  S: 7,
  'F/S': 3,
};
</script>

:::

## Legend and pattern fill

Note that for ChartLegend `patterns` property works only with default `shape={'Checkbox'}`.

::: sandbox

<script lang="tsx">
import React from 'react';
import { Plot, Venn, colors } from '@semcore/ui/d3-chart';
import { Text } from '@semcore/ui/typography';
import { ChartLegend } from '@semcore/d3-chart';

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

const legendItems = [
  {
    id: 'G',
    label: 'Good',
    checked: true,
    color: 'chart-palette-order-1',
  },
  {
    id: 'F',
    label: 'Fast',
    checked: true,
    color: 'chart-palette-order-2',
  },
  {
    id: 'C',
    label: 'Cheap',
    checked: true,
    color: 'chart-palette-order-3',
  },
  {
    id: 'U',
    label: 'Unknown',
    checked: true,
    color: 'chart-palette-order-4',
  },
];

const Demo = () => {
  return (
    <>
      <ChartLegend items={legendItems} patterns/>
      <Plot height={300} width={400} data={data} patterns>
        <Venn>
          <Venn.Circle dataKey='G' name='Good' />
          <Venn.Circle dataKey='F' name='Fast' color={colors['blue-03']} />
          <Venn.Circle dataKey='C' name='Cheap' color={colors['orange-04']} />
          <Venn.Circle dataKey='U' name='Unknown' color={colors['pink-03']} />
          <Venn.Intersection dataKey='G/F' name='Good & Fast' />
          <Venn.Intersection dataKey='G/C' name='Good & Cheap' />
          <Venn.Intersection dataKey='F/C' name='Fast & Cheap' />
          <Venn.Intersection dataKey='G/F/C' name='Good & Fast & Cheap' />
        </Venn>
        <Venn.Tooltip>
          {({ name, dataKey }) => {
            return {
              children: (
                <>
                  <Venn.Tooltip.Title>{name}</Venn.Tooltip.Title>
                  <Text bold>{data[dataKey]}</Text>
                </>
              ),
            };
          }}
        </Venn.Tooltip>
      </Plot>
    </>
  );
};
</script>

:::