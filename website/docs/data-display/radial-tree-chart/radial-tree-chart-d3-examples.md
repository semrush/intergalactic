---
title: Radial Tree chart
fileSource: d3-chart
tabs: Design('radial-tree-chart'), API('radial-tree-chart-api'), A11y('radial-tree-chart-a11y'), Examples('radial-tree-chart-d3-examples'), Changelog('d3-chart-changelog')
---

::: tip
For core principles, concept description, API and changelog, refer to the [D3 chart](/data-display/d3-chart/d3-chart).
:::

## Basic usage

::: sandbox

<script lang="tsx">
  export Demo from 'stories/components/d3-chart/docs/examples/radial-tree-chart/basic-usage.tsx';
</script>

:::

## Multicolor and accessibility

Pass color in data to specify radians color. You also can enable `patterns` property to show different symbols for different values.

::: sandbox

<script lang="tsx">
  export Demo from 'stories/components/d3-chart/docs/examples/radial-tree-chart/multicolor-and-accessibility.tsx';
</script>

:::

## Custom svg in center

Any svg elements may be used in the center of radial tree.

::: sandbox

<script lang="tsx">
  export Demo from 'stories/components/d3-chart/docs/examples/radial-tree-chart/custom-svg-in-center.tsx';
</script>

:::

## Multiline text

Multiline text implementation isn’t trivial in svg. Text on the leafs of tree is split into lines by `\n` symbol automatically. Text in the chart center should be split into lines manually.

::: sandbox

<script lang="tsx">
  export Demo from 'stories/components/d3-chart/docs/examples/radial-tree-chart/multiline-text.tsx';
</script>

:::

## Edge cases

- If there is no data – show an empty gray chart.

::: sandbox

<script lang="tsx">
  export Demo from 'stories/components/d3-chart/docs/examples/radial-tree-chart/edge-cases.tsx';
</script>

:::

- If data isn’t ready yet – show chart skeleton.

::: sandbox

<script lang="tsx">
  export Demo from 'stories/components/d3-chart/docs/examples/radial-tree-chart/edge-cases.tsx';
</script>

:::
