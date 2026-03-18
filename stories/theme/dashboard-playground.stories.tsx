import BookM from '@semcore/icon/Book/m';
import Chat from '@semcore/icon/Chat/m';
import FileExportM from '@semcore/icon/FileExport/m';
import MathPlusM from '@semcore/icon/MathPlus/m';
import Congrats from '@semcore/illustration/Congrats';
import MailSent from '@semcore/illustration/MailSent';
import { Box, Flex } from '@semcore/ui/base-components';
import { LinkTrigger } from '@semcore/ui/base-trigger';
import Breadcrumbs from '@semcore/ui/breadcrumbs';
import Button, { ButtonLink } from '@semcore/ui/button';
import Card from '@semcore/ui/card';
import {
  Chart,
  ChartLegend,
  HorizontalBar,
  minMax,
  Plot,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from '@semcore/ui/d3-chart';
import { DataTable } from '@semcore/ui/data-table';
import type { DataTableData, DataTableSort } from '@semcore/ui/data-table';
import Divider from '@semcore/ui/divider';
import Link from '@semcore/ui/link';
import Pagination from '@semcore/ui/pagination';
import Pills from '@semcore/ui/pills';
import ProductHead, { Info, Title } from '@semcore/ui/product-head';
import Select from '@semcore/ui/select';
import TabLine from '@semcore/ui/tab-line';
import Tooltip, { DescriptionTooltip } from '@semcore/ui/tooltip';
import { Text } from '@semcore/ui/typography';
import { Error, NoData } from '@semcore/ui/widget-empty';
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
const primaryDataTableThemedRows: DataTableData = rowThemeStyles.map((theme, i) => ({
  theme,
  metric: String(100 - i * 15),
  value: String(250 + i * 50),
  change: `${i % 2 === 0 ? '+' : ''}${(i - 2) * 5}%`,
}));
const primaryDataTablePlainRows: DataTableData = [
  { theme: 'neutral', metric: '72', value: '520', change: '+3%' },
  { theme: 'neutral', metric: '58', value: '410', change: '-1%' },
  { theme: 'neutral', metric: '91', value: '680', change: '+7%' },
  { theme: 'neutral', metric: '44', value: '290', change: '-2%' },
  { theme: 'neutral', metric: '63', value: '395', change: '+5%' },
];
const primaryDataTableData: DataTableData = [...primaryDataTableThemedRows, ...primaryDataTablePlainRows];

const vennChartData = {
  'G': 200,
  'F': 200,
  'C': 500,
  'G/F': 100,
  'G/C': 100,
  'F/C': 100,
  'G/F/C': 100,
};
const vennChartLegendMap = {
  G: { label: 'Good' },
  F: { label: 'Fast' },
  C: { label: 'Clean' },
};

/** Stacked bar: 5 months (scaleBand = отдельные столбцы), 3 series */
const barChartData = [
  { month: 'Jan', a: 4, b: 3, c: 2 },
  { month: 'Feb', a: 5, b: 4, c: 1 },
  { month: 'Mar', a: 3, b: 5, c: 3 },
  { month: 'Apr', a: 6, b: 2, c: 4 },
  { month: 'May', a: 4, b: 4, c: 5 },
];

const barChartLegendItemIds = ['a', 'b', 'c'] as const;
const barChartColorMap = { a: 'blue-500', b: 'blue-300', c: 'blue-100' } as const;

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

type PrimaryTableRow = (typeof primaryDataTableData)[number];
function DashboardPlaygroundContent() {
  const [tabValue, setTabValue] = React.useState(1);
  const [primaryTablePage, setPrimaryTablePage] = React.useState(1);
  const [primaryTableSort, setPrimaryTableSort] = React.useState<
    DataTableSort<keyof PrimaryTableRow>
  >(['metric', 'asc']);
  const [barChartVisibleKeys, setBarChartVisibleKeys] = React.useState<
    Record<(typeof barChartLegendItemIds)[number], boolean>
  >({ a: true, b: true, c: true });
  const barChartLegendItems = React.useMemo(
    () =>
      barChartLegendItemIds.map((id) => ({
        id,
        label: id,
        checked: barChartVisibleKeys[id],
        color: barChartColorMap[id],
      })),
    [barChartVisibleKeys],
  );
  const barChartDataFiltered = React.useMemo(
    () =>
      barChartData.map((row) => {
        const out: Record<string, string | number> = { month: row.month };
        barChartLegendItemIds.forEach((key) => {
          if (barChartVisibleKeys[key]) out[key] = row[key];
        });
        return out;
      }),
    [barChartVisibleKeys],
  );
  const primaryTableSortedData = React.useMemo(
    () =>
      [...primaryDataTableData].sort((a, b) => {
        const [prop, direction] = primaryTableSort;
        const aVal = a[prop];
        const bVal = b[prop];
        if (prop === 'metric' || prop === 'value') {
          const diff = Number(aVal) - Number(bVal);
          return direction === 'asc' ? diff : -diff;
        }
        if (prop === 'change') {
          const parseChange = (s: string) => Number(String(s).replace(/[^-\d]/g, '')) || 0;
          const diff = parseChange(String(aVal)) - parseChange(String(bVal));
          return direction === 'asc' ? diff : -diff;
        }
        const cmp = String(aVal).localeCompare(String(bVal));
        return direction === 'asc' ? cmp : -cmp;
      }),
    [primaryTableSort],
  );

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

        <Box px={8} pb={30}>
          <TabLine value={tabValue} onChange={setTabValue} mb={6}>
            <TabLine.Item value={1}>Overview</TabLine.Item>
            <TabLine.Item value={2}>Analytics</TabLine.Item>
            <TabLine.Item value={3}>Reports</TabLine.Item>
          </TabLine>

          <Flex gap={4} mb={4} flexWrap style={{ width: '100%', boxSizing: 'border-box' }}>
            <Card
              tag='section'
              style={{
                flex: '1 1 calc(50% - 8px)',
                minWidth: 'min(100%, 360px)',
                maxWidth: '100%',
                boxSizing: 'border-box',
              }}
            >
              <Card.Body>
                <Flex gap={6} w='100%'>
                  <Flex direction='column' style={{ flex: 1, minWidth: 0 }}>
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
                  <Flex direction='column' style={{ flex: 1, minWidth: 0 }}>
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
                  <Flex direction='column' style={{ flex: 1, minWidth: 0 }}>
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

            <Card
              tag='section'
              style={{
                flex: '1 1 calc(50% - 8px)',
                minWidth: 'min(100%, 360px)',
                maxWidth: '100%',
                boxSizing: 'border-box',
              }}
            >
              <Card.Body>
                <Flex gap={6} w='100%'>
                  <Flex direction='column' style={{ flex: 1, minWidth: 0 }}>
                    <Flex gap={1} alignItems='center'>
                      <Text size={200} noWrap>
                        Keywords
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
                        1,284
                      </Link>
                      <Text size={100} color='text-success' noWrap>
                        +28
                      </Text>
                    </Flex>
                  </Flex>
                  <Divider orientation='vertical' />
                  <Flex direction='column' style={{ flex: 1, minWidth: 0 }}>
                    <Flex gap={1} alignItems='center'>
                      <Text size={200} noWrap>
                        Backlinks
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
                        4,521
                      </Link>
                      <Text size={100} color='text-secondary' noWrap>
                        no change
                      </Text>
                    </Flex>
                  </Flex>
                  <Divider orientation='vertical' />
                  <Flex direction='column' style={{ flex: 1, minWidth: 0 }}>
                    <Flex gap={1} alignItems='center'>
                      <Text size={200} noWrap>
                        Domain health
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
                        94
                      </Link>
                      <Text size={100} color='text-success' noWrap>
                        +2
                      </Text>
                    </Flex>
                  </Flex>
                </Flex>
              </Card.Body>
            </Card>
          </Flex>

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
                  <Button addonLeft={FileExportM} size='m' aria-label='Export'>
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
                  <Button addonLeft={FileExportM} size='m' aria-label='Export'>
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
                  <Button addonLeft={FileExportM} size='m' aria-label='Export'>
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
                  <Button addonLeft={FileExportM} size='m' aria-label='Export'>
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
                  <Button addonLeft={FileExportM} size='m' aria-label='Export'>
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
                  flex: '1 1 calc(33.333% - 11px)',
                  minWidth: 'min(100%, 280px)',
                  maxWidth: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                }}
              >
                <Card.Header>
                  <Flex justifyContent='space-between' alignItems='center' w='100%'>
                    <Card.Title tag='h3'>Secondary DataTable</Card.Title>
                    <Button addonLeft={FileExportM} size='m' aria-label='Export'>
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
                    <Button size='m'>
                      View full report
                    </Button>
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
                    <Card.Title tag='h3'>Bar</Card.Title>
                    <Button addonLeft={FileExportM} size='m' aria-label='Export'>
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
                  <Flex direction='column' w='100%'>
                    <Flex justifyContent='space-between' alignItems='center' w='100%' mb={2}>
                      <ChartLegend
                        items={barChartLegendItems}
                        aria-label='Bar chart legend'
                        onChangeVisibleItem={(key, checked) => setBarChartVisibleKeys((prev) => ({ ...prev, [key]: checked }))}
                      />
                      <Pills defaultValue='incoming' size='m'>
                        <Pills.Item value='incoming'>Incoming links</Pills.Item>
                        <Pills.Item value='outgoing'>Outgoing links</Pills.Item>
                      </Pills>
                    </Flex>
                    <ResponsiveChartWrapper containerHeight={CHART_CONTAINER_HEIGHT}>
                      {([width, height]) => (
                        <Chart.Bar
                          groupKey='month'
                          data={barChartDataFiltered}
                          plotWidth={width}
                          plotHeight={height}
                          type='stack'
                          showLegend={false}
                          yTicksCount={Y_TICKS_COUNT}
                          colorMap={barChartColorMap}
                          aria-label='Bar chart'
                        />
                      )}
                    </ResponsiveChartWrapper>
                  </Flex>
                  <Box mt='auto' pt={3} ml={5} style={{ alignSelf: 'flex-start' }}>
                    <Button size='m'>
                      View full report
                    </Button>
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
                    <Card.Title tag='h3'>Venn</Card.Title>
                    <Button addonLeft={FileExportM} size='m' aria-label='Export'>
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
                  <ResponsiveChartWrapper containerHeight={CHART_CONTAINER_HEIGHT}>
                    {([width, height]) => {
                      const size = Math.min(width, height);
                      return (
                        <Box style={{ display: 'flex', justifyContent: 'center' }}>
                          <Chart.Venn
                            data={vennChartData}
                            plotWidth={size}
                            plotHeight={size}
                            legendProps={{ legendMap: vennChartLegendMap }}
                            showLegend
                            aria-label='Venn chart'
                          />
                        </Box>
                      );
                    }}
                  </ResponsiveChartWrapper>
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
                  <Button addonLeft={FileExportM} size='m' aria-label='Export'>
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
                    data={primaryTableSortedData}
                    sort={primaryTableSort}
                    onSortChange={setPrimaryTableSort}
                    aria-label='Primary table with themed rows'
                    w='100%'
                    defaultGridTemplateColumnWidth='minmax(80px, 1fr)'
                    columns={[
                      {
                        name: 'theme',
                        children: 'Theme',
                        gtcWidth: 'minmax(120px, 1fr)',
                        sortable: true,
                        changeSortSize: true,
                      },
                      {
                        name: 'metric',
                        children: 'Metric',
                        gtcWidth: 'minmax(85px, 1fr)',
                        justifyContent: 'end',
                        sortable: true,
                        changeSortSize: true,
                      },
                      {
                        name: 'value',
                        children: 'Value',
                        gtcWidth: 'minmax(85px, 1fr)',
                        justifyContent: 'end',
                        sortable: true,
                        changeSortSize: true,
                      },
                      {
                        name: 'change',
                        children: 'Change',
                        gtcWidth: 'minmax(90px, 1fr)',
                        justifyContent: 'end',
                        sortable: true,
                        changeSortSize: true,
                      },
                    ]}
                    rowProps={(row) =>
                      rowThemeStyles.includes(row.theme as (typeof rowThemeStyles)[number])
                        ? { theme: row.theme as (typeof rowThemeStyles)[number] }
                        : {}}
                  />
                </Box>
                <Box pt={3} px={5} pb={4}>
                  <Pagination
                    totalPages={10}
                    currentPage={primaryTablePage}
                    onCurrentPageChange={setPrimaryTablePage}
                    aria-label='Pagination'
                  />
                </Box>
              </Card.Body>
            </Card>

            <Card
              tag='section'
              style={{
                flex: '1 1 calc(50% - 8px)',
                minWidth: 'min(100%, 320px)',
                maxWidth: '100%',
              }}
            >
              <Card.Header>
                <Card.Title tag='h3'>WidgetEmpty</Card.Title>
              </Card.Header>
              <Card.Body>
                <NoData />
              </Card.Body>
            </Card>
            <Card
              tag='section'
              style={{
                flex: '1 1 calc(50% - 8px)',
                minWidth: 'min(100%, 320px)',
                maxWidth: '100%',
              }}
            >
              <Card.Header>
                <Card.Title tag='h3'>WidgetEmpty</Card.Title>
              </Card.Header>
              <Card.Body>
                <Error />
              </Card.Body>
            </Card>
            <Card
              tag='section'
              style={{
                flex: '1 1 calc(50% - 8px)',
                minWidth: 'min(100%, 320px)',
                maxWidth: '100%',
              }}
            >
              <Card.Header>
                <Card.Title tag='h3'>Illustration</Card.Title>
              </Card.Header>
              <Card.Body>
                <Flex gap={4} direction='row'>
                  <MailSent />
                  <MailSent primaryColor='illustration-salad' />
                  <MailSent primaryColor='illustration-blue' />
                  <MailSent primaryColor='illustration-orange' />
                  <Congrats primaryColor='illustration-red' secondaryColor='gray-800' />
                  <Congrats primaryColor='illustration-pink' secondaryColor='gray-800' />
                  <Congrats primaryColor='illustration-violet' secondaryColor='gray-800' />
                  <Congrats primaryColor='illustration-yellow' secondaryColor='gray-800' />
                </Flex>
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
