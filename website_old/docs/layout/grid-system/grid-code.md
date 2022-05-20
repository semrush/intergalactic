---
title: Grid system
fileSource: grid
tabName: Example
---

@## Description

It's a component for building a 12-column grid.

> 💡 In the product interface we use a 12-column grid with a fixed 24px gutter between columns. The columns stretch.

@## Example use

The `Row` component accepts all the properties of the `Flex` component, and the `Col` component accepts all the properties of the `Box` component.

@example grid

@## Change in general offset

Arranging offsets for each column to the left.

@example offset

@## Change in the general gutter between the columns

You can change gutters between the columns, which gives flexibility in use.

@example gutter

@## Automatic column size detection

@example auto

@## Responsive

The grid has functionality for responsive layouts. You can change width and offsets of the columns depending on the screen size.

> 💡 The grid works as desktop first, as our core products are designed to work primarily on the desktop.

@example responsive

@## Responsive alternative API

We have added an alternative API for responsive grids. It's more laconic.

@example alternative
