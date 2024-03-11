---
title: Tooltip
fileSource: tooltip
tabs: Design('tooltip'), A11y('tooltip-a11y'), API('tooltip-api'), Example('tooltip-code'), Changelog('tooltip-changelog')
---

::: warning
:warning: If you require customizing the tooltip behavior, please refer to the [intergalactic/popper](/utils/popper/popper) documentation.
:::

The tooltip component is a wrap over [intergalactic/popper](/utils/popper/popper) with additional features:

* Stylization and themes for the popper.
* Adding arrow for the popper to point to its trigger.

## Basic usage

As previously mentioned, the tooltip is a styled version of [popper](/utils/popper/popper) and operates similarly.

`Tooltip` contains `Hint` and `DescriptionTooltip`. By using correct component, you will enhance end interface accessibility. 

1. Use `Hint` if the trigger lacks a visible name. Content should be brief and non-interactive.
2. Use `Tooltip` when the trigger has a visible name and the content consists of a single text sentence. It may also include interactive elements.
3. Use `DescriptionTooltip` when the trigger has a visible name and the content provides a significant amount of additional information. It may contain numerous interactive elements.

::: sandbox

<script lang="tsx">
  export Demo from './examples/basic_usage.tsx'; 
</script>

:::

## Title

To simplify code, the component has a `title` property or passing content to the popper, reducing code volume.

The code below replicates the functionality of `Hint` example above.

::: sandbox

<script lang="tsx">
  export Demo from './examples/title.tsx'; 
</script>

:::

## Popper trigger accessibility

To ensure accessibility for assistive technologies, set the `aria-describedby` attribute on the trigger, referencing the popper. Therefore, it's necessary to merge nested focusable elements (like links or interactive icons) using the `tag` prop. If you intend to include focusable elements within the trigger, **you must set** the trigger's `aria-describedby` to `undefined` and assign the focusable element's `aria-describedby` to the value you get from the children render function.

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

## Icon as trigger

You can use an interactive icon as a Tooltip's trigger.

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
