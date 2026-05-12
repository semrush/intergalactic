import LinkExternalM from '@semcore/icon/LinkExternal/m';
import SortDesc from '@semcore/icon/SortDesc/m';
import { Flex } from '@semcore/ui/base-components';
import { DataTable } from '@semcore/ui/data-table';
import Ellipsis, { useResizeObserver } from '@semcore/ui/ellipsis';
import Link from '@semcore/ui/link';
import React from 'react';

const removeProtocol = (url: string): string => url.replace(/^(http|https):\/\//, '');

const parseKd = (kd: string) => {
  const num = Number(kd);
  return Number.isFinite(num) ? num : Number.NEGATIVE_INFINITY;
};

export function SecondaryTable() {
  const urlRef = React.useRef(null);
  const urlRect = useResizeObserver(urlRef);
  const ellipsisRect = React.useMemo(
    () => ({ width: Math.max(urlRect.width - 28, 0) }),
    [urlRect.width],
  );

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
        {
          name: 'url',
          children: 'URL',
          gtcWidth: 'minmax(auto, 200px)',
          ref: urlRef,
        },
      ]}
      renderCell={(props) => {
        if (props.columnName === 'url') {
          const pageUrl = props.value?.toString?.() || '';

          return (
            <Link
              href={pageUrl}
              target='_blank'
              rel='noopener noreferrer'
              color='text-primary'
              w='100%'
              wMin={0}
              style={{ display: 'inline-flex', alignItems: 'center' }}
            >
              <Link.Text wMin={0}>
                <Ellipsis trim='middle' containerRect={ellipsisRect} containerRef={urlRef}>
                  {removeProtocol(pageUrl)}
                </Ellipsis>
              </Link.Text>
              <Link.Addon>
                <LinkExternalM color='icon-secondary-neutral' />
              </Link.Addon>
            </Link>
          );
        }

        return props.defaultRender();
      }}
    />
  );
};

const data = [
  {
    keyword: 'ebay buy',
    kd: '77.8',
    cpc: '$1.25',
    url: 'https://developer.semrush.com/intergalactic/',
  },
  {
    keyword: 'www.ebay.com',
    kd: '11.2',
    cpc: '$3.4',
    url: 'https://developer.semrush.com/intergalactic/',
  },
  {
    keyword: 'www.ebay.com',
    kd: '10',
    cpc: '$0.65',
    url: 'https://developer.semrush.com/intergalactic/',
  },
  {
    keyword: 'buy on ebay',
    kd: '34.1',
    cpc: '$2.10',
    url: 'https://www.ebay.com/',
  },
  {
    keyword: 'ebay deals',
    kd: '58.3',
    cpc: '$1.80',
    url: 'https://www.ebay.com/deals',
  },
  {
    keyword: 'semrush intergalactic',
    kd: '5.7',
    cpc: '$0.00',
    url: 'https://developer.semrush.com/intergalactic/',
  },
  {
    keyword: 'ebay buy',
    kd: '-',
    cpc: '$0',
    url: 'n/a',
  },
  {
    keyword: 'ebay buy',
    kd: '75.89',
    cpc: '$0',
    url: 'https://semrush.com',
  },
];
