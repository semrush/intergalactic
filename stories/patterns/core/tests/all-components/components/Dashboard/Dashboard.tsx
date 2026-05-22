import FileExportM from '@semcore/icon/FileExport/m';
import MathPlusM from '@semcore/icon/MathPlus/m';
import { Box, Flex } from '@semcore/ui/base-components';
import { FilterTrigger } from '@semcore/ui/base-trigger';
import Button from '@semcore/ui/button';
import Card from '@semcore/ui/card';
import { Chart, ChartLegend, ResponsiveContainer } from '@semcore/ui/d3-chart';
import Divider from '@semcore/ui/divider';
import Link from '@semcore/ui/link';
import MiniChart from '@semcore/ui/mini-chart';
import Pills from '@semcore/ui/pills';
import Select from '@semcore/ui/select';
import { Text } from '@semcore/ui/typography';
import React from 'react';

import {
  buildDashboardAreaChart,
  buildDashboardLineChart,
  DASHBOARD_DOMAIN_OPTIONS,
} from './dashboardDomainCharts';
import BarMockData from '../../../../../../components/d3-chart/__mocks__/bar';
import CigaretteMockData from '../../../../../../components/d3-chart/__mocks__/cigarette';
import DonutMockData from '../../../../../../components/d3-chart/__mocks__/donut';
import ScatterplotMockData from '../../../../../../components/d3-chart/__mocks__/scatterplot';
import VennMockData from '../../../../../../components/d3-chart/__mocks__/venn';
import FeedbackRatingFormExample
  from '../../../../../ux-patterns/feedback-rating/docs/examples/feedback_rating_form';
import PrimaryTable from '../Tables/PrimaryTable';

export type DashboardProps = {
  showPrimaryTableFooter?: boolean;
};

const STACKED_BAR_SERIES_KEYS = ['a', 'b', 'c'] as const;
const STACKED_BAR_COLOR_MAP: Record<(typeof STACKED_BAR_SERIES_KEYS)[number], string> = {
  a: 'blue-500',
  b: 'blue-300',
  c: 'blue-100',
};

const STACKED_BAR_BY_MONTH = [
  { month: 'Jan', a: 2, b: 3, c: 2 },
  { month: 'Feb', a: 4, b: 1, c: 3 },
  { month: 'Mar', a: 3, b: 2, c: 4 },
  { month: 'Apr', a: 5, b: 2, c: 1 },
  { month: 'May', a: 2, b: 4, c: 3 },
  { month: 'Jun', a: 3, b: 3, c: 2 },
];

const CHART_CONTAINER_HEIGHT = 220;
const LEGEND_RESERVE_HEIGHT = 44;
const Y_TICKS_COUNT = 3;

function formatAreaAxis(value: unknown): string {
  if (value instanceof Date) {
    return new Intl.DateTimeFormat('en', { month: 'short', day: 'numeric' }).format(value);
  }
  return String(value);
}

function projectStackedBarMonthData(visible: { a: boolean; b: boolean; c: boolean }) {
  return STACKED_BAR_BY_MONTH.map((row) => {
    const out: { month: string; a?: number; b?: number; c?: number } = { month: row.month };
    for (const k of STACKED_BAR_SERIES_KEYS) {
      if (visible[k]) out[k] = row[k];
    }
    return out;
  });
}

function ChartBox({
  children,
  h = CHART_CONTAINER_HEIGHT,
}: {
  children: (size: [number, number]) => React.ReactNode;
  h?: number;
}) {
  const [size, setSize] = React.useState<[number, number]>([0, 0]);
  return (
    <ResponsiveContainer h={h} onResize={setSize} w='100%' style={{ overflow: 'hidden', minWidth: 0 }}>
      {size[0] > 0 ? children(size) : null}
    </ResponsiveContainer>
  );
}

function cardSectionStyle(flexBasis: string): React.CSSProperties {
  return {
    flex: flexBasis,
    minWidth: 'min(100%, 280px)',
    maxWidth: '100%',
    boxSizing: 'border-box',
  };
}

