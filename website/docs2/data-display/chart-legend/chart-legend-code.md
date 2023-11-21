---
title: Chart legend
fileSource: d3-chart
tabs: Design('chart-legend'), API('chart-legend-api'), Example('chart-legend-code'), Changelog('d3-chart-changelog')
---

## Usage with different chart types

- For usage with Line chart, refer to the example in the [Line chart](/data-display/line-chart/line-chart-d3-code#legend).
- For usage with Bar chart, refer to the example in the [Stacked bar chart](/data-display/stacked-bar-chart/stacked-bar-chart-d3-code#legend).
- For usage with Donut chart, refer to the example in the [Donut chart](/data-display/donut-chart/donut-chart-d3-code#legend).

## Custom shape as LegendItem

You can set your custom SVG shape for a LegendItem.

::: sandbox

<script lang="tsx">
import React from 'react';
import { ChartLegend, LegendItem } from '@semcore/d3-chart';
import { useColorResolver } from '@semcore/utils/lib/use/useColorResolver';

const data = [...Array(5).keys()].map((d, i) => ({
  x: i,
  Line1: Math.random() * 10,
  Line2: Math.random() * 10,
  Line3: Math.random() * 10,
  Line4: Math.random() * 10,
  Line5: Math.random() * 10,
}));

const Shape = (props) => {
  const colorResolver = useColorResolver();

  return (
    <div
      style={{
        width: '0',
        height: '0',
        borderTop: '8px solid transparent',
        borderLeft: `16px solid ${colorResolver(props.color)}`,
        borderBottom: '8px solid transparent',
        marginRight: '4px',
      }}
    />
  );
};

const Demo = () => {
  const lines = Object.keys(data[0])
    .filter((name) => name !== 'x')
    .reduce<LegendItem[]>((res, item, index) => {
      res.push({
        id: item,
        label: item,
        checked: true,
        color: `chart-palette-order-${index + 1}`,
      });

      return res;
    }, []);

  return (
    <div>
      <ChartLegend items={lines}>
        <ChartLegend.LegendItem>
          <ChartLegend.LegendItem.Shape style={{ background: 'transparent' }}>
            {(props) => {
              return <Shape {...props} />;
            }}
          </ChartLegend.LegendItem.Shape>
          <ChartLegend.LegendItem.Label />
        </ChartLegend.LegendItem>
      </ChartLegend>
    </div>
  );
};
</script>

:::

## Table view

::: sandbox

<script lang="tsx">
import React from 'react';
import { ChartLegendTable } from '@semcore/d3-chart';
import { Text } from '@semcore/typography';

const data = [...Array(5).keys()].map((d, i) => ({
  x: i,
  Line1: Math.random() * 10,
  Line2: Math.random() * 10,
  Line3: Math.random() * 10,
  Line4: Math.random() * 10,
  Line5: Math.random() * 10,
}));

const Demo = () => {
  const lines = Object.keys(data[0])
    .filter((key) => key !== 'x')
    .map((item, index) => {
      return {
        id: item,
        label: `Item ${index + 1}`,
        checked: true,
        color: `chart-palette-order-${index + 1}`,
        columns: [
          <Text use={'secondary'}>{(42 * (index + 3)) / 10}%</Text>,
          <Text use={'primary'}>{42 * (index + 3)}</Text>,
        ],
      };
    });

  return (
    <div style={{ width: '200px' }}>
      <ChartLegendTable items={lines} />
    </div>
  );
};
</script>

:::
