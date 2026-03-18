import BookM from '@semcore/icon/Book/m';
import Chat from '@semcore/icon/Chat/m';
import FileExportM from '@semcore/icon/FileExport/m';
import NotificationM from '@semcore/icon/Notification/m';
import SearchM from '@semcore/icon/Search/m';
import ShareM from '@semcore/icon/Share/m';
import { Box, Flex } from '@semcore/ui/base-components';
import { FilterTrigger, LinkTrigger } from '@semcore/ui/base-trigger';
import Breadcrumbs from '@semcore/ui/breadcrumbs';
import Button from '@semcore/ui/button';
import Card from '@semcore/ui/card';
import Checkbox from '@semcore/ui/checkbox';
import {
  Chart,
  ResponsiveContainer,
} from '@semcore/ui/d3-chart';
import { DateRangePicker } from '@semcore/ui/date-picker';
import Divider from '@semcore/ui/divider';
import Input from '@semcore/ui/input';
import Link from '@semcore/ui/link';
import Pills from '@semcore/ui/pills';
import ProductHead, { Info, Title } from '@semcore/ui/product-head';
import Select from '@semcore/ui/select';
import Switch from '@semcore/ui/switch';
import TabLine from '@semcore/ui/tab-line';
import Tag from '@semcore/ui/tag';
import { Text } from '@semcore/ui/typography';
import type { Meta, StoryObj } from '@storybook/react-vite';
import React from 'react';

import { ThemePlaygroundLayout, ThemeSwitcherDropdown } from './theme-playground-switcher';
import './theme-playground-fonts.css';

const LAZZER_FONT = '\'Lazzer\', sans-serif';

const meta: Meta = {
  title: 'Theme/Position Tracking Playground',
};

export default meta;

type Story = StoryObj;

const formatXDate = (value: Date) =>
  `${value.toLocaleDateString('en-US', { month: 'short' })} ${value.getDate()}`;

/** Visibility data: dates from Feb 17 to Mar 17, five domains in % (0–0.02). Use Date for x-scale. */
const visibilityChartData = [
  { date: new Date(2026, 1, 17), servicetitan: 0.008, thriveagency: 0.005, domain3: 0.004, domain4: 0.011, domain5: 0.007 },
  { date: new Date(2026, 1, 19), servicetitan: 0.006, thriveagency: 0.012, domain3: 0.009, domain4: 0.006, domain5: 0.014 },
  { date: new Date(2026, 1, 21), servicetitan: 0.01, thriveagency: 0.008, domain3: 0.013, domain4: 0.01, domain5: 0.005 },
  { date: new Date(2026, 1, 24), servicetitan: 0.007, thriveagency: 0.015, domain3: 0.011, domain4: 0.008, domain5: 0.012 },
  { date: new Date(2026, 1, 26), servicetitan: 0.009, thriveagency: 0.01, domain3: 0.006, domain4: 0.014, domain5: 0.009 },
  { date: new Date(2026, 1, 28), servicetitan: 0.008, thriveagency: 0.018, domain3: 0.012, domain4: 0.007, domain5: 0.016 },
  { date: new Date(2026, 2, 3), servicetitan: 0.01, thriveagency: 0.012, domain3: 0.015, domain4: 0.009, domain5: 0.011 },
  { date: new Date(2026, 2, 5), servicetitan: 0.009, thriveagency: 0.016, domain3: 0.008, domain4: 0.013, domain5: 0.01 },
  { date: new Date(2026, 2, 7), servicetitan: 0.008, thriveagency: 0.014, domain3: 0.01, domain4: 0.011, domain5: 0.017 },
  { date: new Date(2026, 2, 10), servicetitan: 0.01, thriveagency: 0.02, domain3: 0.014, domain4: 0.008, domain5: 0.015 },
  { date: new Date(2026, 2, 12), servicetitan: 0.009, thriveagency: 0.017, domain3: 0.012, domain4: 0.016, domain5: 0.008 },
  { date: new Date(2026, 2, 14), servicetitan: 0.01, thriveagency: 0.019, domain3: 0.007, domain4: 0.014, domain5: 0.013 },
  { date: new Date(2026, 2, 17), servicetitan: 0.01, thriveagency: 0.02, domain3: 0.015, domain4: 0.012, domain5: 0.018 },
];

const CHART_HEIGHT = 280;
const Y_TICKS = 3;

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

