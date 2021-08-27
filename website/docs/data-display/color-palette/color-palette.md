---
title: Color palette
fileSource: chart
tabName: Guide
---

@## Basic rules

The purpose of colors in the chart widgets:

| Color      | Purpose                                                     |
| ---------- | ----------------------------------------------------------- |
| `$gray20`  | Basic text information                                      |
| `$gray60`  | Additional text information                                 |
| `$stone`   | The X-axis and the accent lines on the grid when, if needed |
| `$mercury` | Additional guide lines                                      |

We have a special [palette](/style/color/) for charts.

- Use color in a measured manner and don't make colors too bright for any reason. **Keep in mind the visual hierarchy.**
- If there are several blocks on a page that mention the same entity, then use the same color for in all blocks on the same page.
- **Keep in mind that green and red are often associated with good and bad, growth and decline.**

@## Main palette

> Palettes for charts can be viewed in the [Figma library](https://www.figma.com/@semrush).

Colors of the main palette are recommended to be taken in their due order, skipping one shade.

- There are six basic colors, each has two shades lighter and two shades darker.
- Gray color (`#c5c5c5`) is used to indicate "spaces", missing data, or a balance.
- **We recommend using red in an appropriate context**. In our interface, it is usually used for destructive actions and states.

@## Colors usage order

#### 1. Basic colors

@import color-group {"group": "chart"}

#### 2. One shade lighter

@import color-group {"group": "chart-light-1"}

#### 3. One shade darker

@import color-group {"group": "chart-dark-1"}

#### 4. Two shades lighter

@import color-group {"group": "chart-light-2"}

#### 5. Two shades darker

@import color-group {"group": "chart-dark-2"}

@## Additional palette

The recommended maximum number of colors on a chart is 30.

30 and more colors are for the complex cases where you need a large number of colors that will be substituted into the chart by the system.

> You can also see an additional color palette in the [Figma library](https://www.figma.com/community/file/936940441147792750/Semrush-%E2%80%A2-Charts-library).
