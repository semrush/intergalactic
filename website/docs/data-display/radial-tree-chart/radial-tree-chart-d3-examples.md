---
title: Radial Tree chart
fileSource: d3-chart
tabs: Design('radial-tree-chart'), API('radial-tree-chart-api'), A11y('radial-tree-chart-a11y'), Examples('radial-tree-chart-d3-examples'), Changelog('d3-chart-changelog')
---

::: tip
For core principles, concept description, API and changelog, refer to the [D3 chart principles](/data-display/d3-chart/d3-chart).
:::

## Basic usage

::: sandbox

<script lang="tsx">
import React from 'react';
import { Plot, RadialTree } from '@semcore/ui/d3-chart';
import { scaleLinear } from 'd3-scale';
import LikeM from '@semcore/ui/icon/Like/m';

const Demo = () => {
  const width = 500;
  const height = 500;

  const data = Array(12)
    .fill({})
    .map((_, i) => ({
      label: `Sheep ${i + 1}`,
      icon: LikeM,
    }));

  return (
    <Plot data={data} scale={[scaleLinear(), scaleLinear()]} width={width} height={height}>
      <RadialTree color='chart-palette-order-9'>
        <RadialTree.Radian>
          <RadialTree.Radian.Label />
          <RadialTree.Radian.Line />
          <RadialTree.Radian.Cap />
          <RadialTree.Radian.Icon />
        </RadialTree.Radian>
        <RadialTree.Title>Sleeping</RadialTree.Title>
      </RadialTree>
    </Plot>
  );
};
</script>

:::

## Multicolor and accessibility

Pass color in data to specify radians color. You also can enable `patterns` property to show different symbols for different values.

::: sandbox

<script lang="tsx">
import React from 'react';
import { Plot, RadialTree } from '@semcore/ui/d3-chart';
import { scaleLinear } from 'd3-scale';
import LikeM from '@semcore/ui/icon/Like/m';

const movies = [
  'Action',
  'Comedy',
  'Drama',
  'Fantasy',
  'Mystery',
  'Romance',
  'Western',
  'Thriller',
  'Crime Thriller',
  'Disaster Thriller',
  'Psychological\nThriller',
  'Techno Thriller',
  'Horror',
  'Zombie Horror',
  'Folk Horror',
  'Body Horror',
  'Found\nFootage Horror',
].map((label, index) => ({
  label,
  color: `chart-palette-order-${index + 1}`,
}));

const Demo = () => {
  const width = 500;
  const height = 500;

  return (
    <Plot data={movies} scale={[scaleLinear(), scaleLinear()]} width={width} height={height} patterns>
      <RadialTree>
        <RadialTree.Radian>
          <RadialTree.Radian.Label />
          <RadialTree.Radian.Line />
          <RadialTree.Radian.Cap />
          <RadialTree.Radian.Icon tag={LikeM} />
        </RadialTree.Radian>
        <RadialTree.Title>Movies</RadialTree.Title>
      </RadialTree>
    </Plot>
  );
};
</script>

:::

## Custom svg in center

Any svg elements may be used in the center of radial tree.

::: sandbox

<script lang="tsx">
import React from 'react';
import { Plot, RadialTree } from '@semcore/ui/d3-chart';
import { scaleLinear } from 'd3-scale';
import LikeM from '@semcore/ui/icon/Like/m';

const Demo = () => {
  const width = 500;
  const height = 500;

  const data = Array(12)
    .fill({})
    .map((_, i) => ({
      label: `Sheep ${i + 1}`,
      icon: LikeM,
    }));

  return (
    <Plot data={data} scale={[scaleLinear(), scaleLinear()]} width={width} height={height}>
      <RadialTree centralMargin={85} color='blue-400'>
        <RadialTree.Radian>
          <RadialTree.Radian.Label />
          <RadialTree.Radian.Line />
          <RadialTree.Radian.Cap />
          <RadialTree.Radian.Icon />
        </RadialTree.Radian>
        <circle r={60} cx={width / 2} cy={height / 2} fill='#008FF8' />
        <RadialTree.Title color='white'>Sleeping</RadialTree.Title>
      </RadialTree>
    </Plot>
  );
};
</script>

:::

## Multiline text

Multiline text implementation isn’t trivial in svg. Text on the leafs of tree is split into lines by `\n` symbol automatically. Text in the chart center should be split into lines manually.

::: sandbox

<script lang="tsx">
import React from 'react';
import { Plot, RadialTree } from '@semcore/ui/d3-chart';
import { scaleLinear } from 'd3-scale';
import LikeM from '@semcore/ui/icon/Like/m';

const Demo = () => {
  const width = 500;
  const height = 500;

  const data = Array(12)
    .fill({})
    .map((_, index) => ({
      label: [
        'consectetur\nadipiscing',
        'elit, sed do\neiusmod tempor',
        'incididunt ut\nlabore et\ndolore',
        'magna aliqua',
        'Ut enim',
        'ad minim veniam',
        'quis nostrud\nexercitation',
        'ullamco\nlaboris\nnisi',
        'ut aliquip ex',
        'ea commodo',
        'consequat',
        'Duis aute',
        'irure dolor\nin',
        'reprehenderit',
      ][index],
      icon: LikeM,
    }));

  const textSize = 12;
  const lineHeight = textSize * 1.2;
  const textLines = ['Lorem ipsum', 'dolor', 'sit amet'];

  return (
    <Plot data={data} scale={[scaleLinear(), scaleLinear()]} width={width} height={height}>
      <RadialTree color='chart-palette-order-9' textSize={textSize}>
        <RadialTree.Radian>
          <RadialTree.Radian.Label />
          <RadialTree.Radian.Line />
          <RadialTree.Radian.Cap />
          <RadialTree.Radian.Icon />
        </RadialTree.Radian>
        <RadialTree.Title textSize={lineHeight} color='chart-palette-order-9'>
          {textLines.map((line, lineIndex) => (
            <tspan
              key={line}
              x={width / 2}
              y={height / 2 + (-(textLines.length - 1) / 2 + lineIndex) * lineHeight}
            >
              {line}
            </tspan>
          ))}
        </RadialTree.Title>
      </RadialTree>
    </Plot>
  );
};
</script>

:::

## Edge cases

- If there is no data – show an empty gray chart.

::: sandbox

<script lang="tsx">
import React from 'react';
import { NoData } from '@semcore/ui/widget-empty';

const Demo = () => {
  return <NoData type='radial-tree-chart' />;
};
</script>

:::

- If data isn’t ready yet – show chart skeleton.

::: sandbox

<script lang="tsx">
import React from 'react';
import { RadialTreeChartSkeleton } from '@semcore/ui/skeleton';

const Demo = () => {
  return <RadialTreeChartSkeleton />;
};
</script>

:::
