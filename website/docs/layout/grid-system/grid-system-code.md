---
title: Grid
fileSource: grid
tabs: Page layout('grid-system-layout'), API('grid-system-api'), Example('grid-system-code'), Changelog('grid-system-changelog')
---

`Grid` is a component for building a 12-column grid.

::: tip
In the product interface we use a 12-column grid with a fixed 24px gutter between columns. The columns stretch.
:::

## Basic usage

The `Row` component accepts all the properties of the `Flex` component, and the `Col` component accepts all the properties of the `Box` component.

::: sandbox

<script lang="tsx">
  export Demo from 'stories/components/grid/docs/examples/example-use.tsx';
</script>

:::

## Column offset

Arranging offsets for each column to the left.

::: sandbox

<script lang="tsx">
  export Demo from 'stories/components/grid/docs/examples/change-in-general-offset.tsx';
</script>

:::

## Row gutter

You can change gutters between the columns, which gives flexibility in use.

::: sandbox

<script lang="tsx">
  export Demo from 'stories/components/grid/docs/examples/change-in-the-general-gutter-between-the-columns.tsx';
</script>

:::

## Automatic column size

::: sandbox

<script lang="tsx">
  export Demo from 'stories/components/grid/docs/examples/automatic-column-size-detection.tsx';
</script>

:::

## Responsive layout

The grid has functionality for responsive layouts. You can change width and offsets of the columns depending on the screen size.

::: tip
The grid works as desktop first, as our core products are designed to work primarily on the desktop.
:::

::: sandbox

<script lang="tsx">
  export Demo from 'stories/components/grid/docs/examples/responsive.tsx';
</script>

:::

## Shorthand responsive props

We have added an alternative API for responsive grids. It's more laconic.

::: sandbox

<script lang="tsx">
  export Demo from 'stories/components/grid/docs/examples/responsive-alternative-api.tsx';
</script>

:::
