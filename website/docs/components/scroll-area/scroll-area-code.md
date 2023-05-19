---
title: Example
fileSource: scroll-area
---

@## Basic usage

To use the ScrollArea component, wrap your content with `ScrollArea`. It will create a couple of `div` wraps and handle the necessary calculations. You can set the `height` or `width` directly on the `ScrollArea` or somewhere higher in the hierarchy. `max-height` and `max-width` are also supported.

@example basic

## Synchronized scroll on two different screens

@example main-and-controlled

## Synchronized reverse scroll on two different screens

@example reverse

## Scrollbar out of container

@example bar

## Dynamic virtual list

The dynamic virtual list is powered by [React-virtualized](https://github.com/bvaughn/react-virtualized).

@example virtual-list
