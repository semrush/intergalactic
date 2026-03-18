import { Box, Flex } from '@semcore/ui/base-components';
import { Chart, ChartLegend, Plot, Line, XAxis, YAxis, minMax, HorizontalBar, HoverLine } from '@semcore/ui/d3-chart';
import { Text } from '@semcore/ui/typography';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { scaleBand, scaleLinear, scaleTime } from 'd3-scale';
import React from 'react';

import { ThemePlaygroundLayout } from './theme-playground-switcher';
import ChartCategoricalOrderPalette from '../../website/src/docs-components/ChartCategoricalOrderPalette';
import ChartSequentialOrderPalette from '../../website/src/docs-components/ChartSequentialOrderPalette';
import BarMockData from '../components/d3-chart/__mocks__/bar';
import BubbleMockData from '../components/d3-chart/__mocks__/bubble';
import DonutMockData from '../components/d3-chart/__mocks__/donut';
import LineMockData from '../components/d3-chart/__mocks__/line';
import RadarMockData from '../components/d3-chart/__mocks__/radar';
import ScatterplotMockData from '../components/d3-chart/__mocks__/scatterplot';
import StackedAreaMockData from '../components/d3-chart/__mocks__/stacked-area';
import VennMockData from '../components/d3-chart/__mocks__/venn';
import './theme-playground-fonts.css';

/** Line chart (2 series), временная ось X — при каждой перезагрузке страницы генерируются заново */
const LineChartTwoLinesData = Array.from({ length: 20 }, (_, i) => ({
  date: new Date(2026, 0, 1 + i),
  line1: Math.round(Math.random() * 10 * 10) / 10,
  line2: Math.round(Math.random() * 10 * 10) / 10,
}));

/** Line.Area chart, временная ось X — при каждой перезагрузке страницы генерируются заново */
const LineAreaChartData = Array.from({ length: 20 }, (_, i) => {
  const y = Math.round(Math.random() * 8 * 10) / 10;
  const spread = Math.round(Math.random() * 4 * 10) / 10;
  return {
    date: new Date(2026, 0, 1 + i),
    y,
    y0: Math.max(0, y - spread),
    y1: y + spread,
  };
});

/** 10 data series for Line chart (временная ось X) — при каждой перезагрузке страницы генерируются заново */
const LineChartTenSeriesData = Array.from({ length: 20 }, (_, i) => {
  const row: Record<string, Date | number> = {
    date: new Date(2026, 0, 1 + i),
  };
  for (let s = 1; s <= 10; s++) {
    row[`line${s}`] = Math.round(Math.random() * 3 * 10) / 10;
  }
  return row;
});

/** 5 data series for Scatterplot with chart-palette-order-1 … chart-palette-order-5 */
const ScatterplotFiveSeriesData = [
  { x: 0, y1: 2, y2: 5, y3: 7, y4: 1, y5: 9 },
  { x: 1, y1: 4, y2: 7, y3: 3, y4: 6, y5: 2 },
  { x: 2, y1: 6, y2: 3, y3: 9, y4: 4, y5: 8 },
  { x: 3, y1: 8, y2: 1, y3: 2, y4: 9, y5: 5 },
  { x: 4, y1: 5, y2: 9, y3: 6, y4: 3, y5: 10 },
  { x: 5, y1: 7, y2: 2, y3: 4, y4: 8, y5: 1 },
  { x: 6, y1: 3, y2: 6, y3: 8, y4: 2, y5: 7 },
  { x: 7, y1: 9, y2: 4, y3: 1, y4: 10, y5: 4 },
  { x: 8, y1: 1, y2: 8, y3: 10, y4: 5, y5: 6 },
  { x: 9, y1: 10, y2: 0, y3: 5, y4: 7, y5: 3 },
];

const LAZZER_FONT = '\'Lazzer\', sans-serif';

/** Stacked bar: 5 months, 3 series (для графика над Horizontal bar) */
const stackedBarChartData = [
  { month: 'Jan', a: 4, b: 3, c: 2 },
  { month: 'Feb', a: 5, b: 4, c: 1 },
  { month: 'Mar', a: 3, b: 5, c: 3 },
  { month: 'Apr', a: 6, b: 2, c: 4 },
  { month: 'May', a: 4, b: 4, c: 5 },
];
const stackedBarLegendIds = ['a', 'b', 'c'] as const;
const stackedBarColorMap = { a: 'blue-500', b: 'blue-300', c: 'blue-100' } as const;

const meta: Meta = {
  title: 'Theme/Charts Theme Playground',
};

export default meta;

type Story = StoryObj;

const vennLegendMap = {
  G: { label: 'Good' },
  F: { label: 'Fast' },
  C: { label: 'Clean' },
};

