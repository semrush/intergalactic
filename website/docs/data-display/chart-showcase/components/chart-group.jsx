import React from 'react';
import ComponentCard from '@docs/../src/components/ComponentCard';
import { getImageName } from '@docs/../src/pages/Home';
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

export default function (props) {
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
