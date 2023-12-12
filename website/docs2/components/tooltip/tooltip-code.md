---
title: Tooltip
fileSource: tooltip
tabs: Design('tooltip'), A11y('tooltip-a11y'), API('tooltip-api'), Example('tooltip-code'), Changelog('tooltip-changelog')
---

::: warning
:warning: If you require customizing the tooltip behavior, please refer to the [@semcore/ui/popper](/utils/popper/popper) documentation.
:::

The tooltip component is a wrap over [@semcore/ui/popper](/utils/popper/popper) with additional features:

- Stylization and themes for the popper.
- Displaying the arrow of the popper.

## Basic usage

As previously mentioned, the tooltip is essentially a styled version of [@semcore/ui/popper](/utils/popper/popper) and functions in the same way.

::: sandbox

<script lang="tsx" src="examples/basic_usage.tsx"></script>

:::

## Title

To simplify code, the component includes a `title` property where you can pass the content for the popper. This helps reduce code volume .

The code below replicates the functionality of the previous example.

::: sandbox

<script lang="tsx" src="examples/title.tsx"></script>

:::

## Singleton

You can use a single tooltip for multiple reference elements. This allows you to "group" tooltips with a shared timer to improve the user experience.

::: sandbox

<script lang="tsx" src="examples/singleton.tsx"></script>

:::

## Ignore portal stacking

By default, when a tooltip is rendered on the edge of a relatively positioned block, the popup mechanism may try to push it inside the block as much as possible. If you don't want this behavior, you can set the `ignorePortalsStacking` prop.

::: sandbox

<script lang="tsx" src="examples/ignore_portal_stacking.tsx"></script>

:::
