---
title: Example
fileSource: scroll-area
---

@## Basic use

For basic use it is enough just to wrap your content into `ScrollArea`. It will create a couple of wraps (`div`) and make the necessary calculations. The height or width should be set at the scroll itself or somewhere higher, `max-height` and `max-width` are also supported.

@example basic

@## Synchronized scroll on two different screens

@example master-slave

@## Synchronized reverse scroll on two different screens

@example reverse

@## Scrollbar out of container

@example bar

@## Dynamic virtual list

[React-virtualized](https://github.com/bvaughn/react-virtualized) is responsible for work of the virtual list ✨

@example virtual-list
