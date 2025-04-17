import React from 'react';
import { DataTable } from '@semcore/data-table';
import Ellipsis, { useResizeObserver } from '@semcore/ellipsis';

const Demo = () => {
  const containerRef = React.useRef(null);

  const containerRect = useResizeObserver(containerRef);

  return (
    <DataTable data={data} aria-label={'Table title'}>
      <DataTable.Head>
        <DataTable.Head.Column name='keyword' children='Keyword' />
        <DataTable.Head.Column name='kd' children='KD,%' />
        <DataTable.Head.Column name='cpc' children='CPC' />
        <DataTable.Head.Column name='vol' children='Vol.' ref={containerRef} gtcWidth='100px' />
      </DataTable.Head>
      <DataTable.Body
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
    </DataTable>
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
