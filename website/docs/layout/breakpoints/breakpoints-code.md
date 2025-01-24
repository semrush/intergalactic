---
title: Breakpoints
fileSource: breakpoints
tabs: Design('breakpoints'), API('breakpoints-api'), Example('breakpoints-code'), Changelog('breakpoints-changelog')
---

## Simple use

To use breakpoints in your application, you need to wrap it in a `<Breakpoints />` component.
And then you can get the value of the media query in any part of your application through the context.

::: tip
Resize the window to see the changes.
:::

::: sandbox

<script lang="tsx">
  export Demo from 'stories/components/breakpoints/docs/examples/simple-use.tsx';
</script>

:::

## Manual control

You can use an instance of the `MediaList` class, it has methods `matches`/`addListener`/`removeListener` and `destructor`.

::: sandbox

<script lang="tsx">
  export Demo from 'stories/components/breakpoints/docs/examples/manual-control.tsx';
</script>

:::

## Custom media

If you want to create a custom breakpoint component you need to call the `createBreakpoints()` function and pass an array of media queries.

::: tip
The 'Breakpoints.mediaList.matches()' will return the intex of the first matching media query. From left to right.
:::

::: sandbox

<script lang="tsx">
  export Demo from 'stories/components/breakpoints/docs/examples/custom-media.tsx';
</script>

:::

## Mocking

You can mock global media queries for testing purposes.

::: warning
It will work if you use `createBreakpoints` function only.
:::

::: sandbox

<script lang="tsx">
  export Demo from 'stories/components/breakpoints/docs/examples/mocking.tsx';
</script>

:::
