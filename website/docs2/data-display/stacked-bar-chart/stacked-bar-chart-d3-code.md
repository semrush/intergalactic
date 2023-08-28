---
title: Examples
fileSource: d3-chart
tabs: Stacked bar chart('stacked-bar-chart'), A11y('stacked-bar-chart-a11y'), API('stacked-bar-chart-api'), Examples('stacked-bar-chart-d3-code'), Changelog('d3-chart-changelog')
---

::: tip
See core principles, concept description, API and changelog in the [Chart principles](/data-display/d3-chart/).
:::

## Bar

Use `scaleBand` and `scaleLinear` for creating bar charts. See [d3 Ordinal Scales](https://github.com/d3/d3-scale#ordinal-scales) for more information.

`scaleBand` can work with non-numeric values, so be sure to specify a complete list of values in `domain` instead of just minimum and maximum values.

## Stacked bar chart

To draw a stacked chart, use `<StackBar/>` and `<StackBar.Bar/>`.

::: sandbox

<script lang="tsx">
import React from 'react';
import { Plot, StackBar, YAxis, XAxis, HoverRect, colors } from '@semcore/ui/d3-chart';
import { scaleLinear, scaleBand } from 'd3-scale';
import { Box, Flex } from '@semcore/ui/flex-box';
import { Text } from '@semcore/ui/typography';

export default () => {
  const MARGIN = 40;
  const width = 500;
  const height = 300;

  const xScale = scaleBand()
    .range([MARGIN, width - MARGIN])
    .domain(data.map((d) => d.category))
    .paddingInner(0.4)
    .paddingOuter(0.2);

  const yScale = scaleLinear()
    .range([height - MARGIN, MARGIN])
    .domain([0, 20]);

  return (
    <Plot data={data} scale={[xScale, yScale]} width={width} height={height}>
      <YAxis>
        <YAxis.Ticks />
        <YAxis.Grid />
      </YAxis>
      <XAxis>
        <XAxis.Ticks />
      </XAxis>
      <StackBar x='category'>
        <StackBar.Bar y='stack1' />
        <StackBar.Bar y='stack2' color={colors['blue-02']} />
      </StackBar>
      <HoverRect.Tooltip x='category' wMin={100}>
        {({ xIndex }) => {
          return {
            children: (
              <>
                <HoverRect.Tooltip.Title>{data[xIndex].category}</HoverRect.Tooltip.Title>
                <Flex justifyContent='space-between'>
                  <HoverRect.Tooltip.Dot mr={4}>Stack 1</HoverRect.Tooltip.Dot>
                  <Text bold>{data[xIndex].stack1}</Text>
                </Flex>
                <Flex mt={2} justifyContent='space-between'>
                  <HoverRect.Tooltip.Dot mr={4} color={colors['blue-02']}>
                    Stack 2
                  </HoverRect.Tooltip.Dot>
                  <Text bold>{data[xIndex].stack2}</Text>
                </Flex>
                <Flex mt={2} justifyContent='space-between'>
                  <Box mr={4}>Total</Box>
                  <Text bold>{data[xIndex].stack1 + data[xIndex].stack2}</Text>
                </Flex>
              </>
            ),
          };
        }}
      </HoverRect.Tooltip>
    </Plot>
  );
};

const data = [...Array(5).keys()].map((d, i) => ({
  category: `Category ${i}`,
  stack1: Math.random() * 10,
  stack2: Math.random() * 10,
}));
</script>

:::

## Legend

::: sandbox

<script lang="tsx">
import React from 'react';
import { Plot, StackBar, YAxis, XAxis } from '@semcore/ui/d3-chart';
import { scaleLinear, scaleBand } from 'd3-scale';
import { Flex } from '@semcore/ui/flex-box';
import resolveColor from '@semcore/ui/utils/color';
import Card from '@semcore/ui/card';
import Checkbox from '@semcore/ui/checkbox';

const barColors = {
  stack1: resolveColor('blue-300'),
  stack2: resolveColor('orange-400'),
  stack3: resolveColor('green-200'),
};

export default () => {
  const MARGIN = 30;
  const width = 500;
  const height = 300;

  const xScale = scaleBand()
    .range([MARGIN, width - MARGIN])
    .domain(data.map((d) => d.category))
    .paddingInner(0.4)
    .paddingOuter(0.2);

  const yScale = scaleLinear()
    .range([height - MARGIN, 0])
    .domain([0, 15]);

  const barsList = Object.keys(data[0]).filter((name) => name !== 'category');
  const [displayedBars, setDisplayedBars] = React.useState(
    barsList.reduce((o, key) => ({ ...o, [key]: true }), {}),
  );
  const [opacityBars, setOpacityBars] = React.useState(
    barsList.reduce((o, key) => ({ ...o, [key]: false }), {}),
  );
  const displayedBarsList = React.useMemo(
    () =>
      Object.entries(displayedBars)
        .filter(([, displayed]) => displayed)
        .map(([stack]) => stack),
    [displayedBars],
  );

  const handleMouseEnter = (stack) => () => {
    if (displayedBarsList.includes(stack)) {
      const opacity = { ...opacityBars };

      Object.keys(opacity).forEach((key) => {
        if (key !== stack) {
          opacity[key] = true;
        }
      });

      setOpacityBars({ ...opacity });
    }
  };

  const handleMouseLeave = () => {
    setOpacityBars(barsList.reduce((o, key) => ({ ...o, [key]: false }), {}));
  };

  return (
    <Card w={'550px'}>
      <Card.Header pt={4}> Chart legend</Card.Header>
      <Card.Body tag={Flex} direction='column'>
        <Flex flexWrap w={width} mt={1}>
          {barsList.map((stack) => {
            return (
              <Checkbox
                key={stack}
                theme={barColors[stack]}
                mr={4}
                mb={2}
                onMouseEnter={handleMouseEnter(stack)}
                onMouseLeave={handleMouseLeave}
              >
                <Checkbox.Value
                  checked={displayedBars[stack]}
                  onChange={(checked) =>
                    setDisplayedBars((prevDisplayedBar) => ({
                      ...prevDisplayedBar,
                      [stack]: checked,
                    }))
                  }
                />
                <Checkbox.Text>{stack}</Checkbox.Text>
              </Checkbox>
            );
          })}
        </Flex>
        <Plot data={data} scale={[xScale, yScale]} width={width} height={height}>
          <YAxis>
            <YAxis.Ticks />
            <YAxis.Grid />
          </YAxis>
          <XAxis>
            <XAxis.Ticks />
          </XAxis>
          <StackBar x='category'>
            {displayedBarsList.map((stack) => (
              <StackBar.Bar
                y={stack}
                key={stack}
                color={barColors[stack]}
                transparent={opacityBars[stack]}
              />
            ))}
          </StackBar>
        </Plot>
      </Card.Body>
    </Card>
  );
};

const data = [...Array(5).keys()].map((d, i) => ({
  category: `Category ${i}`,
  stack1: Math.random() * 5,
  stack2: Math.random() * 5,
  stack3: Math.random() * 5,
}));
</script>

:::
