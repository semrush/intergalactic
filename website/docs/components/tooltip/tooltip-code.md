---
title: Example
fileSource: tooltip
---

> ⚠️ If you need to customize work with the tooltip, see the [@semcore/ui/popper](/utils/popper/) documentation.

The component is a wrap over [@semcore/ui/popper](/utils/popper/) with the following additions:

- Stylization and themes for a dropdown window
- Displaying the arrow of a dropdown window

@## Basic use

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

When tooltip is rendered on the age of `relative`ly positioned block, popup mechanism may try to push it inside of the block as much as possible. If it is not a desired behavior, set `ignorePortalsStacking` prop.

@example ignore-portals-stacking
