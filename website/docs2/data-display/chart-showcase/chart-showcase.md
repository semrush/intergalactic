---
title: Charts showcase
fileSource: d3-chart
docs: true
tabs: Design('chart-showcase'), Changelog('d3-chart-changelog')
---

There are various chart types within the Intergalactic Design System, each designed for distinct scenarios and data representation.

- [Grid & axes](/data-display/d3-chart/d3-chart#grid_and_axes)
- [Chart tooltip](/data-display/d3-chart/d3-chart#tooltip)
- [Chart legend](/data-display/chart-legend/chart-legend)

::: tip
Note that some chart types are still under development and are not yet clickable.
:::

## Comparison

This chart type is used to compare values within a list that has no specific order.

_For instance, you can compare the audience of selected domains to the overall market._

::: react-view

<script lang="tsx">
import React from 'react';
import ComponentCard from '@components/../components/ComponentCard';
const getImageName = (title) => {
  const name = title.replace(/[ \/]+/g, '');
  return name.charAt(0).toLowerCase() + name.slice(1);
};

import { Box } from '@semcore/flex-box';

const group = {
  line: {
    title: 'Line chart',
    route: '/data-display/line-chart',
    disabled: false,
    type: 'charts',
  },
  area: {
    title: 'Area chart',
    route: '/data-display/area-chart',
    disabled: false,
    type: 'charts',
  },
  areaStacked: {
    title: 'Stacked area chart',
    route: '/data-display/stacked-area-chart',
    disabled: false,
    type: 'charts',
  },
  combinedAreaLine: {
    title: 'Combined chart',
    route: '/data-display/combined-chart',
    disabled: true,
    type: 'charts',
  },
  bar: {
    title: 'Bar chart',
    route: '/data-display/bar-chart',
    disabled: false,
    type: 'charts',
  },
  barStacked: {
    title: 'Stacked bar chart',
    route: '/data-display/stacked-bar-chart',
    disabled: false,
    type: 'charts',
  },
  horizontalBar: {
    title: 'Horizontal bar chart',
    route: '/data-display/bar-horizontal',
    disabled: false,
    type: 'charts',
  },
  stackedHorizontalBar: {
    title: 'Stacked horizontal bar chart',
    route: '/data-display/stacked-horizontal-bar',
    disabled: false,
    type: 'charts',
  },
  histogram: {
    title: 'Histogram chart',
    route: '/data-display/histogram-chart',
    disabled: false,
    type: 'charts',
  },
  stackedHistogram: {
    title: 'Stacked histogram chart',
    route: '/data-display/stacked-histogram',
    disabled: true,
    type: 'charts',
  },
  donut: {
    title: 'Donut Pie chart',
    route: '/data-display/donut-chart',
    disabled: false,
    type: 'charts',
  },
  venn: {
    title: 'Venn chart',
    route: '/data-display/venn-chart',
    disabled: false,
    type: 'charts',
  },
  bubble: {
    title: 'Bubble chart',
    route: '/data-display/bubble-chart',
    type: 'charts',
  },
  scatterplot: {
    title: 'Scatterplot chart',
    route: '/data-display/scatterplot-chart',
    type: 'charts',
  },
  heatmap: {
    title: 'Heatmap',
    route: '/data-display/heatmap',
    disabled: true,
    type: 'charts',
  },
  funnel: {
    title: 'Funnel chart',
    route: '/data-display/funnel-chart',
    disabled: true,
    type: 'charts',
  },
  radar: {
    title: 'Radar chart',
    route: '/data-display/radar-chart',
    disabled: false,
    type: 'charts',
  },
  polar: {
    title: 'Polar chart',
    route: '/data-display/polar-chart',
    disabled: true,
    type: 'charts',
  },
  alluvial: {
    title: 'Alluvial chart',
    route: '/data-display/alluvial-chart',
    disabled: true,
    type: 'charts',
  },
  quadrant: {
    title: 'Quadrant chart',
    route: '/data-display/quadrant-chart',
    disabled: true,
    type: 'charts',
  },
  kagi: {
    title: 'Kagi chart',
    route: '/data-display/kagi-chart',
    disabled: true,
    type: 'charts',
  },
  lollipop: {
    title: 'Lollipop chart',
    route: '/data-display/lollipop-chart',
    disabled: true,
    type: 'charts',
  },
  choroplethMap: {
    title: 'Choropleth map',
    route: '/data-display/choropleth-map',
    disabled: true,
    type: 'charts',
  },
  radialTree: {
    title: 'Radial Tree chart',
    route: '/data-display/radial-tree-chart',
    type: 'charts',
  },
};

const cardsStyle = {
  display: 'grid',
  gridTemplateRows: 'max-content',
  gridTemplateColumns: 'repeat(auto-fill, 176px)',
  gridGap: 'var(--intergalactic-spacing-3x) var(--intergalactic-spacing-3x)',
  width: '100%',
  margin: '0',
  marginTop: 'var(--intergalactic-spacing-3x)',
  padding: '0',
};

const App = function (props) {
  const items = props.group.map((el) => group[el]);

  return (
    <Box style={cardsStyle}>
      {items.map((item) => (
        <ComponentCard
          key={item.title}
          image={getImageName(item.title)}
          text={item.title}
          disabled={item.disabled}
          href={item.route}
          type={item.type}
        />
      ))}
    </Box>
  );
}
</script>

:::

## Ranking

Rank items in either ascending or descending order based on their values.

_For example, you can rank countries by their market share._

::: react-view

<script lang="tsx">
import React from 'react';
import ComponentCard from '@components/../components/ComponentCard';
const getImageName = (title) => {
  const name = title.replace(/[ \/]+/g, '');
  return name.charAt(0).toLowerCase() + name.slice(1);
};

import { Box } from '@semcore/flex-box';

const group = {
  line: {
    title: 'Line chart',
    route: '/data-display/line-chart',
    disabled: false,
    type: 'charts',
  },
  area: {
    title: 'Area chart',
    route: '/data-display/area-chart',
    disabled: false,
    type: 'charts',
  },
  areaStacked: {
    title: 'Stacked area chart',
    route: '/data-display/stacked-area-chart',
    disabled: false,
    type: 'charts',
  },
  combinedAreaLine: {
    title: 'Combined chart',
    route: '/data-display/combined-chart',
    disabled: true,
    type: 'charts',
  },
  bar: {
    title: 'Bar chart',
    route: '/data-display/bar-chart',
    disabled: false,
    type: 'charts',
  },
  barStacked: {
    title: 'Stacked bar chart',
    route: '/data-display/stacked-bar-chart',
    disabled: false,
    type: 'charts',
  },
  horizontalBar: {
    title: 'Horizontal bar chart',
    route: '/data-display/bar-horizontal',
    disabled: false,
    type: 'charts',
  },
  stackedHorizontalBar: {
    title: 'Stacked horizontal bar chart',
    route: '/data-display/stacked-horizontal-bar',
    disabled: false,
    type: 'charts',
  },
  histogram: {
    title: 'Histogram chart',
    route: '/data-display/histogram-chart',
    disabled: false,
    type: 'charts',
  },
  stackedHistogram: {
    title: 'Stacked histogram chart',
    route: '/data-display/stacked-histogram',
    disabled: true,
    type: 'charts',
  },
  donut: {
    title: 'Donut Pie chart',
    route: '/data-display/donut-chart',
    disabled: false,
    type: 'charts',
  },
  venn: {
    title: 'Venn chart',
    route: '/data-display/venn-chart',
    disabled: false,
    type: 'charts',
  },
  bubble: {
    title: 'Bubble chart',
    route: '/data-display/bubble-chart',
    type: 'charts',
  },
  scatterplot: {
    title: 'Scatterplot chart',
    route: '/data-display/scatterplot-chart',
    type: 'charts',
  },
  heatmap: {
    title: 'Heatmap',
    route: '/data-display/heatmap',
    disabled: true,
    type: 'charts',
  },
  funnel: {
    title: 'Funnel chart',
    route: '/data-display/funnel-chart',
    disabled: true,
    type: 'charts',
  },
  radar: {
    title: 'Radar chart',
    route: '/data-display/radar-chart',
    disabled: false,
    type: 'charts',
  },
  polar: {
    title: 'Polar chart',
    route: '/data-display/polar-chart',
    disabled: true,
    type: 'charts',
  },
  alluvial: {
    title: 'Alluvial chart',
    route: '/data-display/alluvial-chart',
    disabled: true,
    type: 'charts',
  },
  quadrant: {
    title: 'Quadrant chart',
    route: '/data-display/quadrant-chart',
    disabled: true,
    type: 'charts',
  },
  kagi: {
    title: 'Kagi chart',
    route: '/data-display/kagi-chart',
    disabled: true,
    type: 'charts',
  },
  lollipop: {
    title: 'Lollipop chart',
    route: '/data-display/lollipop-chart',
    disabled: true,
    type: 'charts',
  },
  choroplethMap: {
    title: 'Choropleth map',
    route: '/data-display/choropleth-map',
    disabled: true,
    type: 'charts',
  },
  radialTree: {
    title: 'Radial Tree chart',
    route: '/data-display/radial-tree-chart',
    type: 'charts',
  },
};

const cardsStyle = {
  display: 'grid',
  gridTemplateRows: 'max-content',
  gridTemplateColumns: 'repeat(auto-fill, 176px)',
  gridGap: 'var(--intergalactic-spacing-3x) var(--intergalactic-spacing-3x)',
  width: '100%',
  margin: '0',
  marginTop: 'var(--intergalactic-spacing-3x)',
  padding: '0',
};

const App = function (props) {
  const items = props.group.map((el) => group[el]);

  return (
    <Box style={cardsStyle}>
      {items.map((item) => (
        <ComponentCard
          key={item.title}
          image={getImageName(item.title)}
          text={item.title}
          disabled={item.disabled}
          href={item.route}
          type={item.type}
        />
      ))}
    </Box>
  );
}
</script>

:::

## Change over time (Trend)

This chart type visualizes how values change over time.

_For instance, it can be used to display the traffic trend over time for various devices._

::: react-view

<script lang="tsx">
import React from 'react';
import ComponentCard from '@components/../components/ComponentCard';
const getImageName = (title) => {
  const name = title.replace(/[ \/]+/g, '');
  return name.charAt(0).toLowerCase() + name.slice(1);
};

import { Box } from '@semcore/flex-box';

const group = {
  line: {
    title: 'Line chart',
    route: '/data-display/line-chart',
    disabled: false,
    type: 'charts',
  },
  area: {
    title: 'Area chart',
    route: '/data-display/area-chart',
    disabled: false,
    type: 'charts',
  },
  areaStacked: {
    title: 'Stacked area chart',
    route: '/data-display/stacked-area-chart',
    disabled: false,
    type: 'charts',
  },
  combinedAreaLine: {
    title: 'Combined chart',
    route: '/data-display/combined-chart',
    disabled: true,
    type: 'charts',
  },
  bar: {
    title: 'Bar chart',
    route: '/data-display/bar-chart',
    disabled: false,
    type: 'charts',
  },
  barStacked: {
    title: 'Stacked bar chart',
    route: '/data-display/stacked-bar-chart',
    disabled: false,
    type: 'charts',
  },
  horizontalBar: {
    title: 'Horizontal bar chart',
    route: '/data-display/bar-horizontal',
    disabled: false,
    type: 'charts',
  },
  stackedHorizontalBar: {
    title: 'Stacked horizontal bar chart',
    route: '/data-display/stacked-horizontal-bar',
    disabled: false,
    type: 'charts',
  },
  histogram: {
    title: 'Histogram chart',
    route: '/data-display/histogram-chart',
    disabled: false,
    type: 'charts',
  },
  stackedHistogram: {
    title: 'Stacked histogram chart',
    route: '/data-display/stacked-histogram',
    disabled: true,
    type: 'charts',
  },
  donut: {
    title: 'Donut Pie chart',
    route: '/data-display/donut-chart',
    disabled: false,
    type: 'charts',
  },
  venn: {
    title: 'Venn chart',
    route: '/data-display/venn-chart',
    disabled: false,
    type: 'charts',
  },
  bubble: {
    title: 'Bubble chart',
    route: '/data-display/bubble-chart',
    type: 'charts',
  },
  scatterplot: {
    title: 'Scatterplot chart',
    route: '/data-display/scatterplot-chart',
    type: 'charts',
  },
  heatmap: {
    title: 'Heatmap',
    route: '/data-display/heatmap',
    disabled: true,
    type: 'charts',
  },
  funnel: {
    title: 'Funnel chart',
    route: '/data-display/funnel-chart',
    disabled: true,
    type: 'charts',
  },
  radar: {
    title: 'Radar chart',
    route: '/data-display/radar-chart',
    disabled: false,
    type: 'charts',
  },
  polar: {
    title: 'Polar chart',
    route: '/data-display/polar-chart',
    disabled: true,
    type: 'charts',
  },
  alluvial: {
    title: 'Alluvial chart',
    route: '/data-display/alluvial-chart',
    disabled: true,
    type: 'charts',
  },
  quadrant: {
    title: 'Quadrant chart',
    route: '/data-display/quadrant-chart',
    disabled: true,
    type: 'charts',
  },
  kagi: {
    title: 'Kagi chart',
    route: '/data-display/kagi-chart',
    disabled: true,
    type: 'charts',
  },
  lollipop: {
    title: 'Lollipop chart',
    route: '/data-display/lollipop-chart',
    disabled: true,
    type: 'charts',
  },
  choroplethMap: {
    title: 'Choropleth map',
    route: '/data-display/choropleth-map',
    disabled: true,
    type: 'charts',
  },
  radialTree: {
    title: 'Radial Tree chart',
    route: '/data-display/radial-tree-chart',
    type: 'charts',
  },
};

const cardsStyle = {
  display: 'grid',
  gridTemplateRows: 'max-content',
  gridTemplateColumns: 'repeat(auto-fill, 176px)',
  gridGap: 'var(--intergalactic-spacing-3x) var(--intergalactic-spacing-3x)',
  width: '100%',
  margin: '0',
  marginTop: 'var(--intergalactic-spacing-3x)',
  padding: '0',
};

const App = function (props) {
  const items = props.group.map((el) => group[el]);

  return (
    <Box style={cardsStyle}>
      {items.map((item) => (
        <ComponentCard
          key={item.title}
          image={getImageName(item.title)}
          text={item.title}
          disabled={item.disabled}
          href={item.route}
          type={item.type}
        />
      ))}
    </Box>
  );
}
</script>

:::

## Part to whole

Use this chart to illustrate the contribution of individual values to the whole.

_For example, it's useful for showing the traffic share of different devices._

::: react-view

<script lang="tsx">
import React from 'react';
import ComponentCard from '@components/../components/ComponentCard';
const getImageName = (title) => {
  const name = title.replace(/[ \/]+/g, '');
  return name.charAt(0).toLowerCase() + name.slice(1);
};

import { Box } from '@semcore/flex-box';

const group = {
  line: {
    title: 'Line chart',
    route: '/data-display/line-chart',
    disabled: false,
    type: 'charts',
  },
  area: {
    title: 'Area chart',
    route: '/data-display/area-chart',
    disabled: false,
    type: 'charts',
  },
  areaStacked: {
    title: 'Stacked area chart',
    route: '/data-display/stacked-area-chart',
    disabled: false,
    type: 'charts',
  },
  combinedAreaLine: {
    title: 'Combined chart',
    route: '/data-display/combined-chart',
    disabled: true,
    type: 'charts',
  },
  bar: {
    title: 'Bar chart',
    route: '/data-display/bar-chart',
    disabled: false,
    type: 'charts',
  },
  barStacked: {
    title: 'Stacked bar chart',
    route: '/data-display/stacked-bar-chart',
    disabled: false,
    type: 'charts',
  },
  horizontalBar: {
    title: 'Horizontal bar chart',
    route: '/data-display/bar-horizontal',
    disabled: false,
    type: 'charts',
  },
  stackedHorizontalBar: {
    title: 'Stacked horizontal bar chart',
    route: '/data-display/stacked-horizontal-bar',
    disabled: false,
    type: 'charts',
  },
  histogram: {
    title: 'Histogram chart',
    route: '/data-display/histogram-chart',
    disabled: false,
    type: 'charts',
  },
  stackedHistogram: {
    title: 'Stacked histogram chart',
    route: '/data-display/stacked-histogram',
    disabled: true,
    type: 'charts',
  },
  donut: {
    title: 'Donut Pie chart',
    route: '/data-display/donut-chart',
    disabled: false,
    type: 'charts',
  },
  venn: {
    title: 'Venn chart',
    route: '/data-display/venn-chart',
    disabled: false,
    type: 'charts',
  },
  bubble: {
    title: 'Bubble chart',
    route: '/data-display/bubble-chart',
    type: 'charts',
  },
  scatterplot: {
    title: 'Scatterplot chart',
    route: '/data-display/scatterplot-chart',
    type: 'charts',
  },
  heatmap: {
    title: 'Heatmap',
    route: '/data-display/heatmap',
    disabled: true,
    type: 'charts',
  },
  funnel: {
    title: 'Funnel chart',
    route: '/data-display/funnel-chart',
    disabled: true,
    type: 'charts',
  },
  radar: {
    title: 'Radar chart',
    route: '/data-display/radar-chart',
    disabled: false,
    type: 'charts',
  },
  polar: {
    title: 'Polar chart',
    route: '/data-display/polar-chart',
    disabled: true,
    type: 'charts',
  },
  alluvial: {
    title: 'Alluvial chart',
    route: '/data-display/alluvial-chart',
    disabled: true,
    type: 'charts',
  },
  quadrant: {
    title: 'Quadrant chart',
    route: '/data-display/quadrant-chart',
    disabled: true,
    type: 'charts',
  },
  kagi: {
    title: 'Kagi chart',
    route: '/data-display/kagi-chart',
    disabled: true,
    type: 'charts',
  },
  lollipop: {
    title: 'Lollipop chart',
    route: '/data-display/lollipop-chart',
    disabled: true,
    type: 'charts',
  },
  choroplethMap: {
    title: 'Choropleth map',
    route: '/data-display/choropleth-map',
    disabled: true,
    type: 'charts',
  },
  radialTree: {
    title: 'Radial Tree chart',
    route: '/data-display/radial-tree-chart',
    type: 'charts',
  },
};

const cardsStyle = {
  display: 'grid',
  gridTemplateRows: 'max-content',
  gridTemplateColumns: 'repeat(auto-fill, 176px)',
  gridGap: 'var(--intergalactic-spacing-3x) var(--intergalactic-spacing-3x)',
  width: '100%',
  margin: '0',
  marginTop: 'var(--intergalactic-spacing-3x)',
  padding: '0',
};

const App = function (props) {
  const items = props.group.map((el) => group[el]);

  return (
    <Box style={cardsStyle}>
      {items.map((item) => (
        <ComponentCard
          key={item.title}
          image={getImageName(item.title)}
          text={item.title}
          disabled={item.disabled}
          href={item.route}
          type={item.type}
        />
      ))}
    </Box>
  );
}
</script>

:::

## Distribution

This chart type depicts the distribution within a set of values.

_For instance, you can use it to show the distribution of leaders, niche players, and game changers in the market._

::: react-view

<script lang="tsx">
import React from 'react';
import ComponentCard from '@components/../components/ComponentCard';
const getImageName = (title) => {
  const name = title.replace(/[ \/]+/g, '');
  return name.charAt(0).toLowerCase() + name.slice(1);
};

import { Box } from '@semcore/flex-box';

const group = {
  line: {
    title: 'Line chart',
    route: '/data-display/line-chart',
    disabled: false,
    type: 'charts',
  },
  area: {
    title: 'Area chart',
    route: '/data-display/area-chart',
    disabled: false,
    type: 'charts',
  },
  areaStacked: {
    title: 'Stacked area chart',
    route: '/data-display/stacked-area-chart',
    disabled: false,
    type: 'charts',
  },
  combinedAreaLine: {
    title: 'Combined chart',
    route: '/data-display/combined-chart',
    disabled: true,
    type: 'charts',
  },
  bar: {
    title: 'Bar chart',
    route: '/data-display/bar-chart',
    disabled: false,
    type: 'charts',
  },
  barStacked: {
    title: 'Stacked bar chart',
    route: '/data-display/stacked-bar-chart',
    disabled: false,
    type: 'charts',
  },
  horizontalBar: {
    title: 'Horizontal bar chart',
    route: '/data-display/bar-horizontal',
    disabled: false,
    type: 'charts',
  },
  stackedHorizontalBar: {
    title: 'Stacked horizontal bar chart',
    route: '/data-display/stacked-horizontal-bar',
    disabled: false,
    type: 'charts',
  },
  histogram: {
    title: 'Histogram chart',
    route: '/data-display/histogram-chart',
    disabled: false,
    type: 'charts',
  },
  stackedHistogram: {
    title: 'Stacked histogram chart',
    route: '/data-display/stacked-histogram',
    disabled: true,
    type: 'charts',
  },
  donut: {
    title: 'Donut Pie chart',
    route: '/data-display/donut-chart',
    disabled: false,
    type: 'charts',
  },
  venn: {
    title: 'Venn chart',
    route: '/data-display/venn-chart',
    disabled: false,
    type: 'charts',
  },
  bubble: {
    title: 'Bubble chart',
    route: '/data-display/bubble-chart',
    type: 'charts',
  },
  scatterplot: {
    title: 'Scatterplot chart',
    route: '/data-display/scatterplot-chart',
    type: 'charts',
  },
  heatmap: {
    title: 'Heatmap',
    route: '/data-display/heatmap',
    disabled: true,
    type: 'charts',
  },
  funnel: {
    title: 'Funnel chart',
    route: '/data-display/funnel-chart',
    disabled: true,
    type: 'charts',
  },
  radar: {
    title: 'Radar chart',
    route: '/data-display/radar-chart',
    disabled: false,
    type: 'charts',
  },
  polar: {
    title: 'Polar chart',
    route: '/data-display/polar-chart',
    disabled: true,
    type: 'charts',
  },
  alluvial: {
    title: 'Alluvial chart',
    route: '/data-display/alluvial-chart',
    disabled: true,
    type: 'charts',
  },
  quadrant: {
    title: 'Quadrant chart',
    route: '/data-display/quadrant-chart',
    disabled: true,
    type: 'charts',
  },
  kagi: {
    title: 'Kagi chart',
    route: '/data-display/kagi-chart',
    disabled: true,
    type: 'charts',
  },
  lollipop: {
    title: 'Lollipop chart',
    route: '/data-display/lollipop-chart',
    disabled: true,
    type: 'charts',
  },
  choroplethMap: {
    title: 'Choropleth map',
    route: '/data-display/choropleth-map',
    disabled: true,
    type: 'charts',
  },
  radialTree: {
    title: 'Radial Tree chart',
    route: '/data-display/radial-tree-chart',
    type: 'charts',
  },
};

const cardsStyle = {
  display: 'grid',
  gridTemplateRows: 'max-content',
  gridTemplateColumns: 'repeat(auto-fill, 176px)',
  gridGap: 'var(--intergalactic-spacing-3x) var(--intergalactic-spacing-3x)',
  width: '100%',
  margin: '0',
  marginTop: 'var(--intergalactic-spacing-3x)',
  padding: '0',
};

const App = function (props) {
  const items = props.group.map((el) => group[el]);

  return (
    <Box style={cardsStyle}>
      {items.map((item) => (
        <ComponentCard
          key={item.title}
          image={getImageName(item.title)}
          text={item.title}
          disabled={item.disabled}
          href={item.route}
          type={item.type}
        />
      ))}
    </Box>
  );
}
</script>

:::

## Correlation

Employ this chart to demonstrate the relationship between two or three sets of values.

_For example, it can show how website traffic is influenced by customer age._

::: react-view

<script lang="tsx">
import React from 'react';
import ComponentCard from '@components/../components/ComponentCard';
const getImageName = (title) => {
  const name = title.replace(/[ \/]+/g, '');
  return name.charAt(0).toLowerCase() + name.slice(1);
};

import { Box } from '@semcore/flex-box';

const group = {
  line: {
    title: 'Line chart',
    route: '/data-display/line-chart',
    disabled: false,
    type: 'charts',
  },
  area: {
    title: 'Area chart',
    route: '/data-display/area-chart',
    disabled: false,
    type: 'charts',
  },
  areaStacked: {
    title: 'Stacked area chart',
    route: '/data-display/stacked-area-chart',
    disabled: false,
    type: 'charts',
  },
  combinedAreaLine: {
    title: 'Combined chart',
    route: '/data-display/combined-chart',
    disabled: true,
    type: 'charts',
  },
  bar: {
    title: 'Bar chart',
    route: '/data-display/bar-chart',
    disabled: false,
    type: 'charts',
  },
  barStacked: {
    title: 'Stacked bar chart',
    route: '/data-display/stacked-bar-chart',
    disabled: false,
    type: 'charts',
  },
  horizontalBar: {
    title: 'Horizontal bar chart',
    route: '/data-display/bar-horizontal',
    disabled: false,
    type: 'charts',
  },
  stackedHorizontalBar: {
    title: 'Stacked horizontal bar chart',
    route: '/data-display/stacked-horizontal-bar',
    disabled: false,
    type: 'charts',
  },
  histogram: {
    title: 'Histogram chart',
    route: '/data-display/histogram-chart',
    disabled: false,
    type: 'charts',
  },
  stackedHistogram: {
    title: 'Stacked histogram chart',
    route: '/data-display/stacked-histogram',
    disabled: true,
    type: 'charts',
  },
  donut: {
    title: 'Donut Pie chart',
    route: '/data-display/donut-chart',
    disabled: false,
    type: 'charts',
  },
  venn: {
    title: 'Venn chart',
    route: '/data-display/venn-chart',
    disabled: false,
    type: 'charts',
  },
  bubble: {
    title: 'Bubble chart',
    route: '/data-display/bubble-chart',
    type: 'charts',
  },
  scatterplot: {
    title: 'Scatterplot chart',
    route: '/data-display/scatterplot-chart',
    type: 'charts',
  },
  heatmap: {
    title: 'Heatmap',
    route: '/data-display/heatmap',
    disabled: true,
    type: 'charts',
  },
  funnel: {
    title: 'Funnel chart',
    route: '/data-display/funnel-chart',
    disabled: true,
    type: 'charts',
  },
  radar: {
    title: 'Radar chart',
    route: '/data-display/radar-chart',
    disabled: false,
    type: 'charts',
  },
  polar: {
    title: 'Polar chart',
    route: '/data-display/polar-chart',
    disabled: true,
    type: 'charts',
  },
  alluvial: {
    title: 'Alluvial chart',
    route: '/data-display/alluvial-chart',
    disabled: true,
    type: 'charts',
  },
  quadrant: {
    title: 'Quadrant chart',
    route: '/data-display/quadrant-chart',
    disabled: true,
    type: 'charts',
  },
  kagi: {
    title: 'Kagi chart',
    route: '/data-display/kagi-chart',
    disabled: true,
    type: 'charts',
  },
  lollipop: {
    title: 'Lollipop chart',
    route: '/data-display/lollipop-chart',
    disabled: true,
    type: 'charts',
  },
  choroplethMap: {
    title: 'Choropleth map',
    route: '/data-display/choropleth-map',
    disabled: true,
    type: 'charts',
  },
  radialTree: {
    title: 'Radial Tree chart',
    route: '/data-display/radial-tree-chart',
    type: 'charts',
  },
};

const cardsStyle = {
  display: 'grid',
  gridTemplateRows: 'max-content',
  gridTemplateColumns: 'repeat(auto-fill, 176px)',
  gridGap: 'var(--intergalactic-spacing-3x) var(--intergalactic-spacing-3x)',
  width: '100%',
  margin: '0',
  marginTop: 'var(--intergalactic-spacing-3x)',
  padding: '0',
};

const App = function (props) {
  const items = props.group.map((el) => group[el]);

  return (
    <Box style={cardsStyle}>
      {items.map((item) => (
        <ComponentCard
          key={item.title}
          image={getImageName(item.title)}
          text={item.title}
          disabled={item.disabled}
          href={item.route}
          type={item.type}
        />
      ))}
    </Box>
  );
}
</script>

:::

## Deviation

Use this chart to visualize the deviation, difference, or gap between two sets of values.

_For example, it can illustrate the deviation between the actual and target audience of a website._

::: react-view

<script lang="tsx">
import React from 'react';
import ComponentCard from '@components/../components/ComponentCard';
const getImageName = (title) => {
  const name = title.replace(/[ \/]+/g, '');
  return name.charAt(0).toLowerCase() + name.slice(1);
};

import { Box } from '@semcore/flex-box';

const group = {
  line: {
    title: 'Line chart',
    route: '/data-display/line-chart',
    disabled: false,
    type: 'charts',
  },
  area: {
    title: 'Area chart',
    route: '/data-display/area-chart',
    disabled: false,
    type: 'charts',
  },
  areaStacked: {
    title: 'Stacked area chart',
    route: '/data-display/stacked-area-chart',
    disabled: false,
    type: 'charts',
  },
  combinedAreaLine: {
    title: 'Combined chart',
    route: '/data-display/combined-chart',
    disabled: true,
    type: 'charts',
  },
  bar: {
    title: 'Bar chart',
    route: '/data-display/bar-chart',
    disabled: false,
    type: 'charts',
  },
  barStacked: {
    title: 'Stacked bar chart',
    route: '/data-display/stacked-bar-chart',
    disabled: false,
    type: 'charts',
  },
  horizontalBar: {
    title: 'Horizontal bar chart',
    route: '/data-display/bar-horizontal',
    disabled: false,
    type: 'charts',
  },
  stackedHorizontalBar: {
    title: 'Stacked horizontal bar chart',
    route: '/data-display/stacked-horizontal-bar',
    disabled: false,
    type: 'charts',
  },
  histogram: {
    title: 'Histogram chart',
    route: '/data-display/histogram-chart',
    disabled: false,
    type: 'charts',
  },
  stackedHistogram: {
    title: 'Stacked histogram chart',
    route: '/data-display/stacked-histogram',
    disabled: true,
    type: 'charts',
  },
  donut: {
    title: 'Donut Pie chart',
    route: '/data-display/donut-chart',
    disabled: false,
    type: 'charts',
  },
  venn: {
    title: 'Venn chart',
    route: '/data-display/venn-chart',
    disabled: false,
    type: 'charts',
  },
  bubble: {
    title: 'Bubble chart',
    route: '/data-display/bubble-chart',
    type: 'charts',
  },
  scatterplot: {
    title: 'Scatterplot chart',
    route: '/data-display/scatterplot-chart',
    type: 'charts',
  },
  heatmap: {
    title: 'Heatmap',
    route: '/data-display/heatmap',
    disabled: true,
    type: 'charts',
  },
  funnel: {
    title: 'Funnel chart',
    route: '/data-display/funnel-chart',
    disabled: true,
    type: 'charts',
  },
  radar: {
    title: 'Radar chart',
    route: '/data-display/radar-chart',
    disabled: false,
    type: 'charts',
  },
  polar: {
    title: 'Polar chart',
    route: '/data-display/polar-chart',
    disabled: true,
    type: 'charts',
  },
  alluvial: {
    title: 'Alluvial chart',
    route: '/data-display/alluvial-chart',
    disabled: true,
    type: 'charts',
  },
  quadrant: {
    title: 'Quadrant chart',
    route: '/data-display/quadrant-chart',
    disabled: true,
    type: 'charts',
  },
  kagi: {
    title: 'Kagi chart',
    route: '/data-display/kagi-chart',
    disabled: true,
    type: 'charts',
  },
  lollipop: {
    title: 'Lollipop chart',
    route: '/data-display/lollipop-chart',
    disabled: true,
    type: 'charts',
  },
  choroplethMap: {
    title: 'Choropleth map',
    route: '/data-display/choropleth-map',
    disabled: true,
    type: 'charts',
  },
  radialTree: {
    title: 'Radial Tree chart',
    route: '/data-display/radial-tree-chart',
    type: 'charts',
  },
};

const cardsStyle = {
  display: 'grid',
  gridTemplateRows: 'max-content',
  gridTemplateColumns: 'repeat(auto-fill, 176px)',
  gridGap: 'var(--intergalactic-spacing-3x) var(--intergalactic-spacing-3x)',
  width: '100%',
  margin: '0',
  marginTop: 'var(--intergalactic-spacing-3x)',
  padding: '0',
};

const App = function (props) {
  const items = props.group.map((el) => group[el]);

  return (
    <Box style={cardsStyle}>
      {items.map((item) => (
        <ComponentCard
          key={item.title}
          image={getImageName(item.title)}
          text={item.title}
          disabled={item.disabled}
          href={item.route}
          type={item.type}
        />
      ))}
    </Box>
  );
}
</script>

:::

## Geographical values

Utilize a map to represent values associated with geographical areas.

_For instance, you can display website audience by country or region on a map._

::: react-view

<script lang="tsx">
import React from 'react';
import ComponentCard from '@components/../components/ComponentCard';
const getImageName = (title) => {
  const name = title.replace(/[ \/]+/g, '');
  return name.charAt(0).toLowerCase() + name.slice(1);
};

import { Box } from '@semcore/flex-box';

const group = {
  line: {
    title: 'Line chart',
    route: '/data-display/line-chart',
    disabled: false,
    type: 'charts',
  },
  area: {
    title: 'Area chart',
    route: '/data-display/area-chart',
    disabled: false,
    type: 'charts',
  },
  areaStacked: {
    title: 'Stacked area chart',
    route: '/data-display/stacked-area-chart',
    disabled: false,
    type: 'charts',
  },
  combinedAreaLine: {
    title: 'Combined chart',
    route: '/data-display/combined-chart',
    disabled: true,
    type: 'charts',
  },
  bar: {
    title: 'Bar chart',
    route: '/data-display/bar-chart',
    disabled: false,
    type: 'charts',
  },
  barStacked: {
    title: 'Stacked bar chart',
    route: '/data-display/stacked-bar-chart',
    disabled: false,
    type: 'charts',
  },
  horizontalBar: {
    title: 'Horizontal bar chart',
    route: '/data-display/bar-horizontal',
    disabled: false,
    type: 'charts',
  },
  stackedHorizontalBar: {
    title: 'Stacked horizontal bar chart',
    route: '/data-display/stacked-horizontal-bar',
    disabled: false,
    type: 'charts',
  },
  histogram: {
    title: 'Histogram chart',
    route: '/data-display/histogram-chart',
    disabled: false,
    type: 'charts',
  },
  stackedHistogram: {
    title: 'Stacked histogram chart',
    route: '/data-display/stacked-histogram',
    disabled: true,
    type: 'charts',
  },
  donut: {
    title: 'Donut Pie chart',
    route: '/data-display/donut-chart',
    disabled: false,
    type: 'charts',
  },
  venn: {
    title: 'Venn chart',
    route: '/data-display/venn-chart',
    disabled: false,
    type: 'charts',
  },
  bubble: {
    title: 'Bubble chart',
    route: '/data-display/bubble-chart',
    type: 'charts',
  },
  scatterplot: {
    title: 'Scatterplot chart',
    route: '/data-display/scatterplot-chart',
    type: 'charts',
  },
  heatmap: {
    title: 'Heatmap',
    route: '/data-display/heatmap',
    disabled: true,
    type: 'charts',
  },
  funnel: {
    title: 'Funnel chart',
    route: '/data-display/funnel-chart',
    disabled: true,
    type: 'charts',
  },
  radar: {
    title: 'Radar chart',
    route: '/data-display/radar-chart',
    disabled: false,
    type: 'charts',
  },
  polar: {
    title: 'Polar chart',
    route: '/data-display/polar-chart',
    disabled: true,
    type: 'charts',
  },
  alluvial: {
    title: 'Alluvial chart',
    route: '/data-display/alluvial-chart',
    disabled: true,
    type: 'charts',
  },
  quadrant: {
    title: 'Quadrant chart',
    route: '/data-display/quadrant-chart',
    disabled: true,
    type: 'charts',
  },
  kagi: {
    title: 'Kagi chart',
    route: '/data-display/kagi-chart',
    disabled: true,
    type: 'charts',
  },
  lollipop: {
    title: 'Lollipop chart',
    route: '/data-display/lollipop-chart',
    disabled: true,
    type: 'charts',
  },
  choroplethMap: {
    title: 'Choropleth map',
    route: '/data-display/choropleth-map',
    disabled: true,
    type: 'charts',
  },
  radialTree: {
    title: 'Radial Tree chart',
    route: '/data-display/radial-tree-chart',
    type: 'charts',
  },
};

const cardsStyle = {
  display: 'grid',
  gridTemplateRows: 'max-content',
  gridTemplateColumns: 'repeat(auto-fill, 176px)',
  gridGap: 'var(--intergalactic-spacing-3x) var(--intergalactic-spacing-3x)',
  width: '100%',
  margin: '0',
  marginTop: 'var(--intergalactic-spacing-3x)',
  padding: '0',
};

const App = function (props) {
  const items = props.group.map((el) => group[el]);

  return (
    <Box style={cardsStyle}>
      {items.map((item) => (
        <ComponentCard
          key={item.title}
          image={getImageName(item.title)}
          text={item.title}
          disabled={item.disabled}
          href={item.route}
          type={item.type}
        />
      ))}
    </Box>
  );
}
</script>

:::

