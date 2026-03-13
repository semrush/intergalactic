---
title: Color palette
fileSource: d3-chart
tabName: Design
docs: true
---

## Basic principles

- Use colors thoughtfully and avoid excessive brightness without a valid reason, **always considering the visual hierarchy**.
- When multiple widgets on a page reference the same entity, ensure consistent color usage for that entity across all widgets on the page.
- Be mindful that green and red are often associated with positive and negative connotations, such as growth and decline.

::: tip
We recommend using red carefully, as it's typically reserved for destructive actions and invalid states.
:::

## Chart tokens

For chart-related elements, refer to the [tokens list](/style/design-tokens/design-tokens#semantic-tokens) containing tokens with `chart` in their names.

## Text and grid tokens

Table: Tokens for text and additional information

| Token                 | Usage                                                    |
| --------------------- | -------------------------------------------------------- |
| `--text-primary`      | Primary text information                                 |
| `--text-secondary`    | Additional text information                              |
| `--chart-grid-line`   | Grid lines for the X-axis and accent lines, if necessary |
| `--chart-grid-x-axis` | Additional guide lines for X-axis                        |

## Color usage

There are two approaches for applying colors from our palette:

### Categorical order

This method assists in selecting colors in a predefined order with suitable contrast for your data. Use chart tokens from the [semantic tokens list](/style/design-tokens/design-tokens#semantic-tokens) or tokens from the base palette in the [base tokens list](/style/design-tokens/design-tokens#base-tokens-palette).

::: react-view

<script lang="tsx">
import React from 'react';
import ChartCategoricalOrderPalette from '@components/ChartCategoricalOrderPalette';

const App = function (props) {
  return <ChartCategoricalOrderPalette />;
}
</script>

:::

- **Total amount:** use `--intergalactic-chart-palette-order-total-amount` token to indicate total values.
- **Other data:** use `--intergalactic-chart-palette-order-other-data` token to indicate voids, missing or some other data.
- **Null and n/a data:** use `--intergalactic-chart-palette-order-null` token to indicate null or not available data when applicable (for example, in Donut chart).

### Sequental order

This method helps to color your data in a monochromatic way. In this case use tokens from the base palette in the [tokens list](/style/design-tokens/design-tokens#base-tokens-palette).

::: react-view

<script lang="tsx">
import React from 'react';
import ChartSequentialOrderPalette from '@components/ChartSequentialOrderPalette';

const App = function (props) {
  return <ChartSequentialOrderPalette />;
}
</script>

:::

## Need more colors?

::: tip
The recommended maximum number of colors on a chart is 30.
:::

Using 30 or more colors is reserved for exceptionally complex scenarios when a large number of colors must be assigned by the system for data representation.

To create a usable palette for such situations, begin by using [tokens from the base palette](/style/design-tokens/design-tokens#base-tokens-palette) with a hue of 300, followed by 200, and then 400. Continue this process until you achieve the desired quantity of colors.

## Accessibility

To make charts visually accessible, use [pattern fills, dots and lines](../d3-chart/d3-chart-a11y.md#pattern-fills-dots-and-lines).