export function Dashboard({ showPrimaryTableFooter = false }: DashboardProps) {
  const [stackedBarSeriesVisible, setStackedBarSeriesVisible] = React.useState({
    a: true,
    b: true,
    c: true,
  });
  const [domains, setDomains] = React.useState<(string | undefined)[]>(['domain1', 'domain2']);

  const dashboardLineChart = React.useMemo(() => buildDashboardLineChart(domains), [domains]);
  const dashboardAreaChart = React.useMemo(() => buildDashboardAreaChart(domains), [domains]);

  const dashboardStackedBarData = React.useMemo(
    () => projectStackedBarMonthData(stackedBarSeriesVisible),
    [stackedBarSeriesVisible],
  );
  const dashboardStackedBarLegendItems = React.useMemo(
    () =>
      STACKED_BAR_SERIES_KEYS.map((id) => ({
        id,
        label: id,
        checked: stackedBarSeriesVisible[id],
        color: STACKED_BAR_COLOR_MAP[id],
      })),
    [stackedBarSeriesVisible],
  );

  return (
    <Box style={{ background: 'var(--intergalactic-bg-secondary-neutral)' }}>
      <Box my={4} w='100%'>
        <FeedbackRatingFormExample />
      </Box>
      <Box pb={10} pt={2}>
        <Flex direction='column' gap={2} my={4} mb={6}>
          <Flex gap={2} flexWrap alignItems='center'>
            {domains.map((domain, index) => {
              const removeSlot = () => {
                setDomains((prev) => prev.filter((_, i) => i !== index));
              };
              return (
                <Select
                  key={`domain-filter-${index}`}
                  value={domain}
                  onChange={(v: string) => {
                    setDomains((prev) => {
                      const next = [...prev];
                      next[index] = v;
                      return next;
                    });
                  }}
                  disablePortal
                >
                  <Select.Trigger
                    tag={FilterTrigger}
                    placeholder='Add domain'
                    onClear={removeSlot}
                  />
                  <Select.Menu aria-label='Add domain'>
                    {DASHBOARD_DOMAIN_OPTIONS.map((opt) => (
                      <Select.Option key={opt.value} value={opt.value}>
                        {opt.label}
                      </Select.Option>
                    ))}
                  </Select.Menu>
                </Select>
              );
            })}
            <Button
              use='tertiary'
              theme='muted'
              addonLeft={MathPlusM}
              onClick={() => setDomains((prev) => [...prev, undefined])}
            >
              Add domain
            </Button>
          </Flex>
        </Flex>

        <Flex gap={4} mb={4} flexWrap style={{ width: '100%', boxSizing: 'border-box' }}>
          <Card tag='section' style={{ ...cardSectionStyle('1 1 calc(50% - 8px)'), minWidth: 'min(100%, 360px)' }}>
            <Card.Body>
              <Flex gap={6} w='100%'>
                {[
                  {
                    label: 'Visibility',
                    value: '42',
                    delta: 'no change',
                    deltaColor: 'text-large-secondary',
                  },
                  {
                    label: 'Estimated traffic',
                    value: '24,765',
                    delta: '−4',
                    deltaColor: 'text-large-critical',
                    trendAreaData: [90, 82, 78, 74, 68, 62, 58, 52, 48, 42],
                  },
                  {
                    label: 'Average position',
                    value: '908',
                    delta: '-1',
                    deltaColor: 'text-large-warning',
                  },
                ].map((item, i) => (
                  <React.Fragment key={item.label}>
                    {i > 0 && <Divider orientation='vertical' />}
                    <Flex direction='column' style={{ flex: 1, minWidth: 0 }}>
                      <Text size={200} noWrap>
                        {item.label}
                      </Text>
                      <Flex alignItems='baseline' gap={1} mt={1}>
                        <Link size={500} fontWeight='bold' href='https://semrush.com' target='_blank'>
                          {item.value}
                        </Link>
                        <Text size={100} color={item.deltaColor} noWrap>
                          {item.delta}
                        </Text>
                        {'trendAreaData' in item && item.trendAreaData && (
                          <MiniChart.TrendArea
                            aria-hidden
                            data={item.trendAreaData}
                            h={20}
                            w={80}
                          />
                        )}
                      </Flex>
                    </Flex>
                  </React.Fragment>
                ))}
              </Flex>
            </Card.Body>
          </Card>

          <Card tag='section' style={{ ...cardSectionStyle('1 1 calc(50% - 8px)'), minWidth: 'min(100%, 360px)' }}>
            <Card.Body>
              <Flex gap={6} w='100%'>
                {[
                  {
                    label: 'Keywords',
                    value: '1,284',
                    delta: '+28',
                    deltaColor: 'text-large-success',
                  },
                  {
                    label: 'Backlinks',
                    value: '4,521',
                    delta: 'no change',
                    deltaColor: 'text-large-secondary',
                  },
                  {
                    label: 'Domain health',
                    value: '94',
                    delta: '+2',
                    deltaColor: 'text-large-success',
                  },
                ].map((item, i) => (
                  <React.Fragment key={item.label}>
                    {i > 0 && <Divider orientation='vertical' />}
                    <Flex direction='column' style={{ flex: 1, minWidth: 0 }}>
                      <Text size={200} noWrap>
                        {item.label}
                      </Text>
                      <Flex alignItems='baseline' gap={1} mt={1}>
                        <Link size={500} fontWeight='bold' href='https://semrush.com' target='_blank'>
                          {item.value}
                        </Link>
                        <Text size={100} color={item.deltaColor} noWrap>
                          {item.delta}
                        </Text>
                      </Flex>
                    </Flex>
                  </React.Fragment>
                ))}
              </Flex>
            </Card.Body>
          </Card>
        </Flex>

        <Flex direction='column' gap={4} mb={4} style={{ width: '100%', boxSizing: 'border-box' }}>
          <Flex gap={4} flexWrap style={{ width: '100%', boxSizing: 'border-box' }}>
            <Card tag='section' style={cardSectionStyle('4 1 calc(33.333% - 11px)')}>
              <Card.Header>
                <Flex justifyContent='space-between' alignItems='flex-start' w='100%'>
                  <Box>
                    <Card.Title tag='h3'>Line</Card.Title>
                    <Card.Description>One line per selected domain (legend matches domain name).</Card.Description>
                  </Box>
                  <Button addonLeft={FileExportM} aria-label='Export'>
                    Export
                  </Button>
                </Flex>
              </Card.Header>
              <Card.Body>
                <ChartBox>
                  {([width, height]) => (
                    <Chart.Line
                      groupKey='x'
                      data={dashboardLineChart.data}
                      plotWidth={width}
                      plotHeight={height - LEGEND_RESERVE_HEIGHT}
                      yTicksCount={Y_TICKS_COUNT}
                      xTicksCount={7}
                      showDots
                      showLegend
                      legendProps={dashboardLineChart.legendProps}
                      aria-label='Line chart'
                    />
                  )}
                </ChartBox>
              </Card.Body>
            </Card>

            <Card tag='section' style={cardSectionStyle('4 1 calc(33.333% - 11px)')}>
              <Card.Header>
                <Flex justifyContent='space-between' alignItems='flex-start' w='100%'>
                  <Box>
                    <Card.Title tag='h3'>Area</Card.Title>
                    <Card.Description>Stacked area by time; stacks follow selected domains.</Card.Description>
                  </Box>
                  <Button addonLeft={FileExportM} aria-label='Export'>
                    Export
                  </Button>
                </Flex>
              </Card.Header>
              <Card.Body>
                <ChartBox>
                  {([width, height]) => (
                    <Chart.Area
                      groupKey='time'
                      data={dashboardAreaChart.data}
                      plotWidth={width}
                      plotHeight={height - LEGEND_RESERVE_HEIGHT}
                      yTicksCount={Y_TICKS_COUNT}
                      xTicksCount={5}
                      stacked
                      showDots
                      showLegend
                      legendProps={dashboardAreaChart.legendProps}
                      tooltipValueFormatter={formatAreaAxis}
                      axisXValueFormatter={formatAreaAxis}
                      aria-label='Area chart'
                    />
                  )}
                </ChartBox>
              </Card.Body>
            </Card>

            <Card tag='section' style={cardSectionStyle('2 1 calc(33.333% - 11px)')}>
              <Card.Header>
                <Flex justifyContent='space-between' alignItems='flex-start' w='100%'>
                  <Box>
                    <Card.Title tag='h3'>Cigarette</Card.Title>
                    <Card.Description>Horizontal segments.</Card.Description>
                  </Box>
                  <Button addonLeft={FileExportM} aria-label='Export'>
                    Export
                  </Button>
                </Flex>
              </Card.Header>
              <Card.Body>
                <ChartBox h={180}>
                  {([width]) => (
                    <Chart.Cigarette
                      data={CigaretteMockData.Default}
                      plotWidth={width}
                      plotHeight={28}
                      invertAxis
                      showLegend
                      aria-label='Cigarette chart horizontal'
                    />
                  )}
                </ChartBox>
              </Card.Body>
            </Card>
          </Flex>

          <Flex gap={4} flexWrap style={{ width: '100%', boxSizing: 'border-box' }}>
            <Card tag='section' style={cardSectionStyle('3 1 calc(33.333% - 11px)')}>
              <Card.Header>
                <Flex justifyContent='space-between' alignItems='flex-start' w='100%'>
                  <Box>
                    <Card.Title tag='h3'>Donut</Card.Title>
                    <Card.Description>Distribution overview.</Card.Description>
                  </Box>
                  <Button addonLeft={FileExportM} aria-label='Export'>
                    Export
                  </Button>
                </Flex>
              </Card.Header>
              <Card.Body>
                <Box style={{ display: 'flex', justifyContent: 'flex-start' }}>
                  <Chart.Donut
                    data={DonutMockData.Default}
                    plotWidth={120}
                    plotHeight={120}
                    aria-label='Donut chart'
                    innerRadius={30}
                  />
                </Box>
              </Card.Body>
            </Card>

            <Card tag='section' style={cardSectionStyle('3 1 calc(33.333% - 11px)')}>
              <Card.Header>
                <Flex justifyContent='space-between' alignItems='flex-start' w='100%'>
                  <Box>
                    <Card.Title tag='h3'>Bar horizontal</Card.Title>
                    <Card.Description>Compact horizontal bars.</Card.Description>
                  </Box>
                  <Button addonLeft={FileExportM} aria-label='Export'>
                    Export
                  </Button>
                </Flex>
              </Card.Header>
              <Card.Body>
                <ChartBox h={260}>
                  {([width, height]) => (
                    <Chart.CompactHorizontalBar
                      y='category'
                      x='value'
                      data={BarMockData.WithValue.slice(0, 3)}
                      plotWidth={width}
                      plotHeight={height}
                      aria-label='Compact horizontal bar chart'
                    />
                  )}
                </ChartBox>
              </Card.Body>
            </Card>

            <Card tag='section' style={cardSectionStyle('4 1 calc(33.333% - 11px)')}>
              <Card.Header>
                <Flex justifyContent='space-between' alignItems='flex-start' w='100%'>
                  <Box>
                    <Card.Title tag='h3'>Scatterplot</Card.Title>
                    <Card.Description>Three series by x.</Card.Description>
                  </Box>
                  <Button addonLeft={FileExportM} aria-label='Export'>
                    Export
                  </Button>
                </Flex>
              </Card.Header>
              <Card.Body>
                <ChartBox>
                  {([width, height]) => (
                    <Chart.ScatterPlot
                      data={ScatterplotMockData.ThreeSetsWithValue}
                      groupKey='x'
                      plotWidth={width}
                      plotHeight={height - LEGEND_RESERVE_HEIGHT}
                      yTicksCount={Y_TICKS_COUNT}
                      xTicksCount={7}
                      showLegend
                      legendProps={{
                        legendMap: {
                          y1: { label: 'Organic' },
                          y2: { label: 'Paid' },
                          y3: { label: 'Social' },
                        },
                      }}
                      aria-label='Scatterplot chart'
                    />
                  )}
                </ChartBox>
              </Card.Body>
            </Card>
          </Flex>

          <Flex gap={4} flexWrap alignItems='stretch' style={{ width: '100%', boxSizing: 'border-box' }}>
            <Card
              tag='section'
              style={{
                flex: '1 1 calc(33.333% - 11px)',
                minWidth: 'min(100%, 280px)',
                maxWidth: '100%',
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              <Card.Header>
                <Flex justifyContent='space-between' alignItems='center' w='100%'>
                  <Card.Title tag='h3'>Bar</Card.Title>
                  <Button addonLeft={FileExportM} aria-label='Export'>
                    Export
                  </Button>
                </Flex>
              </Card.Header>
              <Card.Body style={{ flex: 1, display: 'flex', flexDirection: 'column', minHeight: 0 }}>
                <ChartBox>
                  {([width, height]) => (
                    <Chart.Bar
                      groupKey='category'
                      data={BarMockData.Default}
                      plotWidth={width}
                      plotHeight={height}
                      marginX={52}
                      yTicksCount={Y_TICKS_COUNT}
                      colorMap={{ bar: 'blue-500' }}
                      aria-label='Bar chart by category'
                    />
                  )}
                </ChartBox>
                <Box mt='auto' pt={3} ml={5} style={{ alignSelf: 'flex-start' }}>
                  <Button>View full report</Button>
                </Box>
              </Card.Body>
            </Card>

            <Card
              tag='section'
              style={{
                flex: '1 1 calc(33.333% - 11px)',
                minWidth: 'min(100%, 280px)',
                maxWidth: '100%',
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              <Card.Header>
                <Flex justifyContent='space-between' alignItems='center' w='100%'>
                  <Card.Title tag='h3'>Bar stacked</Card.Title>
                  <Button addonLeft={FileExportM} aria-label='Export'>
                    Export
                  </Button>
                </Flex>
              </Card.Header>
              <Card.Body style={{ flex: 1, display: 'flex', flexDirection: 'column', minHeight: 0 }}>
                <Flex justifyContent='space-between' alignItems='center' w='100%' mb={4} flexWrap gap={3}>
                  <ChartLegend
                    items={dashboardStackedBarLegendItems}
                    direction='row'
                    aria-label='Bar series'
                    onChangeVisibleItem={(id: string, isVisible: boolean) => {
                      setStackedBarSeriesVisible((prev) => {
                        if (id !== 'a' && id !== 'b' && id !== 'c') return prev;
                        const next = { ...prev, [id]: isVisible };
                        const anyOn = next.a || next.b || next.c;
                        return anyOn ? next : prev;
                      });
                    }}
                  />
                  <Pills defaultValue='incoming'>
                    <Pills.Item value='incoming'>Incoming links</Pills.Item>
                    <Pills.Item value='outgoing'>Outgoing links</Pills.Item>
                  </Pills>
                </Flex>
                <ChartBox>
                  {([width, height]) => (
                    <Chart.Bar
                      groupKey='month'
                      type='stack'
                      data={dashboardStackedBarData}
                      plotWidth={width}
                      plotHeight={height}
                      marginX={52}
                      yTicksCount={Y_TICKS_COUNT}
                      colorMap={STACKED_BAR_COLOR_MAP}
                      showLegend={false}
                      aria-label='Stacked bar chart by month'
                    />
                  )}
                </ChartBox>
                <Box mt='auto' pt={3} ml={5} style={{ alignSelf: 'flex-start' }}>
                  <Button>View full report</Button>
                </Box>
              </Card.Body>
            </Card>

            <Card
              tag='section'
              style={{
                flex: '1 1 calc(33.333% - 11px)',
                minWidth: 'min(100%, 280px)',
                maxWidth: '100%',
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              <Card.Header>
                <Flex justifyContent='space-between' alignItems='center' w='100%'>
                  <Card.Title tag='h3'>Bar grouped</Card.Title>
                  <Button addonLeft={FileExportM} aria-label='Export'>
                    Export
                  </Button>
                </Flex>
              </Card.Header>
              <Card.Body style={{ flex: 1, display: 'flex', flexDirection: 'column', minHeight: 0 }}>
                <ChartBox>
                  {([width, height]) => (
                    <Chart.Bar
                      groupKey='category'
                      type='group'
                      data={BarMockData.TwoBars}
                      plotWidth={width}
                      plotHeight={height - LEGEND_RESERVE_HEIGHT}
                      marginX={48}
                      yTicksCount={Y_TICKS_COUNT}
                      showLegend
                      aria-label='Grouped bar chart'
                    />
                  )}
                </ChartBox>
                <Box mt='auto' pt={3} ml={5} style={{ alignSelf: 'flex-start' }}>
                  <Button>View full report</Button>
                </Box>
              </Card.Body>
            </Card>
          </Flex>
        </Flex>

        <Flex gap={4} flexWrap alignItems='stretch' mb={4} style={{ width: '100%', boxSizing: 'border-box' }}>
          <Card
            tag='section'
            style={{
              flex: '1 1 calc(33.333% - 11px)',
              minWidth: 'min(100%, 280px)',
              maxWidth: '100%',
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <Card.Header>
              <Flex justifyContent='space-between' alignItems='center' w='100%'>
                <Card.Title tag='h3'>Venn</Card.Title>
                <Button addonLeft={FileExportM} aria-label='Export'>
                  Export
                </Button>
              </Flex>
            </Card.Header>
            <Card.Body style={{ flex: 1, display: 'flex', flexDirection: 'column', minHeight: 0 }}>
              <ChartBox>
                {([width, height]) => {
                  const size = Math.min(width, height);
                  return (
                    <Box style={{ display: 'flex', justifyContent: 'center' }}>
                      <Chart.Venn
                        data={VennMockData.Default}
                        plotWidth={size}
                        plotHeight={size}
                        showLegend
                        aria-label='Venn chart'
                      />
                    </Box>
                  );
                }}
              </ChartBox>
            </Card.Body>
          </Card>

          <Card
            tag='section'
            style={{
              flex: '1 1 calc(33.333% - 11px)',
              minWidth: 'min(100%, 280px)',
              maxWidth: '100%',
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <Card.Header>
              <Flex justifyContent='space-between' alignItems='center' w='100%'>
                <Card.Title tag='h3'>Cigarette</Card.Title>
                <Button addonLeft={FileExportM} aria-label='Export'>
                  Export
                </Button>
              </Flex>
            </Card.Header>
            <Card.Body style={{ flex: 1, display: 'flex', flexDirection: 'column', minHeight: 0 }}>
              <ChartBox>
                {([, height]) => (
                  <Box style={{ display: 'flex', justifyContent: 'flex-start' }}>
                    <Chart.Cigarette
                      data={CigaretteMockData.Default}
                      plotWidth={44}
                      plotHeight={height - LEGEND_RESERVE_HEIGHT}
                      invertAxis={false}
                      showLegend
                      tooltipTitle='Some title for tooltip'
                      showTotalInTooltip
                      aria-label='Cigarette chart vertical'
                    />
                  </Box>
                )}
              </ChartBox>
            </Card.Body>
          </Card>
        </Flex>

        {showPrimaryTableFooter && (
          <Box mt={8} w='100%'>
            <PrimaryTable />
          </Box>
        )}
      </Box>
    </Box>
  );
}
