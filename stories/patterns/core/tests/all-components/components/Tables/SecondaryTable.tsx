import IconM from '@semcore/icon/Cards/m';
import SortDesc from '@semcore/icon/SortDesc/m';
import { Flex } from '@semcore/ui/base-components';
import ButtonLink from '@semcore/ui/button';
import { DataTable, LinkAction } from '@semcore/ui/data-table';
import Link from '@semcore/ui/link';
import React from 'react';

const removeProtocol = (url: string): string => url.replace(/^(http|https):\/\//, '');

const parseKd = (kd: string) => {
  const num = Number(kd);
  return Number.isFinite(num) ? num : Number.NEGATIVE_INFINITY;
};

const KEYWORD_URLS = [
  'https://www.semrush.com/blog/',
  'https://developer.semrush.com/intergalactic/',
  'https://www.ebay.com/deals',
  'https://github.com/semrush/intergalactic',
  'https://www.nytimes.com/section/technology',
  'https://en.wikipedia.org/wiki/Web_design',
  'https://www.mozilla.org/firefox/',
  'https://stackoverflow.com/questions',
  'https://www.smashingmagazine.com/',
  'https://css-tricks.com/guides/',
  'https://web.dev/learn/',
  'https://www.figma.com/community',
  'https://www.npmjs.com/package/@semcore/ui',
  'https://react.dev/reference/react',
  'https://www.w3.org/WAI/standards-guidelines/wcag/',
  'https://caniuse.com/',
  'https://www.shopify.com/blog',
  'https://stripe.com/docs',
  'https://www.atlassian.com/software/jira',
  'https://www.notion.so/product',
  'https://linear.app/changelog',
  'https://vercel.com/templates',
  'https://www.cloudflare.com/learning/',
  'https://aws.amazon.com/documentation/',
  'https://kubernetes.io/docs/home/',
];

const data = [
  { keyword: 'ebay buy', kd: '77.8', cpc: '$1.25' },
  { keyword: 'www.ebay.com', kd: '11.2', cpc: '$3.4' },
  { keyword: 'buy on ebay', kd: '10', cpc: '$0.65' },
  { keyword: 'ebay deals', kd: '34.1', cpc: '$2.10' },
  { keyword: 'semrush intergalactic', kd: '58.3', cpc: '$1.80' },
  { keyword: 'design system tokens', kd: '5.7', cpc: '$0.00' },
  { keyword: 'react components', kd: '-', cpc: '$0' },
  { keyword: 'accessibility audit', kd: '75.89', cpc: '$0' },
].map((row, index) => ({
  ...row,
  url: KEYWORD_URLS[index % KEYWORD_URLS.length],
}));

export function SecondaryTable() {
  const sortedData = React.useMemo(
    () => [...data].sort((a, b) => parseKd(b.kd) - parseKd(a.kd)),
    [],
  );

  return (
    <DataTable
      data={sortedData}
      use='secondary'
      variant='card'
      aria-label='Table title'
      columns={[
        { name: 'keyword', children: 'Keyword' },
        {
          name: 'url',
          children: 'URL',
          gtcWidth: 'minmax(auto, 200px)',
        },
        {
          name: 'kd',
          children: (
            <Flex alignItems='center' justifyContent='flex-end' gap={1}>
              KD, %
              <SortDesc color='icon-secondary-neutral' />
            </Flex>
          ),
          gtcWidth: 'minmax(70px, auto)',
          justifyContent: 'flex-end',
        },
        {
          name: 'cpc',
          children: 'CPC',
          gtcWidth: 'minmax(70px, auto)',
          justifyContent: 'flex-end',
        },
      ]}
      renderCell={(props) => {
        if (props.columnName === 'url') {
          const pageUrl = props.value?.toString?.() || '';

          if (!pageUrl || pageUrl === 'n/a') {
            return props.defaultRender();
          }

          return (
            <LinkAction>
              <Link href={pageUrl}>
                {removeProtocol(pageUrl)}
              </Link>
              <ButtonLink addonLeft={IconM} use='tertiary' theme='muted' />
            </LinkAction>
          );
        }

        return props.defaultRender();
      }}
    />
  );
}
