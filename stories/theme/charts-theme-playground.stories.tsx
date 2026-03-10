import { Box, Flex } from '@semcore/ui/base-components';
import { Chart, Plot, Line, XAxis, YAxis, minMax, HorizontalBar, HoverRect } from '@semcore/ui/d3-chart';
import { Text } from '@semcore/ui/typography';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { scaleBand, scaleLinear } from 'd3-scale';
import React from 'react';

import { ThemePlaygroundLayout } from './theme-playground-switcher';
import './theme-playground-fonts.css';

const LAZZER_FONT = '\'Lazzer\', sans-serif';

const meta: Meta = {
  title: 'Theme/Charts Theme Playground',
};

export default meta;

type Story = StoryObj;

const lineChartData = [
  { x: 0, line1: 2, line2: 3 },
  { x: 1, line1: 4, line2: 2 },
  { x: 2, line1: 3, line2: 5 },
  { x: 3, line1: 6, line2: 4 },
  { x: 4, line1: 5, line2: 6 },
  { x: 5, line1: 7, line2: 5 },
  { x: 6, line1: 6, line2: 7 },
  { x: 7, line1: 8, line2: 6 },
  { x: 8, line1: 9, line2: 8 },
  { x: 9, line1: 10, line2: 9 },
];

const lineAreaChartData = [
  { x: 0, y: 2, y0: 0, y1: 4 },
  { x: 1, y: 4, y0: 0, y1: 6 },
  { x: 2, y: 3, y0: 0, y1: 5 },
  { x: 3, y: 6, y0: 0, y1: 8 },
  { x: 4, y: 5, y0: 0, y1: 7 },
  { x: 5, y: 7, y0: 0, y1: 9 },
  { x: 6, y: 6, y0: 0, y1: 8 },
  { x: 7, y: 8, y0: 0, y1: 10 },
  { x: 8, y: 9, y0: 0, y1: 10 },
  { x: 9, y: 10, y0: 0, y1: 12 },
];

const areaChartDataStacked = [
  { time: new Date('2024-01-01'), line1: 2, line2: 3 },
  { time: new Date('2024-01-06'), line1: 4, line2: 2 },
  { time: new Date('2024-01-11'), line1: 3, line2: 4 },
  { time: new Date('2024-01-16'), line1: 6, line2: 3 },
  { time: new Date('2024-01-21'), line1: 5, line2: 4 },
  { time: new Date('2024-01-26'), line1: 7, line2: 5 },
  { time: new Date('2024-01-31'), line1: 6, line2: 3 },
  { time: new Date('2024-02-05'), line1: 8, line2: 5 },
  { time: new Date('2024-02-10'), line1: 9, line2: 6 },
  { time: new Date('2024-02-15'), line1: 10, line2: 8 },
];

const barChartData = [
  { category: 'Cat 1', bar: 4 },
  { category: 'Cat 2', bar: 8 },
  { category: 'Cat 3', bar: 5 },
  { category: 'Cat 4', bar: 7 },
  { category: 'Cat 5', bar: 9 },
];

const donutChartData = {
  a: 3,
  b: 5,
  c: 2,
  d: 4,
};

const vennChartData = {
  'G': 200,
  'F': 200,
  'C': 500,
  'G/F': 100,
  'G/C': 100,
  'F/C': 100,
  'G/F/C': 100,
};

const vennLegendMap = {
  G: { label: 'Good' },
  F: { label: 'Fast' },
  C: { label: 'Clean' },
};

const radarChartData = {
  categories: ['Var 1', 'Var 2', 'Var 3', 'Var 4', 'Var 5', 'Var 6'],
  data_1: [1, 3, 5, 5, 9, 2],
  data_2: [5, 2, 1, 2, 7, 6],
};

const bubbleChartData = [
  { x: 2, y: 3, value: 5040, label: 'A' },
  { x: 1, y: 9, value: 40, label: 'B' },
  { x: 6, y: 2, value: 45634, label: 'C' },
  { x: 4, y: 7, value: 245, label: 'D' },
  { x: 9, y: 5, value: 7462, label: 'E' },
];

const scatterplotChartData = [
  { x: 0, y: 1 },
  { x: 1, y: 3 },
  { x: 2, y: 2 },
  { x: 3, y: 5 },
  { x: 4, y: 4 },
  { x: 5, y: 2 },
  { x: 6, y: 4 },
  { x: 7, y: 3 },
  { x: 8, y: 5 },
  { x: 9, y: 1 },
];

function LineAreaChart({
  data,
  width,
  height,
}: {
  data: Array<{ x: number; y: number; y0: number; y1: number }>;
  width: number;
  height: number;
}) {
  const MARGIN = 40;
  const xScale = scaleLinear()
    .range([MARGIN, width - MARGIN])
    .domain(minMax(data, 'x'));
  const yScale = scaleLinear()
    .range([height - MARGIN, MARGIN])
    .domain([0, Math.max(...data.map((d) => d.y1))]);
  return (
    <Plot data={data} scale={[xScale, yScale]} width={width} height={height}>
      <YAxis>
        <YAxis.Ticks />
        <YAxis.Grid />
      </YAxis>
      <XAxis>
        <XAxis.Ticks />
      </XAxis>
      <Line x='x' y='y'>
        <Line.Area y0='y0' y1='y1' />
      </Line>
    </Plot>
  );
}

