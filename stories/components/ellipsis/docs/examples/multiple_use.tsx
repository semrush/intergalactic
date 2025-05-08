import React from 'react';
import { DataTable } from '@semcore/data-table';
import Ellipsis, { useResizeObserver } from '@semcore/ellipsis';

const Demo = () => {
  const containerRef = React.useRef(null);

  const containerRect = useResizeObserver(containerRef);

  return (
    <DataTable data={data} aria-label={'Table title'}
      columns={[
        {name: 'keyword', children: 'Keyword'},
        {name: 'kd', children: 'KD,%'},
        {name: 'cpc', children: 'CPC'},
        {name: 'vol', children: 'Vol.', gtcWidth: '100px', ref: containerRef},
      ]}
        renderCell={(props) => {
          if (props.columnName === 'vol') {
            return (
                <Ellipsis trim='middle' containerRect={containerRect} containerRef={containerRef}>
              {props.value}
            </Ellipsis>
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
    vol: '32,500,000,500,00032,500,000,500,00032,500,000,500,000',
  },
  {
    keyword: 'www.ebay.com',
    kd: '11.2',
    cpc: '$3.4',
    vol: '65,457,920,000,50032,500,000,500,00032,500,000,500,000',
  },
  {
    keyword: 'www.ebay.com',
    kd: '10',
    cpc: '$0.65',
    vol: '47,354,640,000,50032,500,000,500,00032,500,000,500,00032,500,000,500,000',
  },
  {
    keyword: 'ebay buy',
    kd: '-',
    cpc: '$0',
    vol: 'n/a',
  },
  {
    keyword: 'ebay buy',
    kd: '75.89',
    cpc: '$0',
    vol: '21,644,290,000,500',
  },
];

export default Demo;
