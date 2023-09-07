---
title: Examples
fileSource: d3-chart
tabs: Venn chart('venn-chart'), A11y('venn-chart-a11y'), API('venn-chart-api'), Examples('venn-chart-d3-code'), Changelog('d3-chart-changelog')
---

::: tip
See core principles, concept description, API and changelog in the [Chart principles](/data-display/d3-chart/).
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
  );
};
</script>

:::

## Custom intersection styles

If you want to change the intersection styles, you can add additional styles to the selected intersection.

::: sandbox

<script lang="tsx">
import React from 'react';
import { colors, Plot, Venn } from '@semcore/ui/d3-chart';

const Demo = () => {
  return (
    <Plot height={300} width={400} data={data}>
      <Venn>
        <Venn.Circle dataKey='G' name='G' />
        <Venn.Circle dataKey='F' name='F' color={colors['blue-03']} />
        <Venn.Circle dataKey='C' name='C' color={colors['orange-04']} />
        <Venn.Intersection dataKey='G/F' name='G/F' />
        <Venn.Intersection dataKey='G/C' name='G/C' />
        <Venn.Intersection dataKey='F/C' name='F/C' />
        <Venn.Intersection
          dataKey='G/F/C'
          name='G/F/C'
          style={{
            stroke: colors['violet-04'],
            fill: colors['violet-04'],
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
import React, { useState } from 'react';
import Button from '@semcore/ui/button';
import { colors, Plot, Venn } from '@semcore/ui/d3-chart';
import { Flex } from '@semcore/ui/flex-box';

const orders = [
  (val1, val2) => val2.radius - val1.radius,
  (val1, val2) => val1.radius - val2.radius,
];

const orientations = [Math.PI / 2, Math.PI];

const Demo = () => {
  const [orientation, setOrientation] = useState(0);
  const [order, setOrder] = useState(0);

  return (
    <Flex alignItems='center' direction='column'>
      <Plot height={300} width={400} data={data}>
        <Venn orientation={orientations[orientation]} orientationOrder={orders[order]}>
          <Venn.Circle dataKey='F' name='F' />
          <Venn.Circle dataKey='S' name='S' color={colors['blue-03']} />
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
