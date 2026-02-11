import LinkExternalM from '@semcore/icon/LinkExternal/m';
import { DataTable } from '@semcore/ui/data-table';
import Ellipsis, { useResizeObserver } from '@semcore/ui/ellipsis';
import type { EllipsisProps } from '@semcore/ui/ellipsis';
import Link from '@semcore/ui/link';
import { Text } from '@semcore/ui/typography';
import React from 'react';

const removeProtocol = (url: string): string => url.replace(/^(http|https):\/\//, '');

const Demo = (propsEllipsis: EllipsisProps) => {
  const containerRef = React.useRef(null);

  const containerRect = useResizeObserver(containerRef);

  return (
    <DataTable
      data={data}
      aria-label='Table title'
      columns={[
        { name: 'keyword', children: 'Keyword' },
        { name: 'kd', children: 'KD,%', gtcWidth: 'minmax(70px, auto)', justifyContent: 'flex-end' },
        { name: 'cpc', children: 'CPC', gtcWidth: 'minmax(70px, auto)', justifyContent: 'flex-end' },
        { name: 'url', children: 'URL', gtcWidth: 'minmax(auto, 200px)', ref: containerRef },
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
              wMin={0}
            >
              <Link.Text style={{ display: 'inline-block', maxWidth: 'calc(100% - 20px)' }}>
                <Ellipsis
                  trim={propsEllipsis.trim}
                  // onVisibleChange={() => alert('Hi!')}
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
export const defaultProps: EllipsisProps = {
  trim: 'middle',
};

Demo.defaultProps = defaultProps;
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
