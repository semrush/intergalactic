---
title: Spacing system (box & flex)
fileSource: flex-box
tabName: Guide
---

> ⚠️ The component has a major version, changes in the [migration guide](/internal/migration-guide).

Layout-group components are designed to facilitate arrangement of components in their places.

@## Description

The spacing system helps maintain a vertical and horizontal rhythm in the interface. It makes the interface easier to use by reducing cognitive load. _For example, if there are different indents in the interface everywhere, the brain will try to understand this logic and thereby add a cognitive load to itself. It is wrong way._

In addition, vertical and horizontal rhythms help maintain visual hierarchy on the page, structure components and blocks according to their importance.

**We have two components for working with the spacing**:

- Box;
- Flex.

@## Box

**Box** is a component for arranging indents between the components. By using it, you can set internal and external indents.

**Example:** Implementing equal indents between form components.

@example space

**Example:** A component indents using dynamically generated classes. Thus, we can get this class generated into our component by passing it to `tag`.

@## Flex

**Flex** is a component for aligning the components, wrapper over CSS-flex.

**Example:** A `Flex` component takes all properties of a `Box` component.

@example flex

@## Spacing system

> 💡 **According to our [variables](/style/variables/), the multiplier of all default indents is 4**. This is our main denominator (API `scaleIndent` property).

Here is a table with a scale of spacings we use in our interface.

| Spacing in px | Spacing in rem | Color coding                                     |
| ------------- | -------------- | ------------------------------------------------ |
| 4             | 0.25           | ![color for 4px spacing](static/spacing-4.png)   |
| 8             | 0.5            | ![color for 8px spacing](static/spacing-8.png)   |
| 12            | 0.75           | ![color for 12px spacing](static/spacing-12.png) |
| 16            | 1              | ![color for 16px spacing](static/spacing-16.png) |
| 20            | 1.25           | ![color for 20px spacing](static/spacing-20.png) |
| 24            | 1.5            | ![color for 24px spacing](static/spacing-24.png) |
| 32            | 2              | ![color for 32px spacing](static/spacing-32.png) |
| 40            | 2.5            | ![color for 40px spacing](static/spacing-40.png) |
| 48            | 3              | ![color for 48px spacing](static/spacing-48.png) |

@## General rules

- The spacing between logically different blocks is 24px. _For example, between widgets on Overview._
- Inside widgets, spacings are always are: 20px at the top (required to compensate for the indent + line height of the widget's title) and 24px to the left, right and at the bottom.
- You can use other spacings if you need to strengthen the connection between blocks or, conversely, separate them visually. **But remember about common sense, consult with your colleagues** 😏

@page box-api
@page box-changelog
