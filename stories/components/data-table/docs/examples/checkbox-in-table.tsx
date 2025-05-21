import React from 'react';
import { DataTable } from '@semcore/data-table';
import { Box, Flex, ScreenReaderOnly } from '@semcore/flex-box';
import { Text } from '@semcore/typography';
import { Collapse } from '@semcore/animation';
import Button from '@semcore/button';
import { sstyled } from '@semcore/core';

const style = sstyled.css`
  SDataTable > [aria-rowindex='1'] > div {
    transition: top 150ms ease-out;
  }
  SDataTable[activePanel] > [aria-rowindex='1'] > div {
    top: 44px;
    transition-delay: 80ms;
  }
`;

const Demo = () => {
  const [selectedRows, setSelectedRows] = React.useState<number[]>([]);
  const [selectedRowsDisplay, setSelectedRowsDisplay] = React.useState(0);
  const [ariaMessage, setAriaMessage] = React.useState('');
  const tableRef = React.useRef<HTMLDivElement>(null);

  const handleChangeSelectedRows = (value: number[]) => {
    setSelectedRows(value);
    if (!selectedRows.length) setAriaMessage('Action bar appeared before the table');
    if (value.length) setSelectedRowsDisplay(value.length);
  };

  const handleDeselectAll = () => {
    setSelectedRows([]);
    tableRef.current?.focus();
  };

  React.useEffect(() => {
    const timer = setTimeout(() => setAriaMessage(''), 300);
    return () => clearTimeout(timer);
  }, [ariaMessage]);

  return (
    <Box
      // need this for FF
      tabIndex={-1}
      wMax={800}
      h={'100%'}
      hMax={400}
      style={{ overflow: 'auto', scrollPaddingTop: !!selectedRows.length ? '44px' : undefined }}
    >
      <ScreenReaderOnly role='status' aria-live='polite'>
        {ariaMessage}
      </ScreenReaderOnly>
      <Collapse
        visible={!!selectedRows.length}
        duration={150}
        style={{ position: 'sticky', top: 0, zIndex: 2 }}
      >
        <Flex
          role='region'
          aria-label='Table action bar'
          alignItems='center'
          gap={6}
          py={2}
          px={3}
          style={{
            backgroundColor: 'var(--intergalactic-bg-primary-neutral, #ffffff)',
          }}
        >
          <Text size={200}>
            Selected rows: <Text bold>{selectedRowsDisplay}</Text>
          </Text>
          <Button use='tertiary' onClick={handleDeselectAll}>
            Deselect all
          </Button>
        </Flex>
      </Collapse>
      <DataTable
        data={data}
        aria-label={'Table example with selectable rows'}
        defaultGridTemplateColumnWidth={'auto'}
        selectedRows={selectedRows}
        onSelectedRowsChange={handleChangeSelectedRows}
        ref={tableRef}
        headerProps={{ sticky: true }}
        columns={[
          { name: 'keyword', children: 'Keyword' },
          { name: 'kd', children: 'KD %' },
          { name: 'cpc', children: 'CPC' },
          { name: 'vol', children: 'Vol.' },
        ]}
        // @ts-ignore
        styles={style}
        // @ts-ignore
        activePanel={!!selectedRows.length}
      />
    </Box>
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
