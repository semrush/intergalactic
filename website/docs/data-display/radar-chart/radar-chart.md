---
title: Radar chart
fileSource: d3-chart
tabName: Design
---

> Basic data visualization rules are described in the [Chart principles](/data-display/d3-chart).

@## Description

**Radar chart** is a chart for displaying multivariate data in the form of a two-dimensional chart of three or more quantitative variables represented on axes starting from the same point.

It is designed to show similarities, differences, and outliers, or any other item of interest at a glance.

> The radar chart is also known as web chart, spider chart, spider graph, spider web chart, star chart, star plot, cobweb chart, irregular polygon, polar chart, or Kiviat diagram. It is equivalent to a parallel coordinates plot, with the axes arranged radially.

**Use radar chart when:**

- There are multivariate data.
- There is an arbitrary number of variables.
- You need to show outliers.
- You need to make comparisons across multivariate data.
- Data sets are small or moderately sized.

Radar charts are at their best when used to quickly compare multiple dimensions in a compact space. They can be attention-grabbing, due both to their circular structure and their relative novelty compared to other business graphs, so they can be effective when you need to visually engage your audience. A general audience might find them confusing or intimidating to read without additional guidance (which you can provide – we’ll talk more about that in a later section), but technical audiences might find them intriguing.

> Instead of the radar chart, you can use the parallel coordinates chart. This chart "unwinds" the same data into a straight line, which can make the comparisons across data easier to see.

### Advantages of radar charts

**Outliers and similarities are easy to see**

The most significant advantage of using a radar chart is that outliers are immediately visible. Any metric or variable that is vastly different from the others on the chart or in a set of charts is obvious. Commonalities are also easy to assess, particularly if they are plotted on the same chart.

### Disadvantages of radar charts

