---
title: Flex-box
fileSource: flex-box
tabs: Spacing system('box-system-spacing'), API('box-system-api'), Example('box-system-code'), Changelog('box-system-changelog')
---

The spacing system helps maintain a vertical and horizontal rhythms in the interface. It makes the interface easier to use by reducing cognitive load. _For example, if there are different indents in the interface everywhere, the brain will try to understand this logic and thereby increase its cognitive load._

In addition, vertical and horizontal rhythms help maintain visual hierarchy on the page, structure components and blocks according their importance to the user.

::: tip
**Use 4 as the multiple of all indents**. It's the main denominator of our design system (`scaleIndent` property in API, `--scale-indent` in [design tokens](/style/design-tokens/design-tokens)).
:::

Here is a table with [spacing tokens](/style/design-tokens/design-tokens) we use in our design system.

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

