---
title: ellipsis
tabs: Design('ellipsis'), A11y('ellipsis-a11y'), API('ellipsis-api'), Example('ellipsis-code'), Changelog('ellipsis-changelog')
---

## Basic usage

Out of the box, you can use `Text` component with ellipsis settings.

::: sandbox

<script lang="tsx">
  export Demo from 'stories/components/base-components/ellipsis/docs/examples/basic-usage.tsx';
</script>

:::

## useEllipsis hook

The useEllipsis hook helps determine whether the content of a referenced DOM element fits within its container.
If the content overflows, the hook can automatically apply a CSS class or inline style (e.g., text-overflow: ellipsis) to visually truncate the text.
This is useful for managing long strings in limited-width containers without manual checks.
The hook listens for changes in size and updates dynamically.

::: sandbox

<script lang="tsx">
  export Demo from 'stories/components/base-components/ellipsis/docs/examples/use-ellipsis-hook.tsx';
</script>

:::

## Multiple use

In case of multiple use of a component for optimization you can use one observer for all components.

::: sandbox

<script lang="tsx">
  export Demo from 'stories/components/base-components/ellipsis/docs/examples/multiple-use.tsx';
</script>

:::
