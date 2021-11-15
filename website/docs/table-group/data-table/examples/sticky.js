import React, { useState, useEffect, useRef } from 'react';
import DataTable from '@semcore/data-table';
import Sticky from '@semcore/sticky';
import ScrollArea from '@semcore/scroll-area';

export default () => {
  const containerRef = useRef();
  const [container, updateContainer] = useState(null);
  const [top, updateTop] = useState(0);
  useEffect(() => {
    containerRef.current &&
      updateContainer(containerRef.current.closest('[data-ui-name="ScrollArea.Container"]'));
    const header = document.getElementsByTagName('header')[0];
    header && updateTop(header.offsetHeight);
  }, []);
  return (
    <>
      <DataTable data={data}>
        <Sticky zIndex={2} top={top}>
          <DataTable.Head wMin={1000}>
            <DataTable.Column name="keyword" children="Keyword" />
            <DataTable.Column name="kd" children="KD,%" />
            <DataTable.Column name="cpc" children="CPC" />
            <DataTable.Column name="vol" children="Vol." />
          </DataTable.Head>
        </Sticky>
        <DataTable.Body />
      </DataTable>
      <h3>with Scroll.Bar in Header</h3>
      <DataTable data={data}>
        <Sticky zIndex={2} top={top}>
          <DataTable.Head wMin={1000} ref={containerRef}>
            <DataTable.Column name="keyword" children="Keyword" />
            <DataTable.Column name="kd" children="KD,%" />
            <DataTable.Column name="cpc" children="CPC" />
            <DataTable.Column name="vol" children="Vol." />
          </DataTable.Head>
          {container && <ScrollArea.Bar container={container} />}
        </Sticky>
        <DataTable.Body />
      </DataTable>
    </>
  );
};

const data = [
  {
    keyword: 'ebay buy',
    kd: '77.8',
    cpc: '$1.25',
    vol: '32,500,000',
  },
  {
    keyword: 'www.ebay.com',
    kd: '11.2',
    cpc: '$3.4',
    vol: '65,457,920',
  },
  {
    keyword: 'www.ebay.com',
    kd: '10',
    cpc: '$0.65',
    vol: '47,354,640',
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
    vol: '21,644,290',
  },
];
