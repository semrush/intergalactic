---
title: Charts showcase
fileSource: d3-chart
tabName: Design
docs: true
tabs: Charts showcase('index'), Changelog('d3-chart-changelog')
---

We use many types of charts in the interface. Each of them is designed to visualize different cases and data.

- [Grid & axes](/data-display/d3-chart/#grid_and_axes)
- [Chart tooltip](/data-display/d3-chart/#tooltip)
- [Chart legend](/data-display/chart-legend/)

::: tip
Note that some chart types are in the development yet (they aren't clickable).
:::

## Comparison

Compare values of items in a list that has no particular order.

_For example: Compare audience in a list of selected domains versus the whole market._

::: react-view

<script lang="tsx">
import React from 'react';
import ComponentCard from '@docs/../components/ComponentCard';
import styled from 'styled-components';

const getImageName = (title) => {
  const name = title.replace(/[ \/]+/g, '');
  return name.charAt(0).toLowerCase() + name.slice(1);
};

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

const Cards = styled.div`
  display: grid;
  grid-template-rows: max-content;
  grid-template-columns: repeat(auto-fill, 176px);
  grid-gap: var(--intergalactic-spacing-3x) var(--intergalactic-spacing-3x);
  width: 100%;
  margin: 0;
  margin-top: var(--intergalactic-spacing-3x);
  padding: 0;
`;

const App = function (props) {
  const items = props.group.map((el) => group[el]);

  return (
    <Cards>
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
    </Cards>
  );
}
</script>

:::

## Ranking

Rank items from highest to lowest, or vice versa.

_For example: Rank countries by market share._

::: react-view

<script lang="tsx">
import React from 'react';
import ComponentCard from '@docs/../components/ComponentCard';
import styled from 'styled-components';

const getImageName = (title) => {
  const name = title.replace(/[ \/]+/g, '');
  return name.charAt(0).toLowerCase() + name.slice(1);
};

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

const Cards = styled.div`
  display: grid;
  grid-template-rows: max-content;
  grid-template-columns: repeat(auto-fill, 176px);
  grid-gap: var(--intergalactic-spacing-3x) var(--intergalactic-spacing-3x);
  width: 100%;
  margin: 0;
  margin-top: var(--intergalactic-spacing-3x);
  padding: 0;
`;

const App = function (props) {
  const items = props.group.map((el) => group[el]);

  return (
    <Cards>
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
    </Cards>
  );
}
</script>

:::

## Change over time (Trend)

Show the variation of values over time.

_For example: Show the traffic trend over time for different devices._

::: react-view

<script lang="tsx">
import React from 'react';
import ComponentCard from '@docs/../components/ComponentCard';
import styled from 'styled-components';

const getImageName = (title) => {
  const name = title.replace(/[ \/]+/g, '');
  return name.charAt(0).toLowerCase() + name.slice(1);
};

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

const Cards = styled.div`
  display: grid;
  grid-template-rows: max-content;
  grid-template-columns: repeat(auto-fill, 176px);
  grid-gap: var(--intergalactic-spacing-3x) var(--intergalactic-spacing-3x);
  width: 100%;
  margin: 0;
  margin-top: var(--intergalactic-spacing-3x);
  padding: 0;
`;

const App = function (props) {
  const items = props.group.map((el) => group[el]);

  return (
    <Cards>
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
    </Cards>
  );
}
</script>

:::

## Part to whole

Display the contribution of individual values to the whole.

_For example: Show the traffic share for different devices._

::: react-view

<script lang="tsx">
import React from 'react';
import ComponentCard from '@docs/../components/ComponentCard';
import styled from 'styled-components';

const getImageName = (title) => {
  const name = title.replace(/[ \/]+/g, '');
  return name.charAt(0).toLowerCase() + name.slice(1);
};

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

const Cards = styled.div`
  display: grid;
  grid-template-rows: max-content;
  grid-template-columns: repeat(auto-fill, 176px);
  grid-gap: var(--intergalactic-spacing-3x) var(--intergalactic-spacing-3x);
  width: 100%;
  margin: 0;
  margin-top: var(--intergalactic-spacing-3x);
  padding: 0;
`;

const App = function (props) {
  const items = props.group.map((el) => group[el]);

  return (
    <Cards>
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
    </Cards>
  );
}
</script>

:::

## Distribution

Show the distribution within a set of values.

_For example: Show the distribution of leaders, niche players and game changeres in the market._

::: react-view

<script lang="tsx">
import React from 'react';
import ComponentCard from '@docs/../components/ComponentCard';
import styled from 'styled-components';

const getImageName = (title) => {
  const name = title.replace(/[ \/]+/g, '');
  return name.charAt(0).toLowerCase() + name.slice(1);
};

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

const Cards = styled.div`
  display: grid;
  grid-template-rows: max-content;
  grid-template-columns: repeat(auto-fill, 176px);
  grid-gap: var(--intergalactic-spacing-3x) var(--intergalactic-spacing-3x);
  width: 100%;
  margin: 0;
  margin-top: var(--intergalactic-spacing-3x);
  padding: 0;
`;

const App = function (props) {
  const items = props.group.map((el) => group[el]);

  return (
    <Cards>
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
    </Cards>
  );
}
</script>

:::

## Correlation

Show the correlation between two or three sets of values.

_For example: Show how website traffic are impacted by customer age._

::: react-view

<script lang="tsx">
import React from 'react';
import ComponentCard from '@docs/../components/ComponentCard';
import styled from 'styled-components';

const getImageName = (title) => {
  const name = title.replace(/[ \/]+/g, '');
  return name.charAt(0).toLowerCase() + name.slice(1);
};

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

const Cards = styled.div`
  display: grid;
  grid-template-rows: max-content;
  grid-template-columns: repeat(auto-fill, 176px);
  grid-gap: var(--intergalactic-spacing-3x) var(--intergalactic-spacing-3x);
  width: 100%;
  margin: 0;
  margin-top: var(--intergalactic-spacing-3x);
  padding: 0;
`;

const App = function (props) {
  const items = props.group.map((el) => group[el]);

  return (
    <Cards>
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
    </Cards>
  );
}
</script>

:::

## Deviation

Show the deviation, difference, or gap between two sets of values.

_For example: Show the deviation between actual and target audience of the website._

::: react-view

<script lang="tsx">
import React from 'react';
import ComponentCard from '@docs/../components/ComponentCard';
import styled from 'styled-components';

const getImageName = (title) => {
  const name = title.replace(/[ \/]+/g, '');
  return name.charAt(0).toLowerCase() + name.slice(1);
};

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

const Cards = styled.div`
  display: grid;
  grid-template-rows: max-content;
  grid-template-columns: repeat(auto-fill, 176px);
  grid-gap: var(--intergalactic-spacing-3x) var(--intergalactic-spacing-3x);
  width: 100%;
  margin: 0;
  margin-top: var(--intergalactic-spacing-3x);
  padding: 0;
`;

const App = function (props) {
  const items = props.group.map((el) => group[el]);

  return (
    <Cards>
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
    </Cards>
  );
}
</script>

:::

## Geographical values

Use a map to show the values associated with geographical areas.

_For example: Show website audience by country or region on a map._

::: react-view

<script lang="tsx">
import React from 'react';
import ComponentCard from '@docs/../components/ComponentCard';
import styled from 'styled-components';

const getImageName = (title) => {
  const name = title.replace(/[ \/]+/g, '');
  return name.charAt(0).toLowerCase() + name.slice(1);
};

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

const Cards = styled.div`
  display: grid;
  grid-template-rows: max-content;
  grid-template-columns: repeat(auto-fill, 176px);
  grid-gap: var(--intergalactic-spacing-3x) var(--intergalactic-spacing-3x);
  width: 100%;
  margin: 0;
  margin-top: var(--intergalactic-spacing-3x);
  padding: 0;
`;

const App = function (props) {
  const items = props.group.map((el) => group[el]);

  return (
    <Cards>
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
    </Cards>
  );
}
</script>

:::