Data visualization specialists often criticize radar charts – for example, in [this blog post](https://blog.scottlogic.com/2011/09/23/a-critique-of-radar-charts.html#chart2) and in [this article](https://www.perceptualedge.com/articles/dmreview/radar_graphs.pdf).

Their main cons are:

- Hard to judge radii length.
- Radar charts can distort data.
- Radar charts can create connections where there are none.
- Radar charts can cause occlusion and confusion.

> Additionally, humans recognize and can discern data in shapes like squares, circles, and triangles. Therefore, from a psychological standpoint, the random nature of radar chart shapes makes them less useful than known and quantifiable shapes.

@## Appearance

### Axes and variables

Variables usually start at 0 degrees and divide the grid into equal parts.

Radar charts are most beneficial when there are a few items to compare. That is why we recommend showing 3-10 variables for your data sets.

#### Styles

- Use the `--chart-grid-line` token for the color of the all axis and variables lines.
- Use dashed lines for variables.

| Minimum variables (3)                                                 | Maximum recommended variables (10)                                     |
| --------------------------------------------------------------------- | ---------------------------------------------------------------------- |
| ![Radar chart with 3 minimum variables.](static/variables-minimum.png) | ![Radar chart with 10 maximum variables.](static/variables-maximum.png) |

You can turn off grid ticks and labels if needed. It can be helpful for small-sized charts like the following one:

![Example of simplified mini radar chart without visible additional lines.](static/mini-radar-1.png)

### Curved data set

You can curve polygons (data sets), if needed.

> To get smoothed lines, you need to transfer curve with the required rounding method to the chart. Just like in Line chart.
>
> You can find all available methods in the [d3 Curves documentation](https://github.com/d3/d3-shape#curves).

![Radar chart with curved polygons as data sets.](static/curved-radar-1.png)

### Circular grid

If there are three or four variables grid is displayed as a circle.

![Radar chart with three variables and circular grid.](static/circle-type-1.png)

But in case if you have more than four variables, you can also display the grid as a circle instead of a polygon. Use `type="circle"` in this case.

| Grid as a polygon                                                                | Grid as a circle                                                                 |
| -------------------------------------------------------------------------------- | -------------------------------------------------------------------------------- |
| ![Radar chart with circular grid instead of a polygon.](static/circle-type-2.png) | ![Radar chart with circular grid instead of a polygon.](static/circle-type-3.png) |

### Filled areas

You can display your data sets with filled areas or without filled areas. Radar chart with filled areas makes charts more attention-grabbing and helps to visually engage your audience.

Areas use the same color as the line, but with 20% opacity. Areas are enabled by default. To disable the area, use the `fill="transparent"` property.

![Radar chart with data sets with filled areas on the grid.](static/area.png)
![Radar chart with data sets without filled areas on the grid.](static/area-false.png)

### Size

Size can be set through the `width` and `height` properties ([check API](data-display/d3-chart/d3-chart-api/#plot)). Chart components don't have maximum and minimum size.

For a small radar chart, we recommend turning off scales, variables, labels, and data points to reduce visual noise. For example:

![Example of simplified mini radar chart without visible additional lines.](static/mini-radar-2.png)

### Text labels

For labels, use the `--chart-grid-text-label` color token.

If a variable's label is too long, wrap it to the next line:

![Radar chart with variables' labels containing long text that is wrapped to the next line.](static/long-named-variables.png)

### Non-text labels

Variables can be labeled with other components such as [Tag](/components/tag), [Button](/components/button), or [Icon](/style/icon):

![Radar chart with Tag component as variables' labels instead of text labels.](static/non-text-variables.png)

### Scales

You can add as many scales as you need to the axes. To keep your chart readable, we recommend that you don't add too many.

Use `dashed` lines for scales:

![Radar chart with few scale lines on the polar grid.](static/scales-1.png)
![Radar chart with many scale lines on the polar grid.](static/scales-2.png)

#### Variables with different scales

Variables can have different scales. To reduce visual noise, we recommend that you don't show values on the axes. **The example below is not the recommendation, it's for illustration purpose only.**

![Radar chart with variables that have different scales.](static/scales-3.png)

@## Data sets

The radar chart is best suited for comparing several dimensions when there isn't much space in the interface. These charts are most beneficial when there are a few data sets to compare. We recommend you use it for no more than three data sets. Five data sets can make a mess out of your chart.

**Data set styles:**

- Line thickness for data sets is 3px.
- Dot size is 8px with 2px outer border (use the `--chart-grid-border` color token).

| Minimum data sets (1)                                          | Maximum recommended data sets (3)                                                     |
| -------------------------------------------------------------- | ------------------------------------------------------------------------------------- |
| ![Radar chart with one data set.](static/data-sets-minimum.png) | ![Radar chart with three maximum recommended data sets.](static/data-sets-maximum.png) |

### Data set with curve

To get smoothed lines, transfer `curve` with the required [rounding method](https://github.com/d3/d3-shape#curves) to the chart.

Your charts could look like this:

![Radar chart with curved data sets.](static/curved-radar-1.png)
![Radar chart with curved data sets.](static/curved-radar-2.png)

@## Legend

If there is more than one data set, your chart needs a legend. Place it above the chart or on the right side.

| Legend placement | Appearance example                                                                          | Margins                                                                                                  |
| ---------------- | ------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------- |
| Top              | ![Radar chart with the legend above the chart for two data sets.](static/area.png)           | ![Margin between the radar chart and legend above it is 20px.](static/legend-top-margins.png)             |
| Right            | ![Radar chart with the legend right the chart for three data sets.](static/legend-right.png) | ![Margin between the radar chart and legend to the right to it is 20px.](static/legend-right-margins.png) |

### Legend hover

To highlight one data set and dim the others on the chart, use the `transparent` property:

![While hovering the legend checkbox for the specific data set, other data sets on the chart gets 30% opacity.](static/legend-hover.png)

@## Interaction

On hover, the chart shows the values of the variable for all data sets.

![](static/tooltip-example-1.png)
![](static/tooltip-example-2.png)

Highlight the area on the axes with the `--chart-grid-bar-chart-hover` color token. The hover area for a variable includes the area of the variable itself and half the distance to the next variables.

Highlight the variable line with the `--chart-grid-y-accent-hover` color token.

Data points that lie on this variable are increased to 12px (plus 2px outer border).

@## Animation

Data sets grow from the 0 point (from the center) using animation with these properties:

```css
animation-timing-function: cubic-bezier(0, 0.44, 0.42, 1);
animation-delay: 400ms;
animation-duration: 100ms;
```

@## Tooltip

Tooltips show a variable's data for all data sets:

![](static/tooltip-example-2.png)

@## Edge cases

### No data

If the values across all datasets are 0, then all points will be in the middle of the chart.

![](static/null-data-1.png)
![](static/null-data-2.png)

### Not available data

If for some reason data isn't available, show `n/a` in the tooltip. Data point isn't showed for such a case.

![](static/not-available-data-1.png)
![](static/not-available-data-2.png)

### Initial data loading

When the chart is loading for the first time, show [Skeleton](/components/skeleton/) instead of the chart.

If the chart has a title, show it during loading. The user will have an idea of what is being loaded and whether they need to wait for the loading process to complete.

For more information about this state, refer to [Skeleton](/components/skeleton/).

Use the `--skeleton-bg` color token for the skeleton background color.

![](static/radar-skeleton.png)

@## Usage in UX/UI

**When creating a radar chart, there are a few best practices.**

Variables should be arranged in some meaningful order.

![](static/variables-yes-no.png)

More than three data sets should be presented on their own radar charts or visualized through other chart type.

![](static/data-sets-yes-no.png)

Don’t use too many variables or the chart risks becoming confusing.

Consider using other chart type – e.g. Bar chart.

![](static/variable-number-yes-no.png)

If there are multiple data series, the filled-in color should be transparent.

![](static/multiple-sets-yes-no.png)

@page radar-chart-api
@page radar-chart-code
