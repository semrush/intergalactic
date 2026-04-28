import { Flex } from '@semcore/ui/base-components';
import type { DataTableSort } from '@semcore/ui/data-table';
import { DataTable } from '@semcore/ui/data-table';
import Link from '@semcore/ui/link';
import { Text } from '@semcore/ui/typography';
import React, { useCallback } from 'react';

type SortableColumn = 'siteHealth' | 'errors' | 'warnings' | 'notices' | 'crawled' | 'score' | 'performance';
type ColumnName = keyof (typeof data)[0];

const VIEW_STATES = {
  JUST_ADDED_FIRST_COLLECT: 'just_added_first_collect',
  DEFAULT: 'default',
} as const;

type ViewState = (typeof VIEW_STATES)[keyof typeof VIEW_STATES];

type Campaign = {
  id: number;
  name: string;
  domain: string;
  dataViewState: ViewState;
  siteHealth: number | null;
  siteHealthDelta: number | null;
  errors: number | null;
  errorsDelta: number | null;
  warnings: number | null;
  warningsDelta: number | null;
  notices: number | null;
  noticesDelta: number | null;
  crawled: number | null;
  score: number | null;
  lastAudit: string | null;
  performance: string | null;
  status: string;
};

const columns = [
  {
    name: 'name',
    children: 'Project',
    gtcWidth: 'minmax(150px, auto)',
    fixed: 'left' as const,
  },
  {
    name: 'siteHealth',
    children: 'Site Health',
    gtcWidth: 'minmax(100px, 130px)',
    sortable: true,
    justifyContent: 'end' as const,
  },
  {
    name: 'errors',
    children: 'Errors',
    gtcWidth: 'minmax(80px, 110px)',
    sortable: true,
    justifyContent: 'end' as const,
  },
  {
    name: 'warnings',
    children: 'Warnings',
    gtcWidth: 'minmax(90px, 120px)',
    sortable: true,
    justifyContent: 'end' as const,
  },
  {
    name: 'notices',
    children: 'Notices',
    gtcWidth: 'minmax(80px, 110px)',
    sortable: true,
    justifyContent: 'end' as const,
  },
  {
    name: 'crawled',
    children: 'Crawled pages',
    gtcWidth: 'minmax(110px, 140px)',
    sortable: true,
    justifyContent: 'end' as const,
  },
  {
    name: 'score',
    children: 'Score',
    gtcWidth: 'minmax(80px, 100px)',
    sortable: true,
    justifyContent: 'end' as const,
  },
  {
    name: 'lastAudit',
    children: 'Last audit',
    gtcWidth: 'minmax(120px, 160px)',
    justifyContent: 'end' as const,
  },
  {
    name: 'performance',
    children: 'Site Performance',
    gtcWidth: '300px',
    sortable: true,
    justifyContent: 'end' as const,
  },
  {
    name: 'status',
    children: 'Status',
    gtcWidth: '110px',
  },
];

