---
title: Divider
fileSource: divider
tabName: Design
---

@import playground

@## Description

**Divider** is a component for separating content/components visually and in a semantic way.

@## Types

Divider has two types: `primary` and `secondary`. Secondary type helps to separate and show the connection between two parts of the content.

|        | Appearance                           | Styles                           |
| ------ | ------------------------------------ | -------------------------------- |
| solid  | ![solid-divider](static/solid.png)   | `border: 1px solid --gray-200;`  |
| dashed | ![dashed-divider](static/dashed.png) | `border: 1px dashed --gray-200;` |

@## Orientation

|            | Example                                         |
| ---------- | ----------------------------------------------- |
| horizontal | ![horizontal-divider](static/default-theme.png) |
| vertical   | ![vertical-divider](static/solid.png)           |

@## Themes

The divider can be used either on a light or dark/colored background.

|         | Appearance                                   | Styles                                       |
| ------- | -------------------------------------------- | -------------------------------------------- |
| default | ![default-divider](static/default-theme.png) | `border: 1px solid --gray-200;`              |
| invert  | ![invert-divider](static/invert-theme.png)   | `border: 1px solid --gray-200;` opacity: .2; |

@## Use in UX/UI

The divider helps distinguish parts of content whether they are different or similar in meaning.

| Case                                                                                                                    | Example                          |
| ----------------------------------------------------------------------------------------------------------------------- | -------------------------------- |
| Contact infromation needs to be visually separeted from the form                                                        | ![divider-use](static/use-1.png) |
| Information about report's data should be visually separated from the form, but should save it's connection to the form | ![divider-use](static/use-2.png) |

@page divider-api
@page divider-changelog
