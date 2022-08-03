---
title: Flex-box and indent system
fileSource: flex-box
tabName: Design
---

**Flex-box** is a component for managing arrangement and alignment of other components and elements in the interface.

@## Box

**Box** is a component for changing sizes of the elements or components and arranging indents between the them. By using it, you can set paddings and margins.

Example below shows how to implement equal margins between form components.

@example space

Example below shows how a component creates indents using dynamically generated classes. Thus, you can get this class generated into the component by passing it to `tag`.

@example space-tag

@## Flex

**Flex** is a component for aligning the components. It is a wrapper over CSS-flex.

Example below shows how Flex component takes all properties of a Box component.

@example flex

@## Indent system

The indent system helps maintain a vertical and horizontal rhythms in the interface. It makes the interface easier to use by reducing cognitive load. _For example, if there are different indents in the interface everywhere, the brain will try to understand this logic and thereby add a cognitive load to itself. It is wrong way._

In addition, vertical and horizontal rhythms help maintain visual hierarchy on the page, structure components and blocks according their importance to the user.

> 💡 **Use 4 as the multiple of all the indents**. It is a main denominator of our design system (`scaleIndent` property in API), see [Variables](/style/variables/).

Here is a table with a scale of indents we use in our design system.

| Indent in px | Indent in rem | Indent as a multiple of 4 |
| ------------ | ------------- | ------------------------- |
| 4            | 0.25          | 1                         |
| 8            | 0.5           | 2                         |
| 12           | 0.75          | 3                         |
| 16           | 1             | 4                         |
| 20           | 1.25          | 5                         |
| 24           | 1.5           | 6                         |
| 32           | 2             | 8                         |
| 40           | 2.5           | 10                        |
| 48           | 3             | 12                        |
| 80           | 5             | 20                        |
| 96           | 6             | 24                        |
| 120          | 7.5           | 30                        |

@page box-api
@page box-changelog
