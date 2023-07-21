---
title: Example
fileSource: tooltip
---

> ⚠️ If you need to customize work with the tooltip, see the [@semcore/ui/popper](/utils/popper/) documentation.

The component is a wrap over [@semcore/ui/popper](/utils/popper/) with the following additions:

- Stylization and themes for a dropdown window
- Displaying the arrow of a dropdown window

@## Basic usage

As mentioned above, tooltip is just a stylized wrap over the [@semcore/ui/popper](/utils/popper/). It works exactly the same way.

@example tooltip

@## Title

For your convenience, the component has property `title`, to which you can pass content for a dropdown window. This will allow you to reduce the volume of the code 🧐

The code below fully repeats the functionality of the previous example.

@example tooltip-title

@## Singleton

Use a single tooltip for many different reference elements. This allows you to "group" tooltips with a shared timer
to improve UX.

@example tooltip-singleton

@## Singleton

When a tooltip is rendered on the edge of a relatively positioned block, the popup mechanism may attempt to push it inside the block as much as possible. If this behavior isn’t desired, you can set the `ignorePortalsStacking` prop.

@example ignore-portals-stacking