const formatXDate = (value: Date) => `${value.toLocaleDateString('en-US', { month: 'short' })} ${value.getDate()}`;

function LineAreaChart({
  data,
  width,
  height,
}: {
  data: Array<{ date: Date; y: number; y0: number; y1: number }>;
  width: number;
  height: number;
}) {
  const MARGIN = 40;
  const xScale = scaleTime()
    .range([MARGIN, width - MARGIN])
    .domain(minMax(data, 'date') as [Date, Date]);
  const yScale = scaleLinear()
    .range([height - MARGIN, MARGIN])
    .domain([0, Math.max(...data.map((d) => d.y1))]);
  const yTicks = yScale.ticks(3);
  const xTicks = xScale.ticks(10);
  return (
    <Plot data={data} scale={[xScale, yScale]} width={width} height={height}>
      <YAxis>
        <YAxis.Ticks ticks={yTicks} />
        <YAxis.Grid ticks={yTicks} />
      </YAxis>
      <XAxis>
        <XAxis.Ticks ticks={xTicks}>{(p: { value: Date }) => ({ children: formatXDate(p.value) })}</XAxis.Ticks>
      </XAxis>
      <HoverLine.Tooltip x='date' wMin={100}>
        {({ xIndex }: { xIndex: number | null }) => {
          if (xIndex == null) return { children: null };
          const d = data[xIndex];
          return {
            children: (
              <>
                <HoverLine.Tooltip.Title>{formatXDate(d.date)}</HoverLine.Tooltip.Title>
                <Flex justifyContent='space-between'>
                  <HoverLine.Tooltip.Dot mr={4}>y</HoverLine.Tooltip.Dot>
                  <Text bold>{d.y}</Text>
                </Flex>
              </>
            ),
          };
        }}
      </HoverLine.Tooltip>
      <Line x='date' y='y'>
        <Line.Area y0='y0' y1='y1' />
      </Line>
    </Plot>
  );
}

