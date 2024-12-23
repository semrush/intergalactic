---
title: Ellipsis
fileSource: ellipsis
tabs: Design('ellipsis'), A11y('ellipsis-a11y'), API('ellipsis-api'), Example('ellipsis-code'), Changelog('ellipsis-changelog')
---

## Basic usage

::: sandbox

<script lang="tsx">
  export Demo from 'stories/components/ellipsis/docs/examples/basic_usage.tsx';
</script>

:::

## Trimming type

It's possible to truncate the middle of the text string.

::: sandbox

<script lang="tsx">
  export Demo from 'stories/components/ellipsis/docs/examples/trimming_type.tsx';
</script>

:::

## Multiline

It's possible to specify after what text line apply truncating

::: sandbox

<script lang="tsx">
  export Demo from 'stories/components/ellipsis/docs/examples/multiline.tsx';
</script>

:::

## Multiple use

in case of multiple use of a component for optimization you can use one observer for all components

::: sandbox

<script lang="tsx">
  export Demo from 'stories/components/ellipsis/docs/examples/multiple_use.tsx';
</script>

:::

## Advanced use

For more control over the container and tooltip, you can use the `Ellipsis.Content` and `Ellipsis.Popper` components.

::: sandbox

<script lang="tsx">
  export Demo from 'stories/components/ellipsis/docs/examples/advanced_use.tsx';
</script>

:::

## Cursor anchoring

If tooltip size is smaller than the container, you can anchor tooltip position to the cursor.

::: sandbox

<script lang="tsx">
  export Demo from 'stories/components/ellipsis/docs/examples/tooltip-cursor-anchoring.tsx';
</script>

:::