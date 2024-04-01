---
title: Colorblind and low vision support for our charts
date: 2024-04-02
---

We’re super excited to share that we’ve recently added support for colorblind and low vision modes to our beloved D3 chart library. It's already available in the [d3-chart](/data-display/d3-chart/d3-chart) component starting from [version 3.26.0](/data-display/d3-chart/d3-chart-changelog#_3-26-0-2024-01-25).

## What's the point

Creating the library with the goal of making big and complex data visually clear is something we’re really passionate about. It’s super important to us that everyone can access and understand visualizations made with our charts, no matter the conditions or the mode they’re using.

We’ve put a lot of thought into our color scheme for charts, complete with a [bunch of design tokens](/data-display/color-palette/color-palette#categorical-order) to use. But we know that sometimes, colors alone might not do the trick. That’s why we’re bringing in patterns and non-color markers to the mix. This way, whether users're colorblind, have low vision, or just prefer high-contrast modes, they’ll find reading charts a breeze.

## How to use it

Our charts now come with `pattern` properties that let you enable pattern fills for those charts with areas that need a bit of filling in, or switch up solid lines for dashed ones. Plus, we’re adding symbols in place of the usual points for charts that are all about those lines.

To enable patterns for your chart use the following properties:

- `patterns` property for `Plot`
- `patterns` property `ChartLegend` (works only with `shape={'Checkbox'}`)

You can check this feature in every chart playground inside their documentation. Besides, you always can refer to the live examples for complex cases of different chart types in their documentation. For example, [this one for the stacked area chart](/data-display/stacked-area-chart/stacked-area-chart-d3-code#legend-and-pattern-fill).

[View all posts](/blog/)
