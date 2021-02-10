---
title: Code
---

@## Simple use

To use breakpoints in your application, you need to wrap it in a `<Breakpoints />` component.
And then you can get the value of the media query in any part of your application through the context.

> Resize the window to see the changes.

@example simple

@## Manual control

You can use an instance of the `MediaList` class, it has methods` matches` / `addListener` /` removeListener` and `destructor`.

@example manual

@## Custom media

If you want to create a custom breakpoint component you need to call the `createBreakpoints()` function and pass an array of media queries.

@example custom
