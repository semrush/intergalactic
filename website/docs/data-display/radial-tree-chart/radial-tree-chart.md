---
title: Radial Tree chart
fileSource: d3-chart
tabName: Design
---

@## Description

**Radial Tree chart** is a radial chart for visual organization of information, one of the versions of MindMap. Such a chart in focus always has one central element (idea, phrase, keyword), which starts the search for new related ideas / topics / keywords.

**Use this chart when:**

- you need to visualize related ideas / topics / keywords;
- you need a tool for pre-analytical hierarchical visualization of ideas/themes/keywords.

@## Appearance

Basic rules for visualizing data as a Radial Tree:

- There should always be one idea/topic/keyword in the center. Build the rest of the chart from it.
- Keep it simple. The simpler the visualization, the more readable and understandable it is.
- There should be as much space as possible for such a chart. Otherwise, the data will be difficult to read.

| Appearance example                                    | Styles and sizes                                                     |
| ----------------------------------------------------- | -------------------------------------------------------------------- |
| ![default radial tree example](static/radialtree.png) | The recommended minimum chart size is 600px (don't make it smaller). |

### Value's styles

#### Default state

![value of radial tree](static/margins.png)

![value of radial tree](static/sizes1.png)

- Stroke width — 1px.
- Default size of the circle bullet — `8px * 8px`.
- Font size — 14px (`--fs-200`).
- In the default state, use 400 hue colors. E.g., `--blue-400`, `--red-400`, `--green-400` , etc.

#### Active state

![value of radial tree](static/sizes2.png)

- Size of the circle bullet in the active state — `16px * 16px`.
- You can place an icon of M size inside the circle bullet in the active state.

@## Legend

For cases where you need to group data using colors on a chart, add a legend next to the chart. This will make it easier for users to read the data.

![legend for radial tree](static/legend.png)

@## Tooltip

This chart doesn't need tooltip.

@## Interaction

| State   | Appearance example                              | Styles                                                                                                                                                                                                                                                    |
| ------- | ----------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| default | ![value in a default state](static/default.png) | In the default state, use 400 hue colors. E.g., `--blue-400`, `--red-400`, `--green-400` , etc.                                                                                                                                                           |
| hover   | ![value in a hover state](static/hover.png)     | For the text's hover state use the next color hue. E.g., `--blue-500`, `--red-500`, `--green-500` , etc. **Do not change the color of the additional line and the circle bullet.**                                                                        |
| active  | ![value in an active state](static/active.png)  | In the active state, the text has the same color as on hover, but changes its font-weight to 700. E.g., `--blue-500`, `--red-500`, `--green-500` , etc. The circle bullet grows to `16px * 16px` size. You can place an icon inside the bullet if needed. |

@## Animation

All values appears from the center with `ease-in` and `200ms` delay.

The transparency of values appearance changes from 0 to 100 with `ease-in` and `200ms` delay.

@## Edge cases

| Case                                                                                                                                                                                                                           | Appearance example                                                |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ----------------------------------------------------------------- |
| **One value**                                                                                                                                                                                                                  | ![radial tree with one value](static/one-value.png)               |
| **Two values**                                                                                                                                                                                                                 | ![radial tree with two values](static/two-values.png)             |
| **Few values.** If there are very few values, then they are evenly distributed around the entire circle relative to the central value in a clockwise direction.                                                                | ![radial tree with few values](static/few-values.png)             |
| **Very long main element.** Don't fold the long center value into ellipsis. Wrap it on the second line.                                                                                                                        | ![radial tree with a very long main value](static/long-value.png) |
| **No data.** Show a special WidgetEmpty message for cases when there is no data.                                                                                                                                               | ![radial tree with no data](static/no-data-state.png)             |
| **N/a.** Show a special WidgetEmpty message for cases when data isn't available.                                                                                                                                               | ![radial tree with not available](static/n-a-state.png)           |
| **Initial loading.** Show the skeleton for this state. If the chart has a title, it should be displayed while the chart is loading. The user must understand what exactly is being loaded and whether they should wait for it. | ![radial tree with skeleton](static/skeleton.png)                 |

@page radial-tree-chart-api
@page radial-tree-chart-d3-examples
