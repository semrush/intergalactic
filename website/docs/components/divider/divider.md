---
title: Divider
fileSource: divider
tabName: Design
---

@import playground

@## Description

**Divider** is a component that visually and semantically separates content or components.

@## Types

Divider has two types: `primary` and `secondary`. Secondary type helps to separate and show the connection between two parts of the content.

| Type       | Appearance                           | Styles                                      |
| ------ | ------------------------------------ | ------------------------------------------- |
| `primary`  | ![](static/solid.png)   | `border: 1px solid var(--border-primary)`  |
| `secondary` | ![](static/dashed.png) | `border: 1px dashed var(--border-primary)` |

@## Orientation

| Orientation           | Example                                         |
| ---------- | ----------------------------------------------- |
| Horizontal | ![](static/default-theme.png) |
| Vertical   | ![](static/solid.png)           |

@## Themes

The divider can be used either on a light or dark/colored background.

| Theme        | Appearance                                   | Styles                                            |
| ------- | -------------------------------------------- | ------------------------------------------------- |
| Default | ![](static/default-theme.png) | `border: 1px solid var(--border-primary)`        |
| Invert  | ![](static/invert-theme.png)   | `border: 1px solid var(--border-primary-invert)` |

@## Usage in UX/UI

The divider separates content visually and semantically, whether it is different or similar in meaning.

| Case                                                                                                                    | Example                          |
| ----------------------------------------------------------------------------------------------------------------------- | -------------------------------- |
| Contact information needs to be visually separated from the form.                                                        | ![](static/use-1.png) |
| Separate information about a report's data visually from the form, but maintain its connection to the form. | ![](static/use-2.png) |

@page divider-a11y
@page divider-api
@page divider-changelog
