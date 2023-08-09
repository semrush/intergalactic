---
title: Example
fileSource: tooltip
---

> ⚠️ If you require customizing the tooltip behavior, please refer to the [@semcore/ui/popper](/utils/popper/) documentation.

The tooltip component is a wrap over [@semcore/ui/popper](/utils/popper/) with additional features:

- Stylization and themes for the popper.
- Displaying the arrow of the popper.

@## Basic usage

As previously mentioned, the tooltip is essentially a styled version of [@semcore/ui/popper](/utils/popper/) and functions in the same way.

@example tooltip

## Title

To simplify code, the component includes a `title` property where you can pass the content for the popper. This helps reduce code volume .

The code below replicates the functionality of the previous example.

@example tooltip-title

## Singleton

You can use a single tooltip for multiple reference elements. This allows you to "group" tooltips with a shared timer to improve the user experience.

@example tooltip-singleton

@## Ignore portal stacking

By default, when a tooltip is rendered on the edge of a relatively positioned block, the popup mechanism may try to push it inside the block as much as possible. If you don't want this behavior, you can set the `ignorePortalsStacking` prop.

@example ignore-portals-stacking
