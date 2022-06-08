---
title: Color palette
fileSource: d3-chart
tabName: Design
docs: true
---

@## Basic rules

- Use color thoughtfully and don't make colors too bright without a reason. **Keep in mind the visual hierarchy.**
- If there are several widgets on a page that mention the same entity, then use the same color for the entity in all widgets on the same page.
- **Keep in mind that green and red are often associated with good and bad, growth and decline.**

> **We recommend using red carefully**. It is usually used for destructive actions and invalid states.

@## Colors for text and additional information

| Color        | Usage                                                       |
| ------------ | ----------------------------------------------------------- |
| `--gray-800` | Basic text information                                      |
| `--gray-500` | Additional text information                                 |
| `--gray-100` | The X-axis and the accent lines on the grid when, if needed |
| `--gray-200` | Additional guide lines                                      |

@## Colors usage

There are two ways of coloring your data with our palette.

@## Categorical order

This way helps to choose colors with a predefined order and contrast for your data.

### Basic pack

@import color-group {"group": "basicPack"}

### Second pack

@import color-group {"group": "secondPack"}

### Third pack

@import color-group {"group": "thirdPack"}

### Other data

Use it to indicate voids, missing or some other data.

@import color-group {"group": "otherData"}

@## Sequental order

This way helps to color your data in a monochromatic way.

### Blue

@import color-group {"group": "blue"}

### Green

@import color-group {"group": "green"}

### Salad

@import color-group {"group": "salad"}

### Orange

@import color-group {"group": "orange"}

### Yellow

@import color-group {"group": "yellow"}

### Red

@import color-group {"group": "red"}

### Pink

@import color-group {"group": "pink"}

### Violet

@import color-group {"group": "violet"}

### Gray

@import color-group {"group": "gray"}

@## I need more colors 🙃

> The recommended maximum number of colors on a chart is 30.

30 and more colors are for the really complex cases where you need a large number of colors that will be set for the data by the system.

To make a usable palette for this case first use a color with a hue of 300, then 200, then 400 and repeat this steps until you get the desired number of colors.
