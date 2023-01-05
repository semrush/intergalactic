import React, { useRef } from 'react';
import DataTable from '@semcore/ui/data-table';
import Ellipsis, { useResizeObserver } from '@semcore/ui/ellipsis';

export default () => {
  const containerRef = useRef(null);

  const containerRect = useResizeObserver(containerRef);

  return (
    <DataTable data={data}>
      <DataTable.Head>
        <DataTable.Column name="keyword" children="Keyword" />
        <DataTable.Column name="kd" children="KD,%" />
        <DataTable.Column name="cpc" children="CPC" />
        <DataTable.Column name="vol" children="Vol." ref={containerRef} />
      </DataTable.Head>
      <DataTable.Body>
        <DataTable.Cell name="vol">
          {(props, row) => {
            return {
              children: (
                <Ellipsis trim="middle" containerRect={containerRect} containerRef={containerRef}>
                  {row[props.name]}
                </Ellipsis>
              ),
            };
          }}
        </DataTable.Cell>
      </DataTable.Body>
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