/** Reserve enough space on the left so long Y-axis (category) labels are not clipped */
const HORIZONTAL_BAR_Y_AXIS_MARGIN = 80;

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
    .range([HORIZONTAL_BAR_Y_AXIS_MARGIN, width - MARGIN])
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
  const [stackedBarVisible, setStackedBarVisible] = React.useState<
    Record<(typeof stackedBarLegendIds)[number], boolean>
  >({ a: true, b: true, c: true });
  const stackedBarLegendItems = React.useMemo(
    () =>
      stackedBarLegendIds.map((id) => ({
        id,
        label: id,
        checked: stackedBarVisible[id],
        color: stackedBarColorMap[id],
      })),
    [stackedBarVisible],
  );
  const stackedBarDataFiltered = React.useMemo(
    () =>
      stackedBarChartData.map((row) => {
        const out: Record<string, string | number> = { month: row.month };
        stackedBarLegendIds.forEach((key) => {
          if (stackedBarVisible[key]) out[key] = row[key];
        });
        return out;
      }),
    [stackedBarVisible],
  );

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
                groupKey='date'
                data={LineChartTwoLinesData}
                plotWidth={500}
                plotHeight={200}
                yTicksCount={3}
                axisXValueFormatter={(value: Date) => `${value.toLocaleDateString('en-US', { month: 'short' })} ${value.getDate()}`}
                showDots
                aria-label='Line chart'
              />
            </Box>
            <Box>
              <Text tag='h2' size={400} semibold mb={4} color='text-primary' style={{ fontFamily: LAZZER_FONT }}>
                Line.Area chart
              </Text>
              <LineAreaChart data={LineAreaChartData} width={500} height={200} />
            </Box>
            <Box>
              <Text tag='h2' size={400} semibold mb={4} color='text-primary' style={{ fontFamily: LAZZER_FONT }}>
                Area chart (stacked)
              </Text>
              <Chart.Area
                groupKey='time'
                data={StackedAreaMockData.Default}
                plotWidth={500}
                plotHeight={200}
                xTicksCount={10}
                yTicksCount={6}
                axisXValueFormatter={(value: Date) => `${value.toLocaleDateString('en-US', { month: 'short' })} ${value.getDate()}`}
                showDots
                stacked
                aria-label='Area chart stacked'
              />
            </Box>
            <Box>
              <Text tag='h2' size={400} semibold mb={4} color='text-primary' style={{ fontFamily: LAZZER_FONT }}>
                Histogram
              </Text>
              <Chart.Bar
                groupKey='category'
                data={BarMockData.Default}
                plotWidth={500}
                plotHeight={240}
                aria-label='Bar chart'
              />
            </Box>
            <Box>
              <Text tag='h2' size={400} semibold mb={4} color='text-primary' style={{ fontFamily: LAZZER_FONT }}>
                Horizontal bar chart
              </Text>
              <HorizontalBarChart data={BarMockData.Default} width={500} height={240} />
            </Box>
            <Box>
              <Text tag='h2' size={400} semibold mb={4} color='text-primary' style={{ fontFamily: LAZZER_FONT }}>
                Bubble chart
              </Text>
              <Chart.Bubble
                data={BubbleMockData.Label}
                plotWidth={500}
                plotHeight={240}
                aria-label='Bubble chart'
              />
            </Box>
            <Box>
              <Text tag='h2' size={400} semibold mb={4} color='text-primary' style={{ fontFamily: LAZZER_FONT }}>
                Scatterplot chart
              </Text>
              <Chart.ScatterPlot
                data={ScatterplotMockData.Default}
                groupKey='x'
                plotWidth={500}
                plotHeight={240}
                aria-label='Scatterplot chart'
              />
            </Box>
            <Box>
              <Text tag='h2' size={400} semibold mb={4} color='text-primary' style={{ fontFamily: LAZZER_FONT }}>
                Scatterplot chart (5 series)
              </Text>
              <Chart.ScatterPlot
                data={ScatterplotFiveSeriesData}
                groupKey='x'
                plotWidth={500}
                plotHeight={240}
                showLegend
                aria-label='Scatterplot chart with 5 palette colors'
              />
            </Box>
          </Flex>
          <Flex direction='column' gap={10} alignItems='flex-start'>
            <Box>
              <Text tag='h2' size={400} semibold mb={4} color='text-primary' style={{ fontFamily: LAZZER_FONT }}>
                Donut chart
              </Text>
              <Chart.Donut
                data={DonutMockData.Default}
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
                data={DonutMockData.Default}
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
                data={VennMockData.Default}
                plotWidth={300}
                plotHeight={300}
                legendProps={{ legendMap: vennLegendMap }}
                aria-label='Venn chart'
              />
            </Box>
            <Box>
              <Text tag='h2' size={400} semibold mb={4} color='text-primary' style={{ fontFamily: LAZZER_FONT }}>
                Bar
              </Text>
              <Flex direction='column' alignItems='flex-start' mb={2}>
                <ChartLegend
                  items={stackedBarLegendItems}
                  aria-label='Stacked bar legend'
                  onChangeVisibleItem={(key, checked) => setStackedBarVisible((prev) => ({ ...prev, [key]: checked }))}
                />
              </Flex>
              <Chart.Bar
                groupKey='month'
                data={stackedBarDataFiltered}
                plotWidth={400}
                plotHeight={200}
                type='stack'
                showLegend={false}
                yTicksCount={3}
                colorMap={stackedBarColorMap}
                aria-label='Stacked bar chart'
              />
            </Box>
            <Box>
              <Text tag='h2' size={400} semibold mb={4} color='text-primary' style={{ fontFamily: LAZZER_FONT }}>
                Compact horizontal bar chart
              </Text>
              <Chart.CompactHorizontalBar
                y='category'
                x='bar'
                data={BarMockData.Default}
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
                data={RadarMockData.Default}
                groupKey='categories'
                plotWidth={400}
                plotHeight={400}
                aria-label='Radar chart'
              />
            </Box>
          </Flex>
        </Flex>

        <Box mt={10} w={600}>
          <Text tag='h2' size={400} semibold mb={4} color='text-primary' style={{ fontFamily: LAZZER_FONT }}>
            Line chart
          </Text>
          <Chart.Line
            groupKey='date'
            data={LineChartTenSeriesData}
            plotWidth={600}
            plotHeight={240}
            marginY={48}
            yTicksCount={3}
            axisXValueFormatter={(value: Date) => `${value.toLocaleDateString('en-US', { month: 'short' })} ${value.getDate()}`}
            showDots
            legendProps={{ flexWrap: 'wrap' }}
            aria-label='Line chart with 10 datasets'
          />
        </Box>

        <Box mt={10}>
          <Text tag='h2' size={400} semibold mb={4} color='text-primary' style={{ fontFamily: LAZZER_FONT }}>
            Categorical order (chart palette)
          </Text>
          <ChartCategoricalOrderPalette />
        </Box>

        <Box mt={10}>
          <Text tag='h2' size={400} semibold mb={4} color='text-primary' style={{ fontFamily: LAZZER_FONT }}>
            Sequential order (base palette)
          </Text>
          <ChartSequentialOrderPalette />
        </Box>
      </Box>
    </ThemePlaygroundLayout>
  );
}

export const Default: Story = {
  render: () => <ChartsThemePlaygroundContent />,
};
