import LinkExternalM from '@semcore/icon/LinkExternal/m';
import { type EllipsisSettings } from '@semcore/ui/base-components';
import { DataTable } from '@semcore/ui/data-table';
import Link from '@semcore/ui/link';
import React from 'react';

const removeProtocol = (url: string): string => url.replace(/^(http|https):\/\//, '');

const Demo = () => {
  const urlRef = React.useRef(null);
  const [columnElement, setColumnElement] = React.useState<HTMLElement | undefined>(undefined);

  React.useEffect(() => {
    if (urlRef.current) {
      setColumnElement(urlRef.current);
    }
  }, []);

  const ellipsisSettings: EllipsisSettings = React.useMemo(() => {
    return {
      cropPosition: 'middle',
      containerElement: columnElement,
      recalculateContainerWidth: (width: number) => width - 28,
    };
  }, [columnElement]);

  return (
    <DataTable
      data={data}
      aria-label='Table title'
      columns={[
        { name: 'keyword', children: 'Keyword' },
        {
          name: 'kd',
          children: 'KD, %',
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
                ellipsis={ellipsisSettings}
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

export default Demo;

export const App = () => <Demo />;
