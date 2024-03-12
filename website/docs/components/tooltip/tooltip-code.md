---
title: Tooltip
fileSource: tooltip
tabs: Design('tooltip'), A11y('tooltip-a11y'), API('tooltip-api'), Example('tooltip-code'), Changelog('tooltip-changelog')
---

::: warning
:warning: If you require customizing the tooltip behavior, please refer to the [intergalactic/popper](/utils/popper/popper) documentation.
:::

The tooltip component is a wrap over [intergalactic/popper](/utils/popper/popper) with additional features:

- Stylization and themes for the popper.
- Displaying the arrow of the popper.

## Basic usage

As previously mentioned, the tooltip is essentially a styled version of [intergalactic/popper](/utils/popper/popper) and functions in the same way.

::: sandbox

<script lang="tsx">
  export Demo from './examples/basic_usage.tsx';
</script>

:::

## Title

To simplify code, the component includes a `title` property where you can pass the content for the popper. This helps reduce code volume .

The code below replicates the functionality of the previous example.

::: sandbox

<script lang="tsx">
  export Demo from './examples/title.tsx';
</script>

:::


## Accessibility

To make use of Tooltip accessible for assistive tocologies, the `aria-describedby` is being set on the trigger that refers to the popper. That's why you need to merge nested focusable elements (such links or interactive icons) with the `tag` prop. If you want to put focusable elements inside of the trigger, you **must** set the trigger `aria-describedby` to `undefined` and set the focusable element `aria-describedby` to the value that you can get from the children render function.

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

## Interactive icon as tooltip trigger

You can use an Icon as a Trigger for Tooltip

::: sandbox

<script lang="tsx">
  export Demo from './examples/info_icon.tsx';
</script>

:::

## Ignore portal stacking

By default, when a tooltip is rendered on the edge of a relatively positioned block, the popup mechanism may try to push it inside the block as much as possible. If you don't want this behavior, you can set the `ignorePortalsStacking` prop.

::: sandbox

<script lang="tsx">
  export Demo from './examples/ignore_portal_stacking.tsx';
</script>

:::