function HorizontalBarChart({
  data,
  width,
  height,
}: {
  data: Array<{ category: string; bar: number }>;
  width: number;
  height: number;
}) {
  const MARGIN = 40;
  const xScale = scaleLinear()
    .range([MARGIN * 2, width - MARGIN])
    .domain([0, Math.max(...data.map((d) => d.bar), 10)]);
  const yScale = scaleBand()
    .range([height - MARGIN, MARGIN])
    .domain(data.map((d) => d.category))
    .paddingInner(0.4)
    .paddingOuter(0.2);
  return (
    <Plot data={data} scale={[xScale, yScale]} width={width} height={height}>
      <YAxis>
        <YAxis.Ticks />
      </YAxis>
      <XAxis>
        <XAxis.Ticks />
        <XAxis.Grid />
      </XAxis>
      <HorizontalBar x='bar' y='category' />
    </Plot>
  );
}

function ChartsThemePlaygroundContent() {
  return (
    <ThemePlaygroundLayout switcherZIndex={10000}>
      <Box p={6} style={{ background: 'var(--intergalactic-bg-primary-neutral)' }}>
        <Flex justifyContent='space-between' alignItems='center' mb={10}>
          <Text tag='h1' semibold size={600} color='text-primary' style={{ fontFamily: LAZZER_FONT }}>
            Charts theme playground
          </Text>
        </Flex>

        <Flex gap={10} alignItems='flex-start' flexWrap>
          <Flex direction='column' gap={10} alignItems='flex-start'>
            <Box>
              <Text tag='h2' size={400} semibold mb={4} color='text-primary' style={{ fontFamily: LAZZER_FONT }}>
                Line chart
              </Text>
              <Chart.Line
                groupKey='x'
                data={lineChartData}
                plotWidth={400}
                plotHeight={240}
                showDots
                aria-label='Line chart'
              />
            </Box>
            <Box>
              <Text tag='h2' size={400} semibold mb={4} color='text-primary' style={{ fontFamily: LAZZER_FONT }}>
                Line.Area chart
              </Text>
              <LineAreaChart data={lineAreaChartData} width={400} height={240} />
            </Box>
            <Box>
              <Text tag='h2' size={400} semibold mb={4} color='text-primary' style={{ fontFamily: LAZZER_FONT }}>
                Area chart (stacked)
              </Text>
              <Chart.Area
                groupKey='time'
                data={areaChartDataStacked}
                plotWidth={400}
                plotHeight={240}
                showDots
                stacked
                aria-label='Area chart stacked'
              />
            </Box>
            <Box>
              <Text tag='h2' size={400} semibold mb={4} color='text-primary' style={{ fontFamily: LAZZER_FONT }}>
                Bar chart
              </Text>
              <Chart.Bar
                groupKey='category'
                data={barChartData}
                plotWidth={400}
                plotHeight={240}
                aria-label='Bar chart'
              />
            </Box>
            <Box>
              <Text tag='h2' size={400} semibold mb={4} color='text-primary' style={{ fontFamily: LAZZER_FONT }}>
                Bubble chart
              </Text>
              <Chart.Bubble
                data={bubbleChartData}
                plotWidth={400}
                plotHeight={240}
                aria-label='Bubble chart'
              />
            </Box>
            <Box>
              <Text tag='h2' size={400} semibold mb={4} color='text-primary' style={{ fontFamily: LAZZER_FONT }}>
                Scatterplot chart
              </Text>
              <Chart.ScatterPlot
                data={scatterplotChartData}
                groupKey='x'
                plotWidth={400}
                plotHeight={240}
                aria-label='Scatterplot chart'
              />
            </Box>
          </Flex>
          <Flex direction='column' gap={10} alignItems='flex-start'>
            <Box>
              <Text tag='h2' size={400} semibold mb={4} color='text-primary' style={{ fontFamily: LAZZER_FONT }}>
                Donut chart
              </Text>
              <Chart.Donut
                data={donutChartData}
                plotWidth={300}
                plotHeight={240}
                aria-label='Donut chart'
                innerRadius={80}
              />
            </Box>
            <Box>
              <Text tag='h2' size={400} semibold mb={4} color='text-primary' style={{ fontFamily: LAZZER_FONT }}>
                Donut chart (halfsize)
              </Text>
              <Chart.Donut
                data={donutChartData}
                plotWidth={300}
                plotHeight={240}
                halfsize
                aria-label='Donut chart halfsize'
                innerRadius={100}
              />
            </Box>
            <Box>
              <Text tag='h2' size={400} semibold mb={4} color='text-primary' style={{ fontFamily: LAZZER_FONT }}>
                Venn chart
              </Text>
              <Chart.Venn
                data={vennChartData}
                plotWidth={300}
                plotHeight={300}
                legendProps={{ legendMap: vennLegendMap }}
                aria-label='Venn chart'
              />
            </Box>
            <Box>
              <Text tag='h2' size={400} semibold mb={4} color='text-primary' style={{ fontFamily: LAZZER_FONT }}>
                Horizontal bar chart
              </Text>
              <HorizontalBarChart data={barChartData} width={400} height={240} />
            </Box>
            <Box>
              <Text tag='h2' size={400} semibold mb={4} color='text-primary' style={{ fontFamily: LAZZER_FONT }}>
                Compact horizontal bar chart
              </Text>
              <Chart.CompactHorizontalBar
                y='category'
                x='bar'
                data={barChartData}
                plotWidth={400}
                plotHeight={320}
                marginY={8}
                aria-label='Compact horizontal bar chart'
              />
            </Box>
            <Box>
              <Text tag='h2' size={400} semibold mb={4} color='text-primary' style={{ fontFamily: LAZZER_FONT }}>
                Radar chart
              </Text>
              <Chart.Radar
                data={radarChartData}
                groupKey='categories'
                plotWidth={400}
                plotHeight={400}
                aria-label='Radar chart'
              />
            </Box>
          </Flex>
        </Flex>
      </Box>
    </ThemePlaygroundLayout>
  );
}

export const Default: Story = {
  render: () => <ChartsThemePlaygroundContent />,
};