const renderCell: React.ComponentProps<typeof DataTable>['renderCell'] = ({
  dataKey,
  row,
  defaultRender,
}) => {
  const typedRow = row as unknown as Campaign;

  if (dataKey === 'siteHealth' || dataKey === 'errors' || dataKey === 'warnings' || dataKey === 'notices') {
    const valueMap: Record<string, number | null> = {
      siteHealth: typedRow.siteHealth,
      errors: typedRow.errors,
      warnings: typedRow.warnings,
      notices: typedRow.notices,
    };
    const deltaMap: Record<string, number | null> = {
      siteHealth: typedRow.siteHealthDelta,
      errors: typedRow.errorsDelta,
      warnings: typedRow.warningsDelta,
      notices: typedRow.noticesDelta,
    };
    const value = valueMap[dataKey as string];
    const delta = deltaMap[dataKey as string];

    if (value === null) return defaultRender();

    const suffix = dataKey === 'siteHealth' ? '%' : '';
    const deltaStr = delta === null
      ? null
      : delta === 0
        ? `0${suffix}`
        : `${delta > 0 ? '+' : ''}${delta}${suffix}`;

    return {
      children: (
        <Flex direction='column' style={{ alignItems: 'flex-end' }}>
          <Link
            href={`#campaign-${typedRow.id}`}
            noWrap
            aria-label={`${dataKey} is ${value}${suffix}, open details`}
            data-test-id='cell-score-link'
          >
            {value}{suffix}
          </Link>
          {deltaStr !== null && (
            <Text
              color='var(--intergalactic-text-secondary, #6c6e79)'
              data-test-id='cell-score-delta'
            >
              {deltaStr}
            </Text>
          )}
        </Flex>
      ),
    };
  }

  if (dataKey === 'name') {
    return {
      children: (
        <Flex direction='column' gap={2} w='100%'>
          <Link
            href={`#campaign-${typedRow.id}`}
            bold
            w='100%'
            aria-label={`Open ${typedRow.domain} campaign`}
            data-test-id='link-to-campaign-review'
          >
            <Link.Text ellipsis hint={false} w='100%'>
              {typedRow.name}
            </Link.Text>
          </Link>
          <Text use='secondary' size={200} ellipsis hint={false} data-test-id='domain-name'>
            {typedRow.domain}
          </Text>
        </Flex>
      ),
    };
  }

  return defaultRender();
};

const Demo = () => {
  const [sort, setSort] = React.useState<DataTableSort<ColumnName>>(['siteHealth', 'desc']);

  const handleSort = useCallback(
    (nextSort: DataTableSort<ColumnName>) => {
      setSort(nextSort);
    },
    [setSort],
  );

  const sortedData = React.useMemo(
    () =>
      [...data].sort((aRow, bRow) => {
        const [prop, sortDirection] = sort;
        const a = aRow[prop as SortableColumn] ?? -Infinity;
        const b = bRow[prop as SortableColumn] ?? -Infinity;
        if (a === b) return 0;
        if (sortDirection === 'asc') return a > b ? 1 : -1;
        return a > b ? -1 : 1;
      }),
    [sort],
  );

  return (
    <DataTable
      data={sortedData}
      headerProps={{
        sticky: true,
        top: 0,
        withScrollBar: true,
      }}
      sideIndents='wide'
      defaultGridTemplateColumnWidth='max-content'
      columns={columns}
      sort={sort}
      onSortChange={handleSort}
      rowProps={(row) => ({
        'theme': row.dataViewState === VIEW_STATES.JUST_ADDED_FIRST_COLLECT ? 'success' : undefined,
        'data-test-id': row.id,
      })}
      renderCell={renderCell}
      w='calc(100vw - 3rem)'
      id='campaigns-list-table'
      data-test-id='campaigns-list-table'
      aria-label='Campaigns list'
    />
  );
};

