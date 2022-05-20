---
title: Color palette
fileSource: d3-chart
tabName: Design
docs: true
---

@## Basic rules

The usage rules of colors in the chart widgets:

| Color        | Usage                                                       |
| ------------ | ----------------------------------------------------------- |
| `--gray-800` | Basic text information                                      |
| `--gray-500` | Additional text information                                 |
| `--gray-100` | The X-axis and the accent lines on the grid when, if needed |
| `--gray-200` | Additional guide lines                                      |

We have a special [palette](/style/palette/) for charts.

- Use color thoughtfully and don't make colors too bright without a reason. **Keep in mind the visual hierarchy.**
- If there are several widgets on a page that mention the same entity, then use the same color for the entity in all widgets on the same page.
- **Keep in mind that green and red are often associated with good and bad, growth and decline.**

@## Palette

We have eight basic colors, each has five shades. See palette in the Figma library:

- [public library](https://www.figma.com/@semrush);
- [inner library](https://www.figma.com/file/eODzGSSSlI8fl0x5fsv9cf/%E2%9C%A8-Charts).

Gray color (`--gray-200`) is used to indicate voids, missing or other data.

> **We recommend using red in an appropriate context**. In our interface, it is usually used for destructive actions and invalid states.

@## Colors usage order

There are two ways of coloring your data with our palette.

### Categorical order

This way helps to choose colors with a predefined order and contrast for your data.

See recommended colors order in the Figma library:

- [public library](https://www.figma.com/@semrush);
- [inner library](https://www.figma.com/file/eODzGSSSlI8fl0x5fsv9cf/%E2%9C%A8-Charts).

![categorical order](static/categorical.png)

<!-- #### 1. Basic colors -->

<!-- @import color-group {"group": "chart"} -->

<!-- #### 2. Second pack -->

<!-- @import color-group {"group": "second-pack"} -->

<!-- #### 3. Third pack -->

<!-- @import color-group {"group": "third-pack"} -->

<!-- #### 4. Other data -->

<!-- @import color-group {"group": "other-data"} -->

### Sequental order

This way helps to color your data monochromatic.

See palette in the Figma library:

- [public library](https://www.figma.com/@semrush);
- [inner library](https://www.figma.com/file/eODzGSSSlI8fl0x5fsv9cf/%E2%9C%A8-Charts).

![sequental order](static/sequental.png)

@## I need more colors 🙃

> The recommended maximum number of colors on a chart is 30.

30 and more colors are for the really complex cases where you need a large number of colors that will be set for the data by the system.

To make a usable palette for this case first use a color with a hue of 300, then 200, then 400 and repeat this steps until you get the desired number of colors.
