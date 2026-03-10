import BookM from '@semcore/icon/Book/m';
import Chat from '@semcore/icon/Chat/m';
import MathPlusM from '@semcore/icon/MathPlus/m';
import { Box, Flex } from '@semcore/ui/base-components';
import { LinkTrigger } from '@semcore/ui/base-trigger';
import Breadcrumbs from '@semcore/ui/breadcrumbs';
import Button, { ButtonLink } from '@semcore/ui/button';
import Card from '@semcore/ui/card';
import {
  Chart,
  HorizontalBar,
  minMax,
  Plot,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from '@semcore/ui/d3-chart';
import { DataTable } from '@semcore/ui/data-table';
import type { DataTableData } from '@semcore/ui/data-table';
import Link from '@semcore/ui/link';
import Pills from '@semcore/ui/pills';
import ProductHead, { Info, Title } from '@semcore/ui/product-head';
import Select from '@semcore/ui/select';
import TabLine from '@semcore/ui/tab-line';
import Tooltip from '@semcore/ui/tooltip';
import { Text } from '@semcore/ui/typography';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { scaleBand, scaleLinear } from 'd3-scale';
import React from 'react';

import { ThemePlaygroundLayout, ThemeSwitcherDropdown } from './theme-playground-switcher';
import './theme-playground-fonts.css';

const meta: Meta = {
  title: 'Theme/Dashboard Playground',
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

const barChartData = [
  { category: 'A', bar: 4 },
  { category: 'B', bar: 8 },
  { category: 'C', bar: 5 },
  { category: 'D', bar: 7 },
  { category: 'E', bar: 9 },
];

const donutChartData = { a: 3, b: 5, c: 2, d: 4 };

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

const dataTableData: DataTableData = [
  { keyword: 'ebay buy', kd: '77.8', cpc: '$1.25', vol: '32,500,000' },
  { keyword: 'www.ebay.com', kd: '11.2', cpc: '$3.40', vol: '65,457,920' },
  { keyword: 'ebay store', kd: '10.0', cpc: '$0.65', vol: '47,354,640' },
  { keyword: 'ebay buy', kd: '75.89', cpc: '$0.00', vol: '21,644,290' },
];

const rowThemeStyles = ['success', 'info', 'muted', 'warning', 'danger'] as const;
const primaryDataTableData: DataTableData = rowThemeStyles.map((theme, i) => ({
  theme,
  metric: String(100 - i * 15),
  value: String(250 + i * 50),
  change: `${i % 2 === 0 ? '+' : ''}${(i - 2) * 5}%`,
}));

const internalLinkingData = [
  { category: '0', value: 13 },
  { category: '1', value: 18 },
  { category: '2-5', value: 25 },
  { category: '6-15', value: 22 },
  { category: '16-50', value: 26 },
  { category: '51-150', value: 17 },
  { category: '151-500', value: 12 },
  { category: '500+', value: 16 },
];

const CHART_HEIGHT = 180;
/** Height for charts that need extra space (axis labels, legend) so content isn't clipped */
const CHART_CONTAINER_HEIGHT = 240;
/** Reserve space for legend above the plot so X axis isn't clipped */
const LEGEND_RESERVE_HEIGHT = 44;
/** Fixed number of Y-axis ticks; scale domain is derived from data and .nice() so data always fits */
const Y_TICKS_COUNT = 3;

const PLOT_PADDING = 6;
const LINE_CHART_MARGIN_X = 30;
const AREA_CHART_MARGIN_X = 24;

/** Build Y scale from data so that .ticks(n) always fits the data range (no manual tick count tuning) */
function useLineChartYScale(
  data: Array<Record<string, number>>,
  groupKey: string,
  plotHeight: number,
) {
  return React.useMemo(() => {
    const valueKeys = data.length ? Object.keys(data[0]).filter((k) => k !== groupKey) : [];
    const allValues = data.flatMap((d) => valueKeys.map((k) => Number(d[k])).filter(Number.isFinite));
    const min = allValues.length ? Math.min(0, ...allValues) : 0;
    const max = allValues.length ? Math.max(...allValues) : 10;
    return scaleLinear()
      .domain([min, max])
      .nice()
      .range([plotHeight - LINE_CHART_MARGIN_X, PLOT_PADDING]);
  }, [data, groupKey, plotHeight]);
}

/** Build Y scale for stacked area from data (domain = 0 to max stacked value) */
function useAreaChartYScale(
  data: Array<Record<string, number>>,
  groupKey: string,
  plotHeight: number,
) {
  return React.useMemo(() => {
    const valueKeys = data.length ? Object.keys(data[0]).filter((k) => k !== groupKey) : [];
    const stackedMax =
      data.length && valueKeys.length
        ? Math.max(
            ...data.map((row) =>
              valueKeys.reduce((sum, k) => sum + (Number(row[k]) || 0), 0),
            ),
          )
        : 10;
    return scaleLinear()
      .domain([0, stackedMax])
      .nice()
      .range([plotHeight - AREA_CHART_MARGIN_X, PLOT_PADDING]);
  }, [data, groupKey, plotHeight]);
}

function LineChartWithDataDrivenScale({
  width,
  height,
}: {
  width: number;
  height: number;
}) {
  const plotHeight = height - LEGEND_RESERVE_HEIGHT;
  const yScale = useLineChartYScale(lineChartData, 'x', plotHeight);
  return (
    <Chart.Line
      groupKey='x'
      data={lineChartData}
      plotWidth={width}
      plotHeight={plotHeight}
      yScale={yScale}
      yTicksCount={Y_TICKS_COUNT}
      showDots
      aria-label='Line chart'
    />
  );
}

function AreaChartWithDataDrivenScale({
  width,
  height,
}: {
  width: number;
  height: number;
}) {
  const plotHeight = height - LEGEND_RESERVE_HEIGHT;
  const yScale = useAreaChartYScale(areaChartData, 'x', plotHeight);
  return (
    <Chart.Area
      groupKey='x'
      data={areaChartData}
      plotWidth={width}
      plotHeight={plotHeight}
      yScale={yScale}
      yTicksCount={Y_TICKS_COUNT}
      stacked
      showDots
      showLegend
      aria-label='Area chart'
    />
  );
}

function ResponsiveChartWrapper({
  children,
  containerHeight = CHART_HEIGHT,
}: {
  children: (size: [number, number]) => React.ReactNode;
  containerHeight?: number;
}) {
  const [size, setSize] = React.useState<[number, number]>([0, 0]);
  return (
    <ResponsiveContainer
      h={containerHeight}
      onResize={setSize}
      w='100%'
      style={{ overflow: 'hidden', minWidth: 0 }}
    >
      {size[0] > 0 ? children(size) : null}
    </ResponsiveContainer>
  );
}

/** Fills parent height and passes measured size to chart so it adapts when card height is driven by sibling (e.g. table) */
function FillHeightChartWrapper({
  children,
}: {
  children: (size: [number, number]) => React.ReactNode;
}) {
  const ref = React.useRef<HTMLDivElement>(null);
  const [size, setSize] = React.useState<[number, number]>([0, 0]);

  React.useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const ro = new ResizeObserver((entries) => {
      const { width, height } = entries[0].contentRect;
      setSize([width, height]);
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  return (
    <Box
      ref={ref}
      style={{ flex: 1, minHeight: 0, overflow: 'hidden', minWidth: 0 }}
    >
      {size[0] > 0 && size[1] > 0 ? children(size) : null}
    </Box>
  );
}

const areaChartData = [
  { x: 0, area1: 2, area2: 3, area3: 1 },
  { x: 1, area1: 4, area2: 2, area3: 4 },
  { x: 2, area1: 3, area2: 5, area3: 2 },
  { x: 3, area1: 6, area2: 4, area3: 5 },
  { x: 4, area1: 5, area2: 6, area3: 4 },
  { x: 5, area1: 7, area2: 5, area3: 6 },
  { x: 6, area1: 6, area2: 7, area3: 5 },
  { x: 7, area1: 8, area2: 6, area3: 7 },
  { x: 8, area1: 9, area2: 8, area3: 8 },
  { x: 9, area1: 10, area2: 9, area3: 9 },
];

function BarChartHorizontal({
  data,
  width,
  height,
}: {
  data: Array<{ category: string; bar: number }>;
  width: number;
  height: number;
}) {
  const MARGIN = 24;
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

function DashboardPlaygroundContent() {
  const [tabValue, setTabValue] = React.useState(1);

  return (
    <ThemePlaygroundLayout switcherVariant='inline'>
      <Box style={{ background: 'var(--intergalactic-bg-secondary-neutral)', minHeight: '100vh', borderRadius: 12 }}>
        <ProductHead mx={8} pt={4}>
          <ProductHead.Row>
            <Breadcrumbs>
              <Breadcrumbs.Item href='#'>Projects</Breadcrumbs.Item>
              <Breadcrumbs.Item href='#'>Dashboard</Breadcrumbs.Item>
              <Breadcrumbs.Item href='#' active>
                Theme playground
              </Breadcrumbs.Item>
            </Breadcrumbs>

            <ProductHead.Links>
              <ButtonLink addonLeft={Chat}>Feedback</ButtonLink>
              <Link href='#' noWrap addonLeft={BookM}>
                User manual
              </Link>
            </ProductHead.Links>
          </ProductHead.Row>

          <ProductHead.Row>
            <Title toolName='Dashboard:'>
              <Text color='text-secondary' noWrap>
                Theme playground
              </Text>
            </Title>

            <ProductHead.Buttons>
              <Button use='primary' addonLeft={MathPlusM}>
                Add item
              </Button>
              <ThemeSwitcherDropdown triggerProps={{ size: 'm' }} />
            </ProductHead.Buttons>
          </ProductHead.Row>

          <ProductHead.Row>
            <Info>
              <Info.Item>
                <Info.Item.Label tag='label' htmlFor='dashboard-select'>
                  Filter:
                </Info.Item.Label>
                <Select
                  id='dashboard-select'
                  defaultValue='all'
                  placeholder='Select option'
                  m='auto'
                  tag={LinkTrigger}
                  options={[
                    { value: 'all', label: 'All', children: 'All' },
                    { value: 'recent', label: 'Recent', children: 'Recent' },
                  ]}
                />
              </Info.Item>
              <Info.Item label='Last update:'>1 hour ago</Info.Item>
            </Info>
          </ProductHead.Row>
        </ProductHead>

        <Box px={8} pb={8}>
          <TabLine value={tabValue} onChange={setTabValue} mb={6}>
            <TabLine.Item value={1}>Overview</TabLine.Item>
            <TabLine.Item value={2}>Analytics</TabLine.Item>
            <TabLine.Item value={3}>Reports</TabLine.Item>
          </TabLine>

          <Flex
            gap={4}
            flexWrap
            style={{
              width: '100%',
              boxSizing: 'border-box',
            }}
          >
            <Card
              tag='section'
              style={{
                flex: '1 1 calc(33.333% - 11px)',
                minWidth: 'min(100%, 280px)',
                maxWidth: '100%',
              }}
            >
              <Card.Header>
                <Card.Title tag='h3'>Line</Card.Title>
                <Card.Description>The line goes where it wants.</Card.Description>
              </Card.Header>
              <Card.Body>
                <ResponsiveChartWrapper containerHeight={CHART_CONTAINER_HEIGHT}>
                  {([width, height]) => (
                    <LineChartWithDataDrivenScale width={width} height={height} />
                  )}
                </ResponsiveChartWrapper>
              </Card.Body>
            </Card>

            <Card
              tag='section'
              style={{
                flex: '1 1 calc(33.333% - 11px)',
                minWidth: 'min(100%, 280px)',
                maxWidth: '100%',
              }}
            >
              <Card.Header>
                <Card.Title tag='h3'>Area</Card.Title>
                <Card.Description>Three layers — like a cake.</Card.Description>
              </Card.Header>
              <Card.Body>
                <ResponsiveChartWrapper containerHeight={CHART_CONTAINER_HEIGHT}>
                  {([width, height]) => (
                    <Chart.Area
                      groupKey='x'
                      data={areaChartData}
                      plotWidth={width}
                      plotHeight={height - LEGEND_RESERVE_HEIGHT}
                      yTicksCount={10}
                      stacked
                      showDots
                      showLegend
                      aria-label='Area chart'
                    />
                  )}
                </ResponsiveChartWrapper>
              </Card.Body>
            </Card>

            <Card
              tag='section'
              style={{
                flex: '1 1 calc(33.333% - 11px)',
                minWidth: 'min(100%, 280px)',
                maxWidth: '100%',
              }}
            >
              <Card.Header>
                <Card.Title tag='h3'>Bar</Card.Title>
                <Card.Description>Bars grow sideways.</Card.Description>
              </Card.Header>
              <Card.Body>
                <ResponsiveChartWrapper>
                  {([width, height]) => (
                    <BarChartHorizontal data={barChartData} width={width} height={height} />
                  )}
                </ResponsiveChartWrapper>
              </Card.Body>
            </Card>

            <Card
              tag='section'
              style={{
                flex: '1 1 calc(33.333% - 11px)',
                minWidth: 'min(100%, 280px)',
                maxWidth: '100%',
              }}
            >
              <Card.Header>
                <Card.Title tag='h3'>Donut</Card.Title>
                <Card.Description>A donut hole put to good use.</Card.Description>
              </Card.Header>
              <Card.Body>
                <ResponsiveChartWrapper>
                  {([width, height]) => {
                    const size = Math.min(width, height);
                    return (
                      <Chart.Donut
                        data={donutChartData}
                        plotWidth={size}
                        plotHeight={size}
                        aria-label='Donut chart'
                        innerRadius={Math.max(20, size * 0.23)}
                      />
                    );
                  }}
                </ResponsiveChartWrapper>
              </Card.Body>
            </Card>

            <Card
              tag='section'
              style={{
                flex: '2 2 calc(66.666% - 11px)',
                minWidth: 'min(100%, 400px)',
                maxWidth: '100%',
              }}
            >
              <Card.Header>
                <Card.Title tag='h3'>Scatterplot</Card.Title>
                <Card.Description>Points scattered every which way.</Card.Description>
              </Card.Header>
              <Card.Body>
                <ResponsiveChartWrapper>
                  {([width, height]) => (
                    <Chart.ScatterPlot
                      data={scatterplotChartData}
                      groupKey='x'
                      plotWidth={width}
                      plotHeight={height}
                      aria-label='Scatterplot chart'
                    />
                  )}
                </ResponsiveChartWrapper>
              </Card.Body>
            </Card>

            <Flex
              gap={4}
              flexWrap
              alignItems='stretch'
              style={{
                width: '100%',
                boxSizing: 'border-box',
              }}
            >
              <Card
                tag='section'
                style={{
                  flex: '1 1 calc(50% - 8px)',
                  minWidth: 'min(100%, 320px)',
                  maxWidth: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                }}
              >
                <Card.Header>
                  <Card.Title tag='h3'>Table</Card.Title>
                </Card.Header>
                <Card.Body
                  pt={0}
                  px={0}
                  pb={5}
                  style={{
                    flex: 1,
                    display: 'flex',
                    flexDirection: 'column',
                    minHeight: 0,
                  }}
                >
                  <Box style={{ flex: 1, minHeight: 0 }}>
                    <DataTable
                      use='secondary'
                      sideIndents='wide'
                      data={dataTableData}
                      aria-label='Dashboard table'
                      columns={[
                        { name: 'keyword', children: 'Keyword' },
                        { name: 'kd', children: 'KD %', justifyContent: 'end' },
                        { name: 'cpc', children: 'CPC', justifyContent: 'end' },
                        { name: 'vol', children: 'Vol.', justifyContent: 'end' },
                      ]}
                    />
                  </Box>
                  <Box mt='auto' pt={3} ml={5} style={{ alignSelf: 'flex-start' }}>
                    <Button use='secondary' size='m'>
                      View full report
                    </Button>
                  </Box>
                </Card.Body>
              </Card>

              <Card
                tag='section'
                style={{
                  flex: '1 1 calc(50% - 8px)',
                  minWidth: 'min(100%, 320px)',
                  maxWidth: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                }}
              >
                <Card.Header>
                  <Flex justifyContent='space-between' alignItems='center' w='100%'>
                    <Card.Title tag='h3'>Histogram</Card.Title>
                    <Pills defaultValue='incoming' size='m'>
                      <Pills.Item value='incoming'>Incoming links</Pills.Item>
                      <Pills.Item value='outgoing'>Outgoing links</Pills.Item>
                    </Pills>
                  </Flex>
                </Card.Header>
                <Card.Body
                  style={{
                    flex: 1,
                    display: 'flex',
                    flexDirection: 'column',
                    minHeight: 0,
                  }}
                >
                  <FillHeightChartWrapper>
                    {([width, height]) => (
                      <Chart.Bar
                        groupKey='category'
                        data={internalLinkingData}
                        plotWidth={width}
                        plotHeight={height}
                        yTicksCount={4}
                        aria-label='Internal linking bar chart'
                      />
                    )}
                  </FillHeightChartWrapper>
                  <Box mt='auto' pt={3} ml={5} style={{ alignSelf: 'flex-start' }}>
                    <Button use='secondary' size='m'>
                      View full report
                    </Button>
                  </Box>
                </Card.Body>
              </Card>
            </Flex>

            <Card
              tag='section'
              style={{
                flex: '1 1 100%',
                minWidth: '100%',
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              <Card.Header>
                <Card.Title tag='h3'>Primary DataTable</Card.Title>
              </Card.Header>
              <Card.Body
                pt={0}
                px={0}
                pb={1}
                style={{
                  flex: 1,
                  display: 'flex',
                  flexDirection: 'column',
                  minHeight: 0,
                }}
              >
                <Box w='100%' style={{ minWidth: 0 }}>
                  <DataTable
                    use='primary'
                    variant='card'
                    data={primaryDataTableData}
                    aria-label='Primary table with themed rows'
                    w='100%'
                    columns={[
                      { name: 'theme', children: 'Theme', gtcWidth: 'minmax(100px, 1fr)' },
                      { name: 'metric', children: 'Metric', gtcWidth: 'minmax(80px, 1fr)', justifyContent: 'end' },
                      { name: 'value', children: 'Value', gtcWidth: 'minmax(80px, 1fr)', justifyContent: 'end' },
                      { name: 'change', children: 'Change', gtcWidth: 'minmax(80px, 1fr)', justifyContent: 'end' },
                    ]}
                    rowProps={(_, index) => ({
                      theme: rowThemeStyles[index],
                    })}
                  />
                </Box>
              </Card.Body>
            </Card>
          </Flex>
        </Box>
      </Box>
    </ThemePlaygroundLayout>
  );
}

export const Default: Story = {
  render: () => <DashboardPlaygroundContent />,
};
