---
title: Flex-box and spacing system
fileSource: flex-box
tabName: Design
---

**Flex-box** is a component for managing arrangement and alignment of other components and elements in the interface.

## Box

**Box** is a component for changing sizes of the elements or components and arranging indents between the them. By using it, you can set paddings and margins.

Example below shows how to implement equal margins between form components.

@example space

Example below shows how a component creates indents using dynamically generated classes. Thus, you can get this class generated into the component by passing it to `tag`.

@example space-tag

## Flex

**Flex** is a component for aligning the components. It is a wrapper over CSS-flex.

Example below shows how Flex component takes all properties of a Box component.

@example flex

## Spacing system

The spacing system helps maintain a vertical and horizontal rhythms in the interface. It makes the interface easier to use by reducing cognitive load. _For example, if there are different indents in the interface everywhere, the brain will try to understand this logic and thereby add a cognitive load to itself. It is wrong way._

In addition, vertical and horizontal rhythms help maintain visual hierarchy on the page, structure components and blocks according their importance to the user.

> **Use 4 as the multiple of all the indents**. It is a main denominator of our design system (`scaleIndent` property in API, `--scale-indent` in tokens), see [Design tokens](/style/design-tokens/).

Here is a table with [spacing tokens](/style/design-tokens/) we use in our design system.

| Token name      | Value in px | Value in rem | Value as a multiple of 4 |
| --------------- | ----------- | ------------ | ------------------------ |
| `--spacing-05x` | 2           | 0.125        | 0,5                      |
| `--spacing-1x`  | 4           | 0.25         | 1                        |
| `--spacing-2x`  | 8           | 0.5          | 2                        |
| `--spacing-3x`  | 12          | 0.75         | 3                        |
| `--spacing-4x`  | 16          | 1            | 4                        |
| `--spacing-5x`  | 20          | 1.25         | 5                        |
| `--spacing-6x`  | 24          | 1.5          | 6                        |
| `--spacing-8x`  | 32          | 2            | 8                        |
| `--spacing-10x` | 40          | 2.5          | 10                       |
| `--spacing-14x` | 56          | 3.5          | 14                       |
| `--spacing-20x` | 80          | 5            | 20                       |
| `--spacing-24x` | 96          | 6            | 24                       |
| `--spacing-30x` | 120         | 7.5          | 30                       |

@page box-api
@page box-changelog
