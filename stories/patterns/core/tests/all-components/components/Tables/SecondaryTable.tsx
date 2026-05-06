import LinkExternalM from '@semcore/icon/LinkExternal/m';
import SortDesc from '@semcore/icon/SortDesc/m';
import { Flex } from '@semcore/ui/base-components';
import { DataTable } from '@semcore/ui/data-table';
import Link from '@semcore/ui/link';
import React from 'react';

const removeProtocol = (url: string): string => url.replace(/^(http|https):\/\//, '');

const parseKd = (kd: string) => {
  const num = Number(kd);
  return Number.isFinite(num) ? num : Number.NEGATIVE_INFINITY;
};

export function SecondaryTable() {
  const urlRef = React.useRef(null);
  const [columnElement, setColumnElement] = React.useState<HTMLElement | undefined>(undefined);

  React.useEffect(() => {
    if (urlRef.current) {
      setColumnElement(urlRef.current);
    }
  }, []);

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
        const triggerRef = React.useRef<HTMLAnchorElement | null>(null);

        if (props.columnName === 'url') {
          const pageUrl = props.value?.toString?.() || '';

          return (
            <Link
              href={pageUrl}
              target='_blank'
              rel='noopener noreferrer'
              color='text-primary'
              wMin={0}
              style={{ display: 'inline-flex', alignItems: 'center' }}
              ref={triggerRef}
            >
              <Link.Text
                wMin={0}
                ellipsis={Boolean(columnElement)}
                ellipsis:cropPosition='middle'
                ellipsis:containerElement={columnElement}
                ellipsis:recalculateContainerWidth={(width: number) => width - 28}
                hint:triggerRef={triggerRef}
              >
                {removeProtocol(pageUrl)}
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
