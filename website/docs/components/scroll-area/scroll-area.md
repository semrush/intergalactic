---
title: ScrollArea
fileSource: scroll-area
tabs: Design('scroll-area'), A11y('scroll-area-a11y'), API('scroll-area-api'), Examples('scroll-area-code'), Changelog('scroll-area-changelog')
---

## Description

**ScrollArea** is a component that allows you to customize the native scroll functionality. It enables smooth navigation through content within a window or block, both vertically and horizontally.

## Component composition

![](static/scroll-composition.png)

The ScrollArea consists of the following elements:

1. Container with content (`ScrollArea.Container`).
2. Scroll indicator (`ScrollArea.Bar`).
3. Slider (`ScrollArea.Bar.Slider`).

## Appearance

Table: ScrollArea styles

| Element                 | Styles                                      |
| ----------------------- | ------------------------------------------- |
| `ScrollArea.Bar`        | `background: transparent`                  |
| `ScrollArea.Bar.Slider` | `background: var(--scroll-bar-background)` |

## Interaction

Scrolling inside the block can be controlled by:

- Mouse wheel.
- Arrow keys while focusing on an element.
- Touchpad gestures.
- Elements of a scrollbar such as sliders and buttons.
