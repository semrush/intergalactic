import BookM from '@semcore/icon/Book/m';
import Chat from '@semcore/icon/Chat/m';
import FileExportM from '@semcore/icon/FileExport/m';
import InfoM from '@semcore/icon/Info/m';
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
import Divider from '@semcore/ui/divider';
import Link from '@semcore/ui/link';
import Pills from '@semcore/ui/pills';
import ProductHead, { Info, Title } from '@semcore/ui/product-head';
import Select from '@semcore/ui/select';
import TabLine from '@semcore/ui/tab-line';
import Tooltip, { DescriptionTooltip } from '@semcore/ui/tooltip';
import { Text } from '@semcore/ui/typography';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { scaleBand, scaleLinear } from 'd3-scale';
import React from 'react';

import { ThemePlaygroundLayout, ThemeSwitcherDropdown } from './theme-playground-switcher';
import BarMockData from '../components/d3-chart/__mocks__/bar';
import DonutMockData from '../components/d3-chart/__mocks__/donut';
import LineMockData from '../components/d3-chart/__mocks__/line';
import ScatterplotMockData from '../components/d3-chart/__mocks__/scatterplot';
import './theme-playground-fonts.css';

const meta: Meta = {
  title: 'Theme/Dashboard Playground',
};

export default meta;

type Story = StoryObj;

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

const CHART_HEIGHT = 180;
/** Height for charts that need extra space (axis labels, legend) so content isn't clipped */
const CHART_CONTAINER_HEIGHT = 240;
/** Reserve space for legend above the plot so X axis isn't clipped */
const LEGEND_RESERVE_HEIGHT = 44;
/** Fixed number of Y-axis ticks; scale domain is derived from data and .nice() so data always fits */
const Y_TICKS_COUNT = 3;
/** Reserve enough space on the left so long Y-axis (category) labels are not clipped */
const HORIZONTAL_BAR_Y_AXIS_MARGIN = 80;

