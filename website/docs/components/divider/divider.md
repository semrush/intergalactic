---
title: Divider
fileSource: divider
tabs: Design('divider'), A11y('divider-a11y'), API('divider-api'), Examples('divider-code'), Changelog('divider-changelog')
---

<Playground for="Divider" />

## Description

**Divider** is a component that visually and semantically separates content or components.

## Appearance

### Types

Divider has two types: `primary` and `secondary`. Secondary type helps to separate and show the connection between two parts of the content.

Table: Divider types

| `use`       | Appearance             | Styles                                     |
| ----------- | ---------------------- | ------------------------------------------ |
| `primary`   | ![](static/solid.png)  | `border: 1px solid var(--border-primary)`  |
| `secondary` | ![](static/dashed.png) | `border: 1px dashed var(--border-primary)` |

### Themes

The divider can be used either on a light or dark/colored background.

Table: Divider themes

| `theme` | Appearance                    | Styles                                           |
| ------- | ----------------------------- | ------------------------------------------------ |
| Default | ![](static/default-theme.png) | `border: 1px solid var(--border-primary)`        |
| Invert  | ![](static/invert-theme.png)  | `border: 1px solid var(--border-primary-invert)` |

## Orientation

Table: Divider orientation

| Orientation | Example                       |
| ----------- | ----------------------------- |
| Horizontal  | ![](static/default-theme.png) |
| Vertical    | ![](static/solid.png)         |

## Usage in UX/UI

The divider separates content visually and semantically, whether it's different or similar in meaning.

Table: Divider usage

| Case                                                                                                        | Example               |
| ----------------------------------------------------------------------------------------------------------- | --------------------- |
| Contact information needs to be visually separated from the form.                                           | ![](static/use-1.png) |
| Separate information about a report's data visually from the form, but maintain its connection to the form. | ![](static/use-2.png) |
