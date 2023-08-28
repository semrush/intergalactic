---
title: Examples
fileSource: d3-chart
tabs: Radial Tree chart('radial-tree-chart'), API('radial-tree-chart-api'), A11y('radial-tree-chart-a11y'), Examples('radial-tree-chart-d3-examples'), Changelog('d3-chart-changelog')
---

::: tip
See core principles, concept description, API and changelog in the [Chart principles](/data-display/d3-chart/).
:::

## Radial Tree

::: sandbox

<script lang="tsx">
import React from 'react';
import { Plot, RadialTree } from '@semcore/ui/d3-chart';
import { scaleLinear } from 'd3-scale';
import LikeM from '@semcore/ui/icon/Like/m';

export default () => {
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
      <RadialTree color='#008FF8'>
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

## Multicolor

Pass color in data to specify radians color.

::: sandbox

<script lang="tsx">
import React from 'react';
import { Plot, RadialTree } from '@semcore/ui/d3-chart';
import { scaleLinear } from 'd3-scale';
import LikeM from '@semcore/ui/icon/Like/m';

const movies = [
  { label: 'Action', color: '#008ff8' },
  { label: 'Comedy', color: '#008ff8' },
  { label: 'Drama', color: '#008ff8' },
  { label: 'Fantasy', color: '#008ff8' },
  { label: 'Mystery', color: '#008ff8' },
  { label: 'Romance', color: '#008ff8' },
  { label: 'Western', color: '#008ff8' },
  { label: 'Thriller', color: '#007C65' },
  { label: 'Crime Thriller', color: '#007C65' },
  { label: 'Disaster Thriller', color: '#007C65' },
  { label: 'Psychological\nThriller', color: '#007C65' },
  { label: 'Techno Thriller', color: '#007C65' },
  { label: 'Horror', color: '#ff4953' },
  { label: 'Zombie Horror', color: '#ff4953' },
  { label: 'Folk Horror', color: '#ff4953' },
  { label: 'Body Horror', color: '#ff4953' },
  { label: 'Found\nFootage Horror', color: '#ff4953' },
];

export default () => {
  const width = 500;
  const height = 500;

  return (
    <Plot data={movies} scale={[scaleLinear(), scaleLinear()]} width={width} height={height}>
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

export default () => {
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
      <RadialTree centralMargin={85} color='#008FF8'>
        <RadialTree.Radian>
          <RadialTree.Radian.Label />
          <RadialTree.Radian.Line />
          <RadialTree.Radian.Cap />
          <RadialTree.Radian.Icon />
        </RadialTree.Radian>
        <circle r={60} cx={width / 2} cy={height / 2} fill='#AB6CFE' />
        <RadialTree.Title color='#FFFFFF'>Sleeping</RadialTree.Title>
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

export default () => {
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
      <RadialTree color='#008FF8' textSize={textSize}>
        <RadialTree.Radian>
          <RadialTree.Radian.Label />
          <RadialTree.Radian.Line />
          <RadialTree.Radian.Cap />
          <RadialTree.Radian.Icon />
        </RadialTree.Radian>
        <RadialTree.Title textSize={lineHeight} color='#AB6CFE'>
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

export default () => {
  return <NoData type='radial-tree-chart' />;
};
</script>

:::

- If data isn’t ready yet – show chart skeleton.

::: sandbox

<script lang="tsx">
import React from 'react';
import { RadialTreeChartSkeleton } from '@semcore/ui/skeleton';

export default () => {
  return <RadialTreeChartSkeleton />;
};
</script>

:::
