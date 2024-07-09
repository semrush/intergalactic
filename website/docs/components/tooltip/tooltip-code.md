---
title: Tooltip
fileSource: tooltip
tabs: Design('tooltip'), A11y('tooltip-a11y'), API('tooltip-api'), Example('tooltip-code'), Changelog('tooltip-changelog')
---

The tooltip component is a wrap over [intergalactic/popper](/utils/popper/popper) with additional features:

- Stylization and themes for the popper.
- Adding arrow for the popper to point to its trigger.

::: tip
If you need to customize tooltip behavior, refer to [intergalactic/popper](/utils/popper/popper) documentation.
:::

## Basic usage

Use the appropriate component depending on your case. See [Tooltip API](tooltip-api) and [Tooltip A11y](tooltip-a11y) for more details.

::: sandbox

<script lang="tsx">
  export Demo from './examples/basic_usage.tsx';
</script>

:::

## Nested trigger accessibility

This example shows how to ensure accessibility if you decide to nest focusable elements instead of merging them with `Trigger`. [Read more about Tooltip accessibility](./tooltip-a11y#recommended-attributes).

::: sandbox

<script lang="tsx">
  export Demo from './examples/nested.tsx';
</script>

:::

## Singleton

You can use a single tooltip for multiple reference elements. This allows you to "group" tooltips with a shared timer to improve the user experience. This example uses React context and memo to bypass select component rerendering and much improve performance during quick navigation.

::: sandbox

<script lang="tsx">
  export Demo from './examples/singleton.tsx';
</script>

:::

## Ignore portal stacking

By default, when a tooltip is rendered on the edge of a relatively positioned block, the popup mechanism may try to push it inside the block as much as possible. If you don't want this behavior, you can set the `ignorePortalsStacking` prop.

::: sandbox

<script lang="tsx">
  export Demo from './examples/ignore_portal_stacking.tsx';
</script>

:::

## Custom background

::: sandbox

<script lang="tsx">
  export Demo from './examples/custom_bg_color.tsx';
</script>

:::