const PLOT_PADDING = 6;
const LINE_CHART_MARGIN_X = 24;
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
  const yScale = useLineChartYScale(LineMockData.TwoLines, 'x', plotHeight);
  return (
    <Chart.Line
      groupKey='x'
      data={LineMockData.TwoLines}
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
  const yScale = useAreaChartYScale(LineMockData.ThreeLines, 'x', plotHeight);
  return (
    <Chart.Area
      groupKey='x'
      data={LineMockData.ThreeLines}
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

          <Card
            tag='section'
            mb={4}
            style={{ width: '100%', boxSizing: 'border-box' }}
          >
            <Card.Body>
              <Flex gap={6}>
                <Flex direction='column'>
                  <Flex gap={1} alignItems='center'>
                    <Text size={200} noWrap>
                      Visibility
                    </Text>
                  </Flex>
                  <Flex alignItems='baseline' gap={1} mt={1}>
                    <Link
                      size={500}
                      color='text-large-info'
                      fontWeight='bold'
                      href='https://semrush.com'
                      target='_blank'
                    >
                      42
                    </Link>
                    <Text size={100} color='text-secondary' noWrap>
                      no change
                    </Text>
                  </Flex>
                </Flex>
                <Divider orientation='vertical' />
                <Flex direction='column'>
                  <Flex gap={1} alignItems='center'>
                    <Text size={200} noWrap>
                      Estimated traffic
                    </Text>
                  </Flex>
                  <Flex alignItems='baseline' gap={1} mt={1}>
                    <Link
                      size={500}
                      color='text-large-info'
                      fontWeight='bold'
                      href='https://semrush.com'
                      target='_blank'
                    >
                      24,765
                    </Link>
                    <Text size={100} color='text-critical' noWrap>
                      &minus;4
                    </Text>
                  </Flex>
                </Flex>
                <Divider orientation='vertical' />
                <Flex direction='column'>
                  <Flex gap={1} alignItems='center'>
                    <Text size={200} noWrap>
                      Average position
                    </Text>
                  </Flex>
                  <Flex alignItems='baseline' gap={1} mt={1}>
                    <Link
                      size={500}
                      color='text-large-info'
                      fontWeight='bold'
                      href='https://semrush.com'
                      target='_blank'
                    >
                      908
                    </Link>
                    <Text size={100} color='text-success' noWrap>
                      +12
                    </Text>
                  </Flex>
                </Flex>
              </Flex>
            </Card.Body>
          </Card>

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
                <Flex justifyContent='space-between' alignItems='flex-start' w='100%'>
                  <Box>
                    <Card.Title tag='h3'>Line</Card.Title>
                    <Card.Description>The line goes where it wants.</Card.Description>
                  </Box>
                  <Button addonLeft={FileExportM} use='secondary' theme='muted' size='m' aria-label='Export'>
                    Export
                  </Button>
                </Flex>
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
                <Flex justifyContent='space-between' alignItems='flex-start' w='100%'>
                  <Box>
                    <Card.Title tag='h3'>Area</Card.Title>
                    <Card.Description>Three layers — like a cake.</Card.Description>
                  </Box>
                  <Button addonLeft={FileExportM} use='secondary' theme='muted' size='m' aria-label='Export'>
                    Export
                  </Button>
                </Flex>
              </Card.Header>
              <Card.Body>
                <ResponsiveChartWrapper containerHeight={CHART_CONTAINER_HEIGHT}>
                  {([width, height]) => (
                    <Chart.Area
                      groupKey='x'
                      data={LineMockData.ThreeLines}
                      plotWidth={width}
                      plotHeight={height - LEGEND_RESERVE_HEIGHT}
                      yTicksCount={Y_TICKS_COUNT}
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
                <Flex justifyContent='space-between' alignItems='flex-start' w='100%'>
                  <Box>
                    <Card.Title tag='h3'>Bar</Card.Title>
                    <Card.Description>Bars grow sideways.</Card.Description>
                  </Box>
                  <Button addonLeft={FileExportM} use='secondary' theme='muted' size='m' aria-label='Export'>
                    Export
                  </Button>
                </Flex>
              </Card.Header>
              <Card.Body>
                <ResponsiveChartWrapper>
                  {([width, height]) => (
                    <BarChartHorizontal
                      data={BarMockData.Default.slice(0, 4).reverse()}
                      width={width}
                      height={height}
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
                <Flex justifyContent='space-between' alignItems='flex-start' w='100%'>
                  <Box>
                    <Card.Title tag='h3'>Donut</Card.Title>
                    <Card.Description>A donut hole put to good use.</Card.Description>
                  </Box>
                  <Button addonLeft={FileExportM} use='secondary' theme='muted' size='m' aria-label='Export'>
                    Export
                  </Button>
                </Flex>
              </Card.Header>
              <Card.Body>
                <ResponsiveChartWrapper>
                  {([width, height]) => {
                    const size = Math.min(width, height);
                    return (
                      <Box style={{ display: 'flex', justifyContent: 'flex-start' }}>
                        <Chart.Donut
                          data={DonutMockData.Default}
                          plotWidth={size}
                          plotHeight={size}
                          aria-label='Donut chart'
                          innerRadius={Math.max(20, size * 0.23)}
                        />
                      </Box>
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
                <Flex justifyContent='space-between' alignItems='flex-start' w='100%'>
                  <Box>
                    <Card.Title tag='h3'>Scatterplot</Card.Title>
                    <Card.Description>Points scattered every which way.</Card.Description>
                  </Box>
                  <Button addonLeft={FileExportM} use='secondary' theme='muted' size='m' aria-label='Export'>
                    Export
                  </Button>
                </Flex>
              </Card.Header>
              <Card.Body>
                <ResponsiveChartWrapper>
                  {([width, height]) => (
                    <Chart.ScatterPlot
                      data={ScatterplotMockData.Default}
                      groupKey='x'
                      plotWidth={width}
                      plotHeight={height}
                      yTicksCount={Y_TICKS_COUNT}
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
                  <Flex justifyContent='space-between' alignItems='center' w='100%'>
                    <Card.Title tag='h3'>Secondary DataTable</Card.Title>
                    <Button addonLeft={FileExportM} use='secondary' theme='muted' size='m' aria-label='Export'>
                      Export
                    </Button>
                  </Flex>
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
                    <Flex alignItems='center' gap={4}>
                      <Card.Title tag='h3'>Histogram</Card.Title>
                      <Pills defaultValue='incoming' size='m'>
                        <Pills.Item value='incoming'>Incoming links</Pills.Item>
                        <Pills.Item value='outgoing'>Outgoing links</Pills.Item>
                      </Pills>
                    </Flex>
                    <Button addonLeft={FileExportM} use='secondary' theme='muted' size='m' aria-label='Export'>
                      Export
                    </Button>
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
                        data={BarMockData.Default}
                        plotWidth={width}
                        plotHeight={height}
                        yTicksCount={Y_TICKS_COUNT}
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
                <Flex justifyContent='space-between' alignItems='center' w='100%'>
                  <Card.Title tag='h3'>Primary DataTable</Card.Title>
                  <Button addonLeft={FileExportM} use='secondary' theme='muted' size='m' aria-label='Export'>
                    Export
                  </Button>
                </Flex>
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
