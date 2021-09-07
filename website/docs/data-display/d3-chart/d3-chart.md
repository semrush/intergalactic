---
title: D3 chart concept and API
fileSource: d3-chart
tabName: Concept and code
---

> 💡 Basic data visualization rules are described in the [Chart principles](/data-display/chart/).

These components serve as the base for building charts from your data in the product.

They don't manipulate your data, and will not try to calculate, sort or check it in any way. Data manipulation is the product's job, not the component's.

Charts are a complex component that cannot be applied in a single line. That's why its API may appear a bit inflated, since it supports all the concepts of our design system.

@## Concept

- We want to provide you with a convenient way to use the imperative d3 style with React's declarative approach.
- All charts are based on [d3-scale](https://github.com/d3/d3-scale), which you transfer to our charts in a customized form.
- We try to provide access to each SVG node, so that you could modify it if needed.

Each element that you place on the chart is based on a real SVG element or a group of elements. For example, when you render `<Line/>`, you will get an SVG (`<line d = {...}>`). All properties you pass to `<Line/>` will go to the native SVG `<line d = {...}>` tag.

When you render `<Line.Dots/>` (dots on a line plot), you get a set of `<circle cx = {...} cy = {...}/>`. So all properties you pass to <Line.Dots/> will also go to the native SVG `<circle cx = {...} cy = {...}/>` tag.

For a point change in the properties of each specific dot, you need to pass a function that will be called at each dot with the calculated properties of this dot:

```jsx
<Line.Dots>
  {(props) => {
    return {
      // ...your_props
    };
  }}
</Line.Dots>
```

> You also can put functions into single elements if your properties are calculated dynamically.

Since many SVG elements don't support nesting, they are rendered sequentially. For example, this code example doesn't nest `<circle/>` in `<line/>`, but draws them one after another:

```jsx
<Line>
  <Line.Dots />
</Line>
```

CSS is responsible for all the chart styles. See [Themes](/style/themes/) for more information on how to customize it.

@## Base

Any SVG container must have absolute values for its size.

See [d3-scale docs on GitHub](https://github.com/d3/d3-scale) for more information about the types of `scale`, as well as their `range` and `domain`.

> The `range` of the horizontal `scale` is inverted, so that the axes origin is at the bottom left corner.

@example common

@## Paddings & margins

SVG size and chart plot size are usually different to prevent the clipping of additional items such as axes, axis values, and the legend.

That's why values in `scale.range ()` are set with a shift.

@example margin

@## Axes

When you pass `scale` to the root component it also sets the coordinate axes. However, you still need to specify them for them to render.

- `XAxis/YAxis` are the axis lines.
- `ticks` are the values on the axis.

It is also possible to have multiple axes with different positions.

You can get the number of ticks from the `scale.ticks` or `scale.domain` method. To calculate an approximate number of ticks, divide the chart size by the size of a one tick.

> According to the design guide, `YAxis` is hidden by default `(hide = true)`.

@example axis

@## Axis values

You can change the values and properties on the axis by passing a function.

The default tag is `<text/>`, but you can change it by defining the `tag` property. For example, you can change it to `foreignObject` for inserting `html` components.

> The function arguments contain calculated XY coordinates that you can use to shift the object as needed.

@example axis-ticks

@## Additional lines

Additional lines are formed in the same way as ticks.

> To make things easier, ticks can be specified on the `Axis` component itself, and it will be automatically passed to `<Axis.Ticks/>` and `<Axis.Grid/>`.

@example axis-grid

@## Axes titles

Axis titles are formed in the same way as ticks and additional lines.

> By default, the title is set to the right for the Oy axis, and at the top for the Ox axis. However, you can change this condition by passing the desired location to `position`: `right`, `top`, `left`, or `bottom`.

@example axis-titles

@## Adaptive chart

For SVG charts to display correctly on responsive layouts, you need to dynamically calculate their width and height. To help you with that, we created the `ResponsiveContainer` component that supports all the [Box properties](/layout/box-system/box-api) and can help you flexibly adjust the chart size.

> `ResponsiveContainer` supports the `aspect` property — the aspect ratio between the width and height of a chart.

```jsx
<ResponsiveContainer aspect={1}> // width = height ...</ResponsiveContainer>
```

@example responsive

@## Chart legend

See [Chart legend](/data-display/chart-legend/) for a guide on how to implement a clickable chart legend.

@example legend

@## Synchronous charts

You can pass a common `eventEmitter` to synchronize the charts.

> Be careful when choosing the `scale` for the axis, since it's common across different charts.

@example sync-charts

@## Export to image (png, jpeg, webp)

@example export-in-image

@## Initial loading

Use [Skeleton](/components/skeleton/) with the appropriate chart type for the initial loading of the charts. If a chart widget has a title, it should be displayed while the chart is loading.

See one of the examples in the [Line chart guide](https://i.semrush.com/data-display/line-chart/line-chart-code/#ac26f2).

@page d3-chart-api
@page d3-chart-changelog
