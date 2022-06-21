---
title: Informer
tabName: Design
---

@## Description

**Informer** is a pattern used for visual marking of hints in the interface.

It is required when there is no space or possibility to put, for example, [hint link](/style/typography/) next to the component.

@## Appearance

The informer consists of:

- Info icon with `margin-left: 4px`;
- [tooltip](/components/tooltip/) with a hint message (appears when you hover over the icon).

> 💡 The Info icon shouldn't be used with the h1 title. This is usually the title of hero blocks, etc. Hiding hints in an info icon next to the main page's title is strange, isn't it? 😎

| Font size                            | Icon size | Use                                                                  |
| ------------------------------------ | --------- | -------------------------------------------------------------------- |
| 36px (`--fs-700`), 32px (`--fs-600`) | L         | Use only with the largest titles and controls.                       |
|                                      |           | ![info icon with bug hwdings](static/big-headings.png)               |
| Smaller tnah 24px (`--fs-500`)       | M         | Use with text sizes smaller than 24px.                               |
|                                      |           | ![info icon with headings](static/other-headings.png)                |
|                                      |           | ![info icon with all text sizes](static/text.png)                    |
|                                      |           | ![info icon with dropdown mwnu items](static/dropdown-item-icon.png) |

@## Interaction

| State  | Appearance example                             | Styles                                                                          |
| ------ | ---------------------------------------------- | ------------------------------------------------------------------------------- |
| normal | ![info icon](static/info.png)                  | `background-color: --var(--gray-300);`                                          |
| hover  | ![info icon with hover](static/info-hover.png) | The icon color doesn't change on hover. Only cursor changes to `cursor: help;`. |

@## Click zone

| Icon size | The size of the click zone                             |
| --------- | ------------------------------------------------------ |
| L         | `24px * 24px`                                          |
|           | ![hover zone for l icon size](static/hover-zone-l.png) |
| M         | `16px * 16px`                                          |
|           | ![hover zone for m icon size](static/hover-zone-m.png) |

@## The tooltip

See detailed infromation in the [Tooltip guide](/components/tooltip/).

@## Use in UX/UI

If the Info icon hides additional information about the control in a group of controls (for example, in filters), then pay attention to margins.

![info icon yes-no situation](static/informer-yes-no.png)

In the case when controls have text labels, place Info icon next to the labels.

![info icon with group of buttons](static/info-with-butt-group.png)

@page informer-code
