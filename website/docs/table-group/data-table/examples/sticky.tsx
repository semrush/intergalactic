import React, { useState, useEffect, useRef } from 'react';
import DataTable from '@semcore/ui/data-table';
import { Box } from '@semcore/ui/flex-box';
import ScrollArea from '@semcore/ui/scroll-area';

export default () => {
  const containerRef = useRef();
  const [container, setContainer] = useState(null);
  const [top, setTop] = useState(0);
  useEffect(() => {
    containerRef.current &&
      setContainer(containerRef.current.closest('[data-ui-name="ScrollArea.Container"]'));
    const header = document.getElementsByTagName('header')[0];
    header && setTop(header.offsetHeight);
  }, []);
  return (
    <>
      <DataTable data={data}>
        <Box position="sticky" top={top} zIndex={2}>
          <DataTable.Head wMin={1000}>
            <DataTable.Column name="keyword" children="Keyword" />
            <DataTable.Column name="kd" children="KD,%" />
            <DataTable.Column name="cpc" children="CPC" />
            <DataTable.Column name="vol" children="Vol." />
          </DataTable.Head>
        </Box>
        <DataTable.Body />
      </DataTable>
      <h3>with Scroll.Bar in Header</h3>
      <DataTable data={data}>
        <Box position="sticky" top={top} zIndex={2}>
          <DataTable.Head wMin={1000} ref={containerRef}>
            <DataTable.Column name="keyword" children="Keyword" />
            <DataTable.Column name="kd" children="KD,%" />
            <DataTable.Column name="cpc" children="CPC" />
            <DataTable.Column name="vol" children="Vol." />
          </DataTable.Head>
          {container && <ScrollArea.Bar container={container} />}
        </Box>
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