const data: Campaign[] = [
  { id: 1, name: 'Nike brand campaign', domain: 'nike.com', dataViewState: VIEW_STATES.JUST_ADDED_FIRST_COLLECT, siteHealth: 96, siteHealthDelta: 0, errors: 12, errorsDelta: -3, warnings: 340, warningsDelta: null, notices: 1200, noticesDelta: null, crawled: 8420, score: 94, lastAudit: '2 hours ago', performance: 'Fast loading, good Core Web Vitals, mobile-friendly', status: 'Active' },
  { id: 2, name: 'Adidas running shoes', domain: 'adidas.com', dataViewState: VIEW_STATES.DEFAULT, siteHealth: 88, siteHealthDelta: -2, errors: 45, errorsDelta: 5, warnings: 820, warningsDelta: null, notices: 2100, noticesDelta: null, crawled: 12300, score: 81, lastAudit: '5 hours ago', performance: 'Moderate speed, LCP issues on product pages', status: 'Active' },
  { id: 3, name: 'Apple iPhone 15', domain: 'apple.com', dataViewState: VIEW_STATES.DEFAULT, siteHealth: 99, siteHealthDelta: 1, errors: 2, errorsDelta: 0, warnings: 58, warningsDelta: null, notices: 310, noticesDelta: null, crawled: 54200, score: 98, lastAudit: '1 day ago', performance: 'Excellent performance across all devices and regions', status: 'Active' },
  { id: 4, name: 'Samsung Galaxy S24', domain: 'samsung.com', dataViewState: VIEW_STATES.DEFAULT, siteHealth: 91, siteHealthDelta: null, errors: 31, errorsDelta: null, warnings: 610, warningsDelta: null, notices: 1780, noticesDelta: null, crawled: 33100, score: 87, lastAudit: '3 hours ago', performance: 'Good overall, minor CLS issues on mobile layout', status: 'Paused' },
  { id: 5, name: 'Amazon Prime deals', domain: 'amazon.com', dataViewState: VIEW_STATES.DEFAULT, siteHealth: 78, siteHealthDelta: -5, errors: 124, errorsDelta: 12, warnings: 2400, warningsDelta: null, notices: 8900, noticesDelta: null, crawled: 210000, score: 72, lastAudit: '30 min ago', performance: 'Slow TTFB on deal pages, needs CDN optimization', status: 'Active' },
  { id: 6, name: 'Netflix subscription offer', domain: 'netflix.com', dataViewState: VIEW_STATES.DEFAULT, siteHealth: 94, siteHealthDelta: 3, errors: 18, errorsDelta: -7, warnings: 290, warningsDelta: null, notices: 940, noticesDelta: null, crawled: 7600, score: 91, lastAudit: '6 hours ago', performance: 'Good performance, video assets well-optimized', status: 'Active' },
  { id: 7, name: 'Spotify premium trial', domain: 'spotify.com', dataViewState: VIEW_STATES.DEFAULT, siteHealth: 97, siteHealthDelta: 0, errors: 7, errorsDelta: 0, warnings: 140, warningsDelta: null, notices: 520, noticesDelta: null, crawled: 9800, score: 95, lastAudit: '2 days ago', performance: 'Fast and responsive, excellent mobile experience', status: 'Active' },
  { id: 8, name: 'Tesla Model 3 promo', domain: 'tesla.com', dataViewState: VIEW_STATES.JUST_ADDED_FIRST_COLLECT, siteHealth: null, siteHealthDelta: null, errors: null, errorsDelta: null, warnings: null, warningsDelta: null, notices: null, noticesDelta: null, crawled: null, score: null, lastAudit: null, performance: null, status: 'Active' },
  { id: 9, name: 'Microsoft Office 365', domain: 'microsoft.com', dataViewState: VIEW_STATES.DEFAULT, siteHealth: 85, siteHealthDelta: -1, errors: 67, errorsDelta: 8, warnings: 1100, warningsDelta: null, notices: 3400, noticesDelta: null, crawled: 44000, score: 82, lastAudit: '4 hours ago', performance: 'Average speed, login page has high blocking time', status: 'Active' },
  { id: 10, name: 'Google Workspace', domain: 'google.com', dataViewState: VIEW_STATES.DEFAULT, siteHealth: 98, siteHealthDelta: 0, errors: 4, errorsDelta: -1, warnings: 71, warningsDelta: null, notices: 280, noticesDelta: null, crawled: 61000, score: 97, lastAudit: '1 hour ago', performance: 'Near-perfect scores across all Core Web Vitals', status: 'Paused' },
  { id: 11, name: 'Airbnb summer campaign', domain: 'airbnb.com', dataViewState: VIEW_STATES.DEFAULT, siteHealth: 82, siteHealthDelta: null, errors: 88, errorsDelta: null, warnings: 1340, warningsDelta: null, notices: 4200, noticesDelta: null, crawled: 31000, score: 78, lastAudit: '8 hours ago', performance: 'Map and image-heavy pages slow on mobile networks', status: 'Active' },
  { id: 12, name: 'Booking.com hotels', domain: 'booking.com', dataViewState: VIEW_STATES.DEFAULT, siteHealth: 79, siteHealthDelta: -3, errors: 102, errorsDelta: 15, warnings: 1890, warningsDelta: null, notices: 5600, noticesDelta: null, crawled: 29500, score: 75, lastAudit: '12 hours ago', performance: 'Heavy search result pages, LCP above threshold', status: 'Active' },
  { id: 13, name: 'Uber rides promo', domain: 'uber.com', dataViewState: VIEW_STATES.DEFAULT, siteHealth: 93, siteHealthDelta: 2, errors: 21, errorsDelta: -4, warnings: 380, warningsDelta: null, notices: 1100, noticesDelta: null, crawled: 18200, score: 90, lastAudit: '3 hours ago', performance: 'Good performance, fast interactive time on landing', status: 'Active' },
  { id: 14, name: 'LinkedIn premium', domain: 'linkedin.com', dataViewState: VIEW_STATES.DEFAULT, siteHealth: 90, siteHealthDelta: 0, errors: 35, errorsDelta: 0, warnings: 670, warningsDelta: null, notices: 2000, noticesDelta: null, crawled: 12400, score: 86, lastAudit: '1 day ago', performance: 'Feed pages slow due to dynamic content loading', status: 'Active' },
  { id: 15, name: 'Shopify store builder', domain: 'shopify.com', dataViewState: VIEW_STATES.DEFAULT, siteHealth: 95, siteHealthDelta: 1, errors: 14, errorsDelta: -2, warnings: 220, warningsDelta: null, notices: 760, noticesDelta: null, crawled: 8700, score: 93, lastAudit: '5 hours ago', performance: 'Strong performance, template pages well-cached', status: 'Paused' },
  { id: 16, name: 'Twitter ads brand', domain: 'twitter.com', dataViewState: VIEW_STATES.DEFAULT, siteHealth: 87, siteHealthDelta: null, errors: 52, errorsDelta: null, warnings: 940, warningsDelta: null, notices: 2800, noticesDelta: null, crawled: 11300, score: 83, lastAudit: '7 hours ago', performance: 'Timeline rendering causes high TBT on some devices', status: 'Active' },
  { id: 17, name: 'YouTube pre-roll', domain: 'youtube.com', dataViewState: VIEW_STATES.DEFAULT, siteHealth: 92, siteHealthDelta: -1, errors: 28, errorsDelta: 3, warnings: 510, warningsDelta: null, notices: 1600, noticesDelta: null, crawled: 73000, score: 89, lastAudit: '2 hours ago', performance: 'Good scores, video thumbnail lazy-loading effective', status: 'Active' },
  { id: 18, name: 'HubSpot CRM trial', domain: 'hubspot.com', dataViewState: VIEW_STATES.DEFAULT, siteHealth: 96, siteHealthDelta: 4, errors: 9, errorsDelta: -5, warnings: 160, warningsDelta: null, notices: 580, noticesDelta: null, crawled: 7200, score: 94, lastAudit: '1 day ago', performance: 'Excellent landing page speed, forms load instantly', status: 'Active' },
  { id: 19, name: 'Salesforce enterprise', domain: 'salesforce.com', dataViewState: VIEW_STATES.DEFAULT, siteHealth: 83, siteHealthDelta: -4, errors: 76, errorsDelta: 9, warnings: 1250, warningsDelta: null, notices: 3700, noticesDelta: null, crawled: 5900, score: 80, lastAudit: '2 days ago', performance: 'App pages slow, large JS bundles not code-split', status: 'Paused' },
  { id: 20, name: 'Dropbox business plan', domain: 'dropbox.com', dataViewState: VIEW_STATES.DEFAULT, siteHealth: 91, siteHealthDelta: 0, errors: 33, errorsDelta: 0, warnings: 590, warningsDelta: null, notices: 1750, noticesDelta: null, crawled: 6800, score: 88, lastAudit: '6 hours ago', performance: 'Good performance, file preview pages well optimized', status: 'Active' },
  { id: 21, name: 'Slack team collaboration', domain: 'slack.com', dataViewState: VIEW_STATES.DEFAULT, siteHealth: 89, siteHealthDelta: 2, errors: 41, errorsDelta: -6, warnings: 730, warningsDelta: null, notices: 2200, noticesDelta: null, crawled: 9100, score: 85, lastAudit: '9 hours ago', performance: 'Workspace pages load fast, websocket init is quick', status: 'Active' },
  { id: 22, name: 'Zoom video conferencing', domain: 'zoom.us', dataViewState: VIEW_STATES.JUST_ADDED_FIRST_COLLECT, siteHealth: 91, siteHealthDelta: 2, errors: 29, errorsDelta: -4, warnings: 520, warningsDelta: null, notices: 1640, noticesDelta: null, crawled: 19500, score: 89, lastAudit: '2 hours ago', performance: 'Good performance, meeting pages load fast', status: 'Active' },
  { id: 23, name: 'Notion productivity', domain: 'notion.so', dataViewState: VIEW_STATES.DEFAULT, siteHealth: 97, siteHealthDelta: 1, errors: 6, errorsDelta: -1, warnings: 110, warningsDelta: null, notices: 400, noticesDelta: null, crawled: 14800, score: 96, lastAudit: '3 hours ago', performance: 'Very fast, pages with heavy blocks load smoothly', status: 'Active' },
  { id: 24, name: 'Figma design tool', domain: 'figma.com', dataViewState: VIEW_STATES.DEFAULT, siteHealth: 98, siteHealthDelta: 0, errors: 3, errorsDelta: 0, warnings: 64, warningsDelta: null, notices: 230, noticesDelta: null, crawled: 22000, score: 97, lastAudit: '1 hour ago', performance: 'Outstanding performance, WebGL rendering optimized', status: 'Active' },
  { id: 25, name: 'Canva templates promo', domain: 'canva.com', dataViewState: VIEW_STATES.DEFAULT, siteHealth: 94, siteHealthDelta: -1, errors: 17, errorsDelta: 2, warnings: 310, warningsDelta: null, notices: 950, noticesDelta: null, crawled: 26500, score: 92, lastAudit: '4 hours ago', performance: 'Fast template gallery, image optimization in place', status: 'Active' },
  { id: 26, name: 'GitHub Copilot AI', domain: 'github.com', dataViewState: VIEW_STATES.DEFAULT, siteHealth: 99, siteHealthDelta: 0, errors: 1, errorsDelta: 0, warnings: 42, warningsDelta: null, notices: 180, noticesDelta: null, crawled: 33000, score: 99, lastAudit: '2 hours ago', performance: 'Top-tier performance, repo pages load under 1 second', status: 'Active' },
  { id: 27, name: 'Atlassian Jira software', domain: 'atlassian.com', dataViewState: VIEW_STATES.DEFAULT, siteHealth: 86, siteHealthDelta: -2, errors: 58, errorsDelta: 7, warnings: 1020, warningsDelta: null, notices: 3100, noticesDelta: null, crawled: 10400, score: 84, lastAudit: '1 day ago', performance: 'Board views slow to render with many tickets loaded', status: 'Paused' },
  { id: 28, name: 'Mailchimp email marketing', domain: 'mailchimp.com', dataViewState: VIEW_STATES.DEFAULT, siteHealth: 93, siteHealthDelta: 3, errors: 22, errorsDelta: -3, warnings: 410, warningsDelta: null, notices: 1250, noticesDelta: null, crawled: 8300, score: 91, lastAudit: '5 hours ago', performance: 'Good speed, campaign editor loads smoothly', status: 'Active' },
  { id: 29, name: 'Semrush SEO platform', domain: 'semrush.com', dataViewState: VIEW_STATES.DEFAULT, siteHealth: 95, siteHealthDelta: 1, errors: 15, errorsDelta: -2, warnings: 270, warningsDelta: null, notices: 820, noticesDelta: null, crawled: 16700, score: 93, lastAudit: '3 hours ago', performance: 'Reports and dashboards render fast, charts optimized', status: 'Active' },
  { id: 30, name: 'Ahrefs backlink checker', domain: 'ahrefs.com', dataViewState: VIEW_STATES.DEFAULT, siteHealth: 97, siteHealthDelta: 0, errors: 8, errorsDelta: -1, warnings: 145, warningsDelta: null, notices: 490, noticesDelta: null, crawled: 13900, score: 95, lastAudit: '6 hours ago', performance: 'Fast data tables, backlink explorer loads quickly', status: 'Active' },
];

export default Demo;
