---
title: Hint
fileSource: hint
tabs: Design('hint'), A11y('hint-a11y'), API('hint-api'), Changelog('hint-changelog')
---

::: tip
`Hint` from `@semcore/base-components` is a new, more lightweight and performant implementation of `Hint` from `@semcore/tooltip`, with identical design and behavior.
:::

Use `Hint` to provide labels for elements without visible text or with truncated text.

`Hint` is triggered on mouse hover or keyboard focus.

## Basic usage

::: sandbox

<script lang="tsx">
  export Demo from 'stories/components/base-components/hint/docs/examples/basic-usage.tsx';
</script>

:::

## Placement

You can set your own placement of the `Hint`.

::: sandbox

<script lang="tsx">
  export Demo from 'stories/components/base-components/hint/docs/examples/placement.tsx';
</script>

:::

## Timeout

You can customize timeouts for showing and hiding the `Hint`.

::: sandbox

<script lang="tsx">
  export Demo from 'stories/components/base-components/hint/docs/examples/timeout.tsx';
</script>

:::
