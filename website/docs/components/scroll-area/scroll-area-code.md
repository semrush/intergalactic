---
title: ScrollArea
fileSource: scroll-area
tabs: Design('scroll-area'), A11y('scroll-area-a11y'), API('scroll-area-api'), Example('scroll-area-code'), Changelog('scroll-area-changelog')
---

## Basic usage

To use the ScrollArea component, wrap your content with `ScrollArea`. It will create a couple of `div` wraps and handle the necessary calculations. You can set the `height` or `width` directly on the `ScrollArea` or somewhere higher in the hierarchy. `max-height` and `max-width` are also supported.

::: sandbox

<script lang="tsx">
  export Demo from 'stories/components/scroll-area/docs/examples/basic_usage.tsx';
</script>

:::

## Synchronized scroll on two different screens

::: sandbox

<script lang="tsx">
  export Demo from 'stories/components/scroll-area/docs/examples/synchronized_scroll_on_two_different_screens.tsx';
</script>

:::

## Synchronized reverse scroll on two different screens

::: sandbox

<script lang="tsx">
  export Demo from 'stories/components/scroll-area/docs/examples/synchronized_reverse_scroll_on_two_different_screens.tsx';
</script>

:::

## Dynamic virtual list

The dynamic virtual list is powered by [React-virtualized](https://github.com/bvaughn/react-virtualized).

::: sandbox

<script lang="tsx">
  export Demo from 'stories/components/scroll-area/docs/examples/dynamic_virtual_list.tsx';
</script>

:::
