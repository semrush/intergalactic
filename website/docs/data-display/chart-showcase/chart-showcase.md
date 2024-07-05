---
title: Charts showcase
fileSource: d3-chart
docs: true
---

There are various chart types within the Intergalactic Design System, each designed for distinct scenarios and data representation.

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
  bar: {
    title: 'Bar chart',
    route: '/intergalactic/data-display/bar-chart/bar-chart',
    disabled: false,
    type: 'charts',
  },
  horizontalBar: {
    title: 'Horizontal bar chart',
    route: '/intergalactic/data-display/bar-horizontal/bar-horizontal',
    disabled: false,
    type: 'charts',
  },
  histogram: {
    title: 'Histogram chart',
    route: '/intergalactic/data-display/histogram-chart/histogram-chart',
    disabled: false,
    type: 'charts',
  },
  donut: {
    title: 'Donut Pie chart',
    route: '/intergalactic/data-display/donut-chart/donut-chart',
    disabled: false,
    type: 'charts',
  },
  cigaretteChart: {
    title: 'Cigarette bar chart',
    route: '/intergalactic/data-display/cigarette-chart/cigarette-chart',
    disabled: false,
    type: 'charts',
  },
  bubble: {
    title: 'Bubble chart',
    route: '/intergalactic/data-display/bubble-chart/bubble-chart',
    type: 'charts',
  },
  lollipop: {
    title: 'Lollipop chart',
    route: '/intergalactic/data-display/lollipop-chart/lollipop-chart',
    disabled: true,
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
  const items = Object.keys(group).map((el) => group[el]);

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
  bar: {
    title: 'Bar chart',
    route: '/intergalactic/data-display/bar-chart/bar-chart',
    disabled: false,
    type: 'charts',
  },
  barStacked: {
    title: 'Stacked bar chart',
    route: '/intergalactic/data-display/stacked-bar-chart/stacked-bar-chart',
    disabled: false,
    type: 'charts',
  },
  horizontalBar: {
    title: 'Horizontal bar chart',
    route: '/intergalactic/data-display/bar-horizontal/bar-horizontal',
    disabled: false,
    type: 'charts',
  },
  stackedHorizontalBar: {
    title: 'Stacked horizontal bar chart',
    route: '/intergalactic/data-display/stacked-horizontal-bar/stacked-horizontal-bar',
    disabled: false,
    type: 'charts',
  },
  histogram: {
    title: 'Histogram chart',
    route: '/intergalactic/data-display/histogram-chart/histogram-chart',
    disabled: false,
    type: 'charts',
  },
  stackedHistogram: {
    title: 'Stacked histogram chart',
    route: '/intergalactic/data-display/stacked-histogram/stacked-histogram',
    disabled: true,
    type: 'charts',
  },
  line: {
    title: 'Line chart',
    route: '/intergalactic/data-display/line-chart/line-chart',
    disabled: false,
    type: 'charts',
  },
  lollipop: {
    title: 'Lollipop chart',
    route: '/intergalactic/data-display/lollipop-chart/lollipop-chart',
    disabled: true,
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
  const items = Object.keys(group).map((el) => group[el]);

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
    route: '/intergalactic/data-display/line-chart/line-chart',
    disabled: false,
    type: 'charts',
  },
  area: {
    title: 'Area chart',
    route: '/intergalactic/data-display/area-chart/area-chart',
    disabled: false,
    type: 'charts',
  },
  areaStacked: {
    title: 'Stacked area chart',
    route: '/intergalactic/data-display/stacked-area-chart/stacked-area-chart',
    disabled: false,
    type: 'charts',
  },
  bar: {
    title: 'Bar chart',
    route: '/intergalactic/data-display/bar-chart/bar-chart',
    disabled: false,
    type: 'charts',
  },
  barStacked: {
    title: 'Stacked bar chart',
    route: '/intergalactic/data-display/stacked-bar-chart/stacked-bar-chart',
    disabled: false,
    type: 'charts',
  },
  miniTrend: {
    title: 'Mini trend',
    route: '/intergalactic/data-display/mini-chart/mini-chart',
    disabled: false,
    type: 'charts',
  },
    combinedAreaLine: {
    title: 'Combined chart',
    route: '/intergalactic/data-display/combined-chart/combined-chart',
    disabled: true,
    type: 'charts',
  },
  heatmap: {
    title: 'Heatmap',
    route: '/intergalactic/data-display/heatmap/heatmap',
    disabled: true,
    type: 'charts',
  },
  lollipop: {
    title: 'Lollipop chart',
    route: '/intergalactic/data-display/lollipop-chart/lollipop-chart',
    disabled: true,
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
  const items = Object.keys(group).map((el) => group[el]);

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
  donut: {
    title: 'Donut Pie chart',
    route: '/intergalactic/data-display/donut-chart/donut-chart',
    disabled: false,
    type: 'charts',
  },
  cigaretteChart: {
    title: 'Cigarette bar chart',
    route: '/intergalactic/data-display/cigarette-chart/cigarette-chart',
    disabled: false,
    type: 'charts',
  },
  barStacked: {
    title: 'Stacked bar chart',
    route: '/intergalactic/data-display/stacked-bar-chart/stacked-bar-chart',
    disabled: false,
    type: 'charts',
  },
  horizontalBar: {
    title: 'Horizontal bar chart',
    route: '/intergalactic/data-display/bar-horizontal/bar-horizontal',
    disabled: false,
    type: 'charts',
  },
  stackedHorizontalBar: {
    title: 'Stacked horizontal bar chart',
    route: '/intergalactic/data-display/stacked-horizontal-bar/stacked-horizontal-bar',
    disabled: false,
    type: 'charts',
  },
  areaStacked: {
    title: 'Stacked area chart',
    route: '/intergalactic/data-display/stacked-area-chart//stacked-area-chart',
    disabled: false,
    type: 'charts',
  },
  miniScore: {
    title: 'Mini chart',
    route: '/intergalactic/data-display/mini-chart/mini-chart',
    disabled: false,
    type: 'charts',
  },
  stackedHistogram: {
    title: 'Stacked histogram chart',
    route: '/intergalactic/data-display/stacked-histogram/stacked-histogram',
    disabled: true,
    type: 'charts',
  },
  funnel: {
    title: 'Funnel chart',
    route: '/intergalactic/data-display/funnel-chart/funnel-chart',
    disabled: true,
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
  const items = Object.keys(group).map((el) => group[el]);

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
  bar: {
    title: 'Bar chart',
    route: '/intergalactic/data-display/bar-chart/bar-chart',
    disabled: false,
    type: 'charts',
  },
  barStacked: {
    title: 'Stacked bar chart',
    route: '/intergalactic/data-display/stacked-bar-chart/stacked-bar-chart',
    disabled: false,
    type: 'charts',
  },
  histogram: {
    title: 'Histogram chart',
    route: '/intergalactic/data-display/histogram-chart/histogram-chart',
    disabled: false,
    type: 'charts',
  },
  stackedHistogram: {
    title: 'Stacked histogram chart',
    route: '/intergalactic/data-display/stacked-histogram/stacked-histogram',
    disabled: true,
    type: 'charts',
  },
  bubble: {
    title: 'Bubble chart',
    route: '/intergalactic/data-display/bubble-chart/bubble-chart',
    type: 'charts',
  },
  scatterplot: {
    title: 'Scatterplot chart',
    route: '/intergalactic/data-display/scatterplot-chart/scatterplot-chart',
    type: 'charts',
  },
  heatmap: {
    title: 'Heatmap',
    route: '/intergalactic/data-display/heatmap/heatmap',
    disabled: true,
    type: 'charts',
  },
  radar: {
    title: 'Radar chart',
    route: '/intergalactic/data-display/radar-chart/radar-chart',
    disabled: false,
    type: 'charts',
  },
  radialTree: {
    title: 'Radial Tree chart',
    route: '/intergalactic/data-display/radial-tree-chart/radial-tree-chart',
    type: 'charts',
  },
  polar: {
    title: 'Polar chart',
    route: '/intergalactic/data-display/polar-chart/polar-chart',
    disabled: true,
    type: 'charts',
  },
  alluvial: {
    title: 'Alluvial chart',
    route: '/intergalactic/data-display/alluvial-chart/alluvial-chart',
    disabled: true,
    type: 'charts',
  },
  quadrant: {
    title: 'Quadrant chart',
    route: '/intergalactic/data-display/quadrant-chart/quadrant-chart',
    disabled: true,
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
  const items = Object.keys(group).map((el) => group[el]);

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
  venn: {
    title: 'Venn chart',
    route: '/intergalactic/data-display/venn-chart/venn-chart',
    disabled: false,
    type: 'charts',
  },
  scatterplot: {
    title: 'Scatterplot chart',
    route: '/intergalactic/data-display/scatterplot-chart/scatterplot-chart',
    type: 'charts',
  },
  heatmap: {
    title: 'Heatmap',
    route: '/intergalactic/data-display/heatmap/heatmap',
    disabled: true,
    type: 'charts',
  },
  alluvial: {
    title: 'Alluvial chart',
    route: '/intergalactic/data-display/alluvial-chart/alluvial-chart',
    disabled: true,
    type: 'charts',
  },
  kagi: {
    title: 'Kagi chart',
    route: '/intergalactic/data-display/kagi-chart/kagi-chart',
    disabled: true,
    type: 'charts',
  },
  radialtree: {
    title: 'Radial Tree chart',
    route: '/intergalactic/data-display/radial-tree-chart/radial-tree-chart',
    disabled: true,
    type: 'charts',
  },
};

const cardsStyle = {
  display: 'grid',
  gridTemplateRows: 'max-content',
  gridTemplateColumns: 'repeat(auto-fill, 160px)',
  gridGap: 'var(--intergalactic-spacing-3x) var(--intergalactic-spacing-3x)',
  width: '100%',
  margin: '0',
  marginTop: 'var(--intergalactic-spacing-3x)',
  padding: '0',
};

const App = function (props) {
  const items = Object.keys(group).map((el) => group[el]);

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
  bar: {
    title: 'Bar chart',
    route: '/intergalactic/data-display/bar-chart/bar-chart',
    disabled: false,
    type: 'charts',
  },
  barStacked: {
    title: 'Stacked bar chart',
    route: '/intergalactic/data-display/stacked-bar-chart/stacked-bar-chart',
    disabled: false,
    type: 'charts',
  },
  area: {
    title: 'Area chart',
    route: '/intergalactic/data-display/area-chart/area-chart',
    disabled: false,
    type: 'charts',
  },
  areaStacked: {
    title: 'Stacked area chart',
    route: '/intergalactic/data-display/stacked-area-chart',
    disabled: false,
    type: 'charts',
  },
  histogram: {
    title: 'Histogram chart',
    route: '/intergalactic/data-display/histogram-chart/histogram-chart',
    disabled: false,
    type: 'charts',
  },
  scatterplot: {
    title: 'Scatterplot chart',
    route: '/intergalactic/data-display/scatterplot-chart/scatterplot-chart',
    type: 'charts',
  },
  miniScore: {
    title: 'Mini chart',
    route: '/intergalactic/data-display/mini-chart/mini-chart',
    disabled: false,
    type: 'charts',
  },
  lollipop: {
    title: 'Lollipop chart',
    route: '/intergalactic/data-display/lollipop-chart/lollipop-chart',
    disabled: true,
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
  const items = Object.keys(group).map((el) => group[el]);

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
  choroplethMap: {
    title: 'Choropleth map',
    route: '/intergalactic/data-display/choropleth-map/choropleth-map',
    disabled: true,
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
  const items = Object.keys(group).map((el) => group[el]);

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

