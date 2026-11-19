import CheckM from '@semcore/icon/Check/m';
import { Box, Flex } from '@semcore/ui/base-components';
import Button from '@semcore/ui/button';
import { DataTable } from '@semcore/ui/data-table';
import type { DataTableData } from '@semcore/ui/data-table';
import type { NSLimits } from '@semcore/ui/limits';
import { LimitsOverlay } from '@semcore/ui/limits';
import { Text } from '@semcore/ui/typography';
import React from 'react';

type Props = Pick<NSLimits.Overlay.Props, 'title' | 'description' | 'headingLevel' | 'locale'> & {
  content: 'tiers' | 'features';
  showTrustLine: boolean;
  trustLineDescription: string;
  showUsage: boolean;
  usageValue: number;
  usageFeature: string;
  usageState: NonNullable<NSLimits.Overlay.Props['usage']>['state'];
  promoLabel: string;
};

const features = ['100,000 pages per audit', 'API access, SEO historical data', 'Expanded SEO + AI Search'];

const tierFeatures = {
  Base: [
    { value: '10', description: 'requests/day' },
    { value: '10', description: 'keywords/day' },
    { value: '10', description: 'backlink reports/day' },
    { value: '100', description: 'pages to crawl/month' },
  ],
  Guru: [
    { value: '300', description: 'requests/day' },
    { value: '500', description: 'keywords/day' },
    { value: '3,000', description: 'backlink reports/day' },
    { value: '100,000', description: 'pages to crawl/month' },
  ],
};

const TierFeature = ({ value, description }: { value: string; description: string }) => (
  <Text>
    <Text bold>{value}</Text> {description}
  </Text>
);

const Demo = (props: Props) => {
  const {
    title,
    description,
    headingLevel,
    locale,
    content,
    showTrustLine,
    trustLineDescription,
    showUsage,
    usageValue,
    usageFeature,
    usageState,
    promoLabel,
  } = props;

  const tiers: NSLimits.Overlay.Props['tiers'] = [
    {
      name: 'Base',
      price: { value: '$99', period: 'mo' },
      features: tierFeatures.Base.map((f, index) => <TierFeature key={index} {...f} />),
    },
    {
      name: 'Guru',
      price: { value: '$200', period: 'mo' },
      theme: 'accent',
      features: tierFeatures.Guru.map((f, index) => <TierFeature key={index} {...f} />),
      featuresMarker: <CheckM />,
      promoLabel: promoLabel || undefined,
    },
  ];

  const contentProps = content === 'tiers' ? { tiers } : { features };

  return (
    <DataTable
      data={data}
      aria-label='Limited table example'
      defaultGridTemplateColumnWidth='auto'
      wMax='800px'
      limit={{
        fromRow: 8,
        renderOverlay() {
          return (
            <LimitsOverlay
              title={title}
              description={description}
              headingLevel={headingLevel}
              locale={locale}
              primaryCta={<Button use='primary'>Start free 7-day trial</Button>}
              secondaryCta={<Button use='secondary'>View demo</Button>}
              trustLine={showTrustLine ? (trustLineDescription ? { description: trustLineDescription } : true) : undefined}
              usage={showUsage ? { value: usageValue, feature: usageFeature, state: usageState } : undefined}
              {...contentProps}
            />
          );
        },
      }}
      headerProps={{
        sticky: true,
      }}
      columns={[
        {
          name: 'keyword',
          children: 'Keyword',
        },
        {
          name: 'kd',
          children: 'KD %',
        },
        {
          name: 'cpc',
          children: 'CPC',
        },
        {
          name: 'hiddenColumn',
          children: 'Empty',
        },
        {
          name: 'vol',
          children: 'Vol.',
        },
      ]}
    />
  );
};

const data: DataTableData = [
  {
    keyword: 'ebay buy',
    kd: '77.8',
    cpc: '$1.25',
    vol: '32,500,000',
  },
  {
    keyword: 'www.ebay.com',
    kd: '11.2',
    cpc: '$3.4',
    vol: '65,457,920',
  },
  {
    keyword: 'www.ebay.com',
    kd: '10',
    cpc: '$0.65',
    vol: '47,354,640',
  },
  {
    keyword: 'ebay buy',
    kd: null,
    cpc: '$0',
    vol: 'n/a',
  },
  {
    keyword: 'ebay buy',
    kd: 75.89,
    cpc: '$0',
    vol: '21,644,290',
  },
  {
    keyword: 'ebay buy',
    kd: '77.8',
    cpc: '$1.25',
    vol: '32,500,000',
  },
  {
    keyword: 'www.ebay.com',
    kd: '11.2',
    cpc: '$3.4',
    vol: '65,457,920',
  },
  {
    keyword: 'www.ebay.com',
    kd: '10',
    cpc: '$0.65',
    vol: '47,354,640',
  },
  {
    keyword: 'ebay buy',
    kd: null,
    cpc: '$0',
    vol: 'n/a',
  },
  {
    keyword: 'ebay buy',
    kd: '75.89',
    cpc: '$0',
    vol: '21,644,290',
  },
];

export const defaultProps: Props = {
  title: 'Title',
  description: 'Description, refer to the UX Copy page for the guidelines',
  headingLevel: 3,
  locale: 'en',
  content: 'tiers',
  showTrustLine: true,
  trustLineDescription: 'Test description',
  showUsage: false,
  usageValue: 75,
  usageFeature: 'Audit',
  usageState: 'warning',
  promoLabel: 'Best for you',
};

export default Demo;
