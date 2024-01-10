---
title: Ellipsis
fileSource: ellipsis
tabs: Design('ellipsis'), A11y('ellipsis-a11y'), API('ellipsis-api'), Example('ellipsis-code'), Changelog('ellipsis-changelog')
---

## Basic usage

::: sandbox

<script lang="tsx">
  export Demo from './examples/basic_usage.tsx';
</script>

:::

## Link

::: sandbox

<script lang="tsx">
  export Demo from './examples/link.tsx';
</script>

:::

## Trimming type

It's possible to truncate the middle of the text string.

::: sandbox

<script lang="tsx">
  export Demo from './examples/trimming_type.tsx';
</script>

:::

## Multiline

It's possible to specify after what text line apply truncating

::: sandbox

<script lang="tsx">
  export Demo from './examples/multiline.tsx';
</script>

:::

## Multiple use

in case of multiple use of a component for optimization you can use one observer for all components

::: sandbox

<script lang="tsx">
  export Demo from './examples/multiple_use.tsx';
</script>

:::

## Advanced use

For more control over the container and tooltip, you can use the `Ellipsis.Content` and `Ellipsis.Popper` components.

::: sandbox

<script lang="tsx">
  export Demo from './examples/advanced_use.tsx';
</script>

:::
