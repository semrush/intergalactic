import React from 'react';
import DataTable from 'intergalactic/data-table';
import { Box } from 'intergalactic/flex-box';
import ScrollArea from 'intergalactic/scroll-area';

const Demo = () => {
  const [headScrollContainer, setHeadScrollContainer] = React.useState<Element | null>(null);
  const handleHeadScrollContainerRef = React.useCallback((node: Element | null) => {
    setHeadScrollContainer(node?.parentElement?.parentElement!);
  }, []);
  const top = 0; // Here should be height of Header in your application

  return (
    <>
      <DataTable data={data}>
        <Box position='sticky' top={top} zIndex={2}>
          <DataTable.Head wMin={1000}>
            <DataTable.Column name='keyword' children='Keyword' />
            <DataTable.Column name='kd' children='KD,%' />
            <DataTable.Column name='cpc' children='CPC' />
            <DataTable.Column name='vol' children='Vol.' />
          </DataTable.Head>
        </Box>
        <DataTable.Body />
      </DataTable>
      <h3>with Scroll.Bar in Header</h3>
      <DataTable data={data}>
        <Box position='sticky' top={top} zIndex={2}>
          <DataTable.Head wMin={1000} ref={handleHeadScrollContainerRef}>
            <DataTable.Column name='keyword' children='Keyword' />
            <DataTable.Column name='kd' children='KD,%' />
            <DataTable.Column name='cpc' children='CPC' />
            <DataTable.Column name='vol' children='Vol.' />
          </DataTable.Head>
          {headScrollContainer && <ScrollArea.Bar container={headScrollContainer} />}
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

export default Demo;
