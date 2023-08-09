---
title: Color palette
fileSource: d3-chart
tabName: Design
docs: true
---

## Basic rules

- Use color thoughtfully and don't make colors too bright without a reason. **Keep in mind the visual hierarchy.**
- If there are several widgets on a page that mention the same entity, then use the same color for the entity in all widgets on the same page.
- **Keep in mind that green and red are often associated with good and bad, growth and decline.**

> **We recommend using red carefully**. It is usually used for destructive actions and invalid states.

## Chart tokens

You can find all tokens for charts in the [tokens list](/style/design-tokens/#semantic_tokens). They all have `chart` in their token name.

## Tokens for text and additional information

| Token                 | Usage                                                       |
| --------------------- | ----------------------------------------------------------- |
| `--text-primary`      | Basic text information                                      |
| `--text-secondary`    | Additional text information                                 |
| `--chart-grid-line`   | The X-axis and the accent lines on the grid when, if needed |
| `--chart-grid-x-axis` | Additional guide lines                                      |

## Colors usage

There are two ways of coloring your data with our palette.

### Categorical order

This way helps to choose colors with a predefined order and contrast for your data. Use chart tokens from the [semantic tokens list](/style/design-tokens/#semantic_tokens) or tokens from the base palette in the [base tokens list](/style/design-tokens/#base_tokens_palette).

#### Basic pack

@import color-group {"group": "basicPack"}

#### Second pack

@import color-group {"group": "secondPack"}

#### Third pack

@import color-group {"group": "thirdPack"}

#### Other data

Use `--chart-palette-order-other-data` token to indicate voids, missing or some other data.

@import color-group {"group": "otherData"}

### Sequental order

This way helps to color your data in a monochromatic way. In this case use tokens from the base palette in the [tokens list](/style/design-tokens/#base).

#### Blue

@import color-group {"group": "blue"}

#### Green

@import color-group {"group": "green"}

#### Salad

@import color-group {"group": "salad"}

#### Orange

@import color-group {"group": "orange"}

#### Yellow

@import color-group {"group": "yellow"}

#### Red

@import color-group {"group": "red"}

#### Pink

@import color-group {"group": "pink"}

#### Violet

@import color-group {"group": "violet"}

#### Gray

@import color-group {"group": "gray"}

## Need more colors?

> The recommended maximum number of colors on a chart is 30.

30 and more colors are for the really complex cases where you need a large number of colors that will be set for the data by the system.

To make a usable palette for this case first use [tokens from the base palette](/style/design-tokens/#base_tokens_palette) with a hue of 300, then 200, then 400 and repeat this steps until you get the desired number of colors.
