---
title: Tooltip
fileSource: tooltip
tabs: Design('tooltip'), A11y('tooltip-a11y'), API('tooltip-api'), Examples('tooltip-code'), Changelog('tooltip-changelog')
---

::: tip New component 🎉
**Hint** is now separate from **Tooltip**. You can find its documentation in [Utils/Hint](../../utils/hint/hint-code).
:::

The tooltip component is a wrapper over [Popper](/utils/popper/popper) with additional features:

- Stylization and themes for the popper.
- Adding arrow for the popper to point to its trigger.

If you need to customize tooltip behavior, refer to [Popper documentation](/utils/popper/popper).

## Basic usage

Use the appropriate component depending on your case. Read more about the differences between tooltip types in the [Design guide](./tooltip).

::: sandbox

<script lang="tsx">
  export Demo from 'stories/components/tooltip/docs/examples/basic_usage.tsx';
</script>

:::

## Nested trigger accessibility

This example shows how to ensure accessibility if you decide to nest focusable elements instead of merging them with `Trigger`. [Read more about Tooltip accessibility](./tooltip-a11y#recommended-attributes).

::: sandbox

<script lang="tsx">
  export Demo from 'stories/components/tooltip/docs/examples/nested.tsx';
</script>

:::

## Singleton

You can use a single tooltip for multiple reference elements. This allows you to "group" tooltips with a shared timer to improve the user experience. This example uses React context and memo to bypass select component rerendering and much improve performance during quick navigation.

::: sandbox

<script lang="tsx">
  export Demo from 'stories/components/tooltip/docs/examples/singleton.tsx';
</script>

:::

## Ignore portal stacking

By default, when a tooltip is rendered on the edge of a relatively positioned block, the popup mechanism may try to push it inside the block as much as possible. If you don't want this behavior, you can set the `ignorePortalsStacking` prop.

::: sandbox

<script lang="tsx">
  export Demo from 'stories/components/tooltip/docs/examples/ignore_portal_stacking.tsx';
</script>

:::

## Custom background color

For some specific cases, you can color the Tooltip's arrow using the `arrowBgColor` property for its background and the `arrowShadowColor` property for its border. For example, if you have a colored illustration placed at the bottom of the Tooltip content, you might want to color the arrow to match the illustration's color.

::: sandbox

<script lang="tsx">
  export Demo from 'stories/components/tooltip/docs/examples/custom_bg_color.tsx';
</script>

:::
