---
title: SpinContainer
fileSource: spin-container
tabName: Design
tabs: SpinContainer('spin-container'), A11y('spin-container-a11y'), API('spin-container-api'), Example('spin-container-code'), Changelog('spin-container-changelog')
---

@import playground

## Description

**SpinContainer** is a component designed to display the [Spin](/components/spin/) around a component, widget, or page.

## Appearance

- The [Spin](/components/spin/) is consistently positioned in the center of the SpinContainer.
- To create an overlay under the SpinContainer, use the `--overlay-limitation-secondary token`.

![](static/spincontainer-dropdown.png)

## Fixed Spin with Sticky (deprecated)

For larger blocks, widgets, and pages, you had the option to enclose the Spin within the [Sticky](/components/sticky/) component, ensuring that the loading message remains visible within the user's viewport at all times. However, this approach is now deprecated.

