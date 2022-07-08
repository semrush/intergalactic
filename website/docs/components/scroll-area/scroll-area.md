---
title: ScrollArea
fileSource: scroll-area
tabName: Design
---

@## Description

**Scroll** is a component for moving through content inside a window/block vertically and/or horizontally.

@## Appearance

### Component composition

- Container with content (`ScrollArea.Container`);
- Scroll indicator (`ScrollArea.Bar`).

![scheme](static/scroll-scheme.png)

### Styles

Scrollbar has the following styles:

| Element                 | Styles                           |
| ----------------------- | -------------------------------- |
| `ScrollArea.Bar`        | `background: transparent;`       |
| `ScrollArea.Bar.Slider` | `background: rgba(0, 0, 0, .3);` |

Width of `ScrollArea.Bar` is 8px.

@## Interaction

### Behavior

The scroll inside the block can be controlled by means of:

- mouse wheel;
- the arrow key while focusing on an element;
- touchpad gestures, etc.;
- elements of a scrollbar like sliders and buttons.

@## Long scrolling

> _Long scrolling helps to build a narration and sends the user on a journey. It allows the user to scroll through the content without additional interaction._
>
> (c) Roma Lysov 🤪

@## Infinite scrolling

With infinite scrolling content is loaded in portions. This type of scrolling is especially good if there is a lot of content on the page, and you do not need to divide it into separate pages.

@page scroll-area-api
@page scroll-area-code
@page scroll-area-changelog
