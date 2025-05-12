import React from 'react';
import { DataTable } from '@semcore/data-table';
import Ellipsis, { useResizeObserver } from '@semcore/ellipsis';
import Link from '@semcore/link';
import LinkExternalM from '@semcore/icon/LinkExternal/m';

const removeProtocol = (url: string): string => url.replace(/^(http|https):\/\//, '');

const Demo = () => {
  const containerRef = React.useRef(null);

  const containerRect = useResizeObserver(containerRef);

  return (
    <DataTable data={data} aria-label={'Table title'}
      columns={[
        {name: 'keyword', children: 'Keyword'},
        {name: 'kd', children: 'KD,%', gtcWidth: 'minmax(70px, auto)', justifyContent: 'flex-end'},
        {name: 'cpc', children: 'CPC', gtcWidth: 'minmax(70px, auto)', justifyContent: 'flex-end'},
        {name: 'url', children: 'URL', gtcWidth: 'minmax(auto, 200px)', ref: containerRef},
      ]}

        renderCell={(props) => {
          if (props.columnName === 'url') {
            const pageUrl = props.value.toString();

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
                    <Ellipsis
                        trim='middle'
                        //onVisibleChange={() => alert('Hi!')}
                        containerRect={containerRect}
                        containerRef={containerRef}
                    >
                      {removeProtocol(pageUrl)}
                    </Ellipsis>
                  </Link.Text>
                  <Link.Addon tag={LinkExternalM} color='icon-secondary-neutral' />
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
