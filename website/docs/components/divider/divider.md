---
title: Divider
fileSource: divider
tabName: Design
---

@import playground

@## Description

**Divider** is a component we use to separate content/components visually and in a semantic way.

@## Types

The divider has a secondary type, which is a dashed line. Typically, it is needed to emphasize the connection between two parts of the content. _PanelSummary is an example of this._

The color of the divider is specified in [Variables](/style/variables/#a7af23): `--gray-200`.

|        | Appearance                           | Styles                           |
| ------ | ------------------------------------ | -------------------------------- |
| solid  | ![solid-divider](static/solid.png)   | `border: 1px solid --gray-200;`  |
| dashed | ![dashed-divider](static/dashed.png) | `border: 1px dashed --gray-200;` |

@## The orientation of the divider is specified in

|            | Example                                         |
| ---------- | ----------------------------------------------- |
| horizontal | ![horizontal-divider](static/default-theme.png) |
| vertical   | ![vertical-divider](static/solid.png)           |

@## Themes

The divider can be used either on a light or dark/colored background.

|         | Appearance                                   | Styles                                        |
| ------- | -------------------------------------------- | --------------------------------------------- |
| default | ![default-divider](static/default-theme.png) | `border: 1px solid --gray-200;`               |
| invert  | ![invert-divider](static/invert-theme.png)   | `border: 1px solid --gray-200;` opacity: 20%; |

@## Use in UX/UI

The divider can distinguish between two parts of content whether they are different or similar in meaning.

- In the first case, the divider reaches the edges of the container.

![divider-use](static/use-1.png)

- In the second case, the divider does not reach the edges of the container.

![divider-use](static/use-2.png)

@page divider-api
@page divider-changelog