function PositionTrackingContent() {
  const [mainTab, setMainTab] = React.useState(2);
  const [pills1, setPills1] = React.useState('competitive');
  const [pills2, setPills2] = React.useState('sov');
  const [shareOfVoice, setShareOfVoice] = React.useState(false);
  const [dateRange, setDateRange] = React.useState<[Date, Date]>([
    new Date(2026, 2, 11),
    new Date(2026, 2, 17),
  ]);
  const [domain1, setDomain1] = React.useState<string | undefined>('servicetitan.com');
  const [domain2, setDomain2] = React.useState<string | undefined>('thriveagency.com');
  const [domain3, setDomain3] = React.useState<string | undefined>('domain3.com');
  const [domain4, setDomain4] = React.useState<string | undefined>('domain4.com');
  const [domain5, setDomain5] = React.useState<string | undefined>('domain5.com');
  const domainOptions = [
    { value: 'servicetitan.com', label: 'servicetitan.com', children: 'servicetitan.com' },
    { value: 'thriveagency.com', label: 'thriveagency.com', children: 'thriveagency.com' },
    { value: 'domain3.com', label: 'domain3.com', children: 'domain3.com' },
    { value: 'domain4.com', label: 'domain4.com', children: 'domain4.com' },
    { value: 'domain5.com', label: 'domain5.com', children: 'domain5.com' },
  ];
  const handleDateRangeChange = React.useCallback((dates: Date[]) => {
    if (dates.length === 2) setDateRange([dates[0], dates[1]]);
  }, []);

  return (
    <ThemePlaygroundLayout switcherVariant='inline'>
      <Box
        style={{
          background: 'var(--intergalactic-bg-secondary-neutral)',
          minHeight: '100vh',
          borderRadius: 12,
        }}
      >
        <ProductHead mx={8} pt={4}>
          <ProductHead.Row>
            <Breadcrumbs>
              <Breadcrumbs.Item href='#'>Home</Breadcrumbs.Item>
              <Breadcrumbs.Item href='#'>SEO</Breadcrumbs.Item>
              <Breadcrumbs.Item href='#' active>
                Position Tracking
              </Breadcrumbs.Item>
            </Breadcrumbs>
            <ProductHead.Links>
              <Link addonLeft={BookM}>
                User manual
              </Link>
              <Link addonLeft={Chat}>
                Send feedback
              </Link>
            </ProductHead.Links>
          </ProductHead.Row>

          <ProductHead.Row>
            <Title toolName='Position Tracking:'>
              <Select
                defaultValue='1seo'
                tag={LinkTrigger}
                options={[{ value: '1seo', label: '1seo', children: '1seo' }]}
              />
            </Title>
            <ProductHead.Buttons>
              <Button size='m'>
                Looker Studio
              </Button>
              <Button size='m'>
                PDF
              </Button>
              <Button size='m' addonLeft={FileExportM}>
                Export
              </Button>
              <Button size='m' addonLeft={ShareM}>
                Share
              </Button>
              <Button size='m' aria-label='Notifications'>
                <NotificationM />
              </Button>
              <ThemeSwitcherDropdown triggerProps={{ size: 'm' }} />
            </ProductHead.Buttons>
          </ProductHead.Row>

          <ProductHead.Row>
            <Info>
              <Info.Item>
                <Select
                  defaultValue='us-google'
                  tag={LinkTrigger}
                  options={[
                    { value: 'us-google', label: 'United States (Google)', children: 'United States (Google)' },
                  ]}
                />
              </Info.Item>
              <Info.Item>
                <Select
                  defaultValue='en'
                  tag={LinkTrigger}
                  options={[{ value: 'en', label: 'English', children: 'English' }]}
                />
              </Info.Item>
              <Info.Item label='Updated:'>
                <Text size={200} color='text-secondary'>19 hours ago</Text>
              </Info.Item>
              <Info.Item>
                <Text size={200} color='text-secondary'>Keywords:</Text>
                <Button tag='a' href='#' use='tertiary' theme='muted' size='m' ml={1}>
                  <Text size={200} color='text-primary' fontWeight='semibold'>5065</Text>
                </Button>
              </Info.Item>
              <Info.Item>
                <Text size={200} color='text-secondary'>Competitors:</Text>
                <Button tag='a' href='#' use='tertiary' theme='muted' size='m' ml={1}>
                  <Text size={200} color='text-primary' fontWeight='semibold'>4</Text>
                </Button>
              </Info.Item>
              <Info.Item>
                <Select
                  defaultValue='serp'
                  tag={LinkTrigger}
                  placeholder='SERP features'
                  options={[{ value: 'serp', label: 'SERP features', children: 'SERP features' }]}
                />
              </Info.Item>
              <Info.Item>
                <Flex alignItems='center' gap={2}>
                  <Text size={200} color='text-secondary'>Share of Voice</Text>
                  <Switch size='m'>
                    <Switch.Value checked={shareOfVoice} onChange={setShareOfVoice} />
                  </Switch>
                </Flex>
              </Info.Item>
            </Info>
          </ProductHead.Row>
        </ProductHead>

        <Box px={8} pb={30}>
          <TabLine value={mainTab} onChange={setMainTab} mb={6}>
            <TabLine.Item value={1}>Landscape</TabLine.Item>
            <TabLine.Item value={2}>Overview</TabLine.Item>
            <TabLine.Item value={3}>Rankings Distribution</TabLine.Item>
            <TabLine.Item value={4}>Tags</TabLine.Item>
            <TabLine.Item value={5}>Pages</TabLine.Item>
            <TabLine.Item value={6}>Cannibalization</TabLine.Item>
            <TabLine.Item value={7}>Competitors Discovery</TabLine.Item>
            <TabLine.Item value={8}>Devices & Locations</TabLine.Item>
            <TabLine.Item value={9}>Featured Snippets</TabLine.Item>
          </TabLine>

          <Flex gap={2} flexWrap alignItems='center' mb={2}>
            <Select
              value={domain1}
              onChange={(v: string) => setDomain1(v)}
            >
              <Select.Trigger
                tag={FilterTrigger}
                placeholder='Add domain'
                empty={!domain1}
                onClear={() => setDomain1(undefined)}
              />
              <Select.Menu aria-label='Add domain'>
                {domainOptions.map((opt) => (
                  <Select.Option key={opt.value} value={opt.value}>
                    {opt.label}
                  </Select.Option>
                ))}
              </Select.Menu>
            </Select>
            <Select
              value={domain2}
              onChange={(v: string) => setDomain2(v)}
            >
              <Select.Trigger
                tag={FilterTrigger}
                placeholder='Add domain'
                empty={!domain2}
                onClear={() => setDomain2(undefined)}
              />
              <Select.Menu aria-label='Add domain'>
                {domainOptions.map((opt) => (
                  <Select.Option key={opt.value} value={opt.value}>
                    {opt.label}
                  </Select.Option>
                ))}
              </Select.Menu>
            </Select>
            <Select
              value={domain3}
              onChange={(v: string) => setDomain3(v)}
            >
              <Select.Trigger
                tag={FilterTrigger}
                placeholder='Add domain'
                empty={!domain3}
                onClear={() => setDomain3(undefined)}
              />
              <Select.Menu aria-label='Add domain'>
                {domainOptions.map((opt) => (
                  <Select.Option key={opt.value} value={opt.value}>
                    {opt.label}
                  </Select.Option>
                ))}
              </Select.Menu>
            </Select>
            <Select
              value={domain4}
              onChange={(v: string) => setDomain4(v)}
            >
              <Select.Trigger
                tag={FilterTrigger}
                placeholder='Add domain'
                empty={!domain4}
                onClear={() => setDomain4(undefined)}
              />
              <Select.Menu aria-label='Add domain'>
                {domainOptions.map((opt) => (
                  <Select.Option key={opt.value} value={opt.value}>
                    {opt.label}
                  </Select.Option>
                ))}
              </Select.Menu>
            </Select>
            <Select
              value={domain5}
              onChange={(v: string) => setDomain5(v)}
            >
              <Select.Trigger
                tag={FilterTrigger}
                placeholder='Add domain'
                empty={!domain5}
                onClear={() => setDomain5(undefined)}
              />
              <Select.Menu aria-label='Add domain'>
                {domainOptions.map((opt) => (
                  <Select.Option key={opt.value} value={opt.value}>
                    {opt.label}
                  </Select.Option>
                ))}
              </Select.Menu>
            </Select>
            <Select placeholder='Add domain' options={[]} />
            <Box style={{ marginLeft: 'auto' }}>
              <DateRangePicker value={dateRange} onChange={handleDateRangeChange}>
                <DateRangePicker.Trigger id='position-tracking-date-range' />
                <DateRangePicker.Popper />
              </DateRangePicker>
            </Box>
          </Flex>

          <Flex gap={2} flexWrap alignItems='center' mb={6}>
            <Flex alignItems='center'>
              <Input size='m' w={220} neighborLocation='right'>
                <Input.Value placeholder='Filter by keyword' />
              </Input>
              <Button size='m' aria-label='Search' neighborLocation='left'>
                <SearchM />
              </Button>
            </Flex>
            <Select
              placeholder='Top positions & changes'
              options={[{ value: 'top', label: 'Top positions & changes', children: 'Top positions & changes' }]}
            />
            <Select
              placeholder='SERP Features'
              options={[{ value: 'serp', label: 'SERP Features', children: 'SERP Features' }]}
            />
            <Select
              placeholder='Tags'
              options={[{ value: 'tags', label: 'Tags', children: 'Tags' }]}
            />
            <Select
              placeholder='Intent'
              options={[{ value: 'intent', label: 'Intent', children: 'Intent' }]}
            />
            <Select
              placeholder='Volume'
              options={[{ value: 'vol', label: 'Volume', children: 'Volume' }]}
            />
            <Select
              placeholder='KD %'
              options={[{ value: 'kd', label: 'KD %', children: 'KD %' }]}
            />
            <Select placeholder='Advanced filters' options={[]} />
          </Flex>

          <Card tag='section'>
            <Card.Header>
              <Flex justifyContent='space-between' alignItems='center' w='100%' flexWrap>
                <Flex gap={2} alignItems='center'>
                  <Pills value={pills1} onChange={setPills1}>
                    <Pills.Item value='competitive'>Competitive Analysis</Pills.Item>
                    <Pills.Item value='growth'>Potential Growth</Pills.Item>
                  </Pills>
                  <Pills value={pills2} onChange={setPills2}>
                    <Pills.Item value='sov'>Share of Voice</Pills.Item>
                    <Pills.Item value='visibility'>Visibility</Pills.Item>
                    <Pills.Item value='traffic'>Est. Traffic</Pills.Item>
                    <Pills.Item value='position'>Avg. Position</Pills.Item>
                  </Pills>
                </Flex>
                <Flex gap={2} alignItems='center'>
                  <Checkbox defaultChecked label='Smart zoom' />
                  <Divider orientation='vertical' h={24} />
                  <Select
                    tag={LinkTrigger}
                    placeholder='Notes'
                    options={[]}
                    color='text-primary'
                  />
                </Flex>
              </Flex>
            </Card.Header>
            <Card.Body>
              <Flex gap={8} mb={6} flexWrap alignItems='flex-start'>
                <Box>
                  <Text size={200} color='text-secondary'>servicetitan.com</Text>
                  <Flex alignItems='baseline' gap={1} mt={1}>
                    <Text size={500} fontWeight='bold' color='text-primary'>0.01%</Text>
                    <Text size={100} color='text-secondary'>0</Text>
                  </Flex>
                </Box>
                <Divider orientation='vertical' h={40} />
                <Box>
                  <Text size={200} color='text-secondary'>thriveagency.com</Text>
                  <Flex alignItems='baseline' gap={1} mt={1}>
                    <Text size={500} fontWeight='bold' color='text-primary'>0.02%</Text>
                    <Text size={100} color='text-success'>+0.02</Text>
                  </Flex>
                </Box>
                <Divider orientation='vertical' h={40} />
                <Box>
                  <Text size={200} color='text-secondary'>domain3.com</Text>
                  <Flex alignItems='baseline' gap={1} mt={1}>
                    <Text size={500} fontWeight='bold' color='text-primary'>0.015%</Text>
                    <Text size={100} color='text-success'>+0.01</Text>
                  </Flex>
                </Box>
                <Divider orientation='vertical' h={40} />
                <Box>
                  <Text size={200} color='text-secondary'>domain4.com</Text>
                  <Flex alignItems='baseline' gap={1} mt={1}>
                    <Text size={500} fontWeight='bold' color='text-primary'>0.012%</Text>
                    <Text size={100} color='text-secondary'>0</Text>
                  </Flex>
                </Box>
                <Divider orientation='vertical' h={40} />
                <Box>
                  <Text size={200} color='text-secondary'>domain5.com</Text>
                  <Flex alignItems='baseline' gap={1} mt={1}>
                    <Text size={500} fontWeight='bold' color='text-primary'>0.018%</Text>
                    <Text size={100} color='text-success'>+0.01</Text>
                  </Flex>
                </Box>
              </Flex>
              <ResponsiveChartWrapper containerHeight={CHART_HEIGHT}>
                {([width, height]) => (
                  <Chart.Line
                    groupKey='date'
                    data={visibilityChartData}
                    plotWidth={width}
                    plotHeight={height - 40}
                    yTicksCount={Y_TICKS}
                    marginY={48}
                    axisXValueFormatter={(value) => formatXDate(value as Date)}
                    showDots
                    aria-label='Visibility over time'
                  />
                )}
              </ResponsiveChartWrapper>
            </Card.Body>
          </Card>
        </Box>
      </Box>
    </ThemePlaygroundLayout>
  );
}

export const Default: Story = {
  render: () => <PositionTrackingContent />,
};
