import React from 'react';
import { DataTable } from '@semcore/data-table';
import { Flex, ScreenReaderOnly } from '@semcore/flex-box';
import { Text } from '@semcore/typography';
import { Collapse } from '@semcore/animation';
import Button from '@semcore/button';

const Demo = () => {
  const [selectedRows, setSelectedRows] = React.useState<number[]>([]);
  const [selectedRowsDisplay, setSelectedRowsDisplay] = React.useState(0);
  const [ariaMessage, setAriaMessage] = React.useState('');
  const tableRef = React.useRef<HTMLDivElement>(null);

  const handleChangeSelectedRows = (value: number[]) => {
    setSelectedRows(value);
    setAriaMessage(value.length > 0 ? 'Action bar appeared before the table' : '');
    if (value.length > 0) setSelectedRowsDisplay(value.length);
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
    <Flex direction='column' wMax={800} h={'100%'} hMax={800} style={{ overflow: 'auto' }}>
      <ScreenReaderOnly role='status' aria-live='polite'>
        {ariaMessage}
      </ScreenReaderOnly>
      <Flex
        role='region'
        aria-label='Table action bar'
        alignItems='center'
        gap={6}
        py={2}
        px={3}
        style={{
          position: 'sticky',
          top: 0,
          zIndex: 2,
          backgroundColor: 'var(--intergalactic-bg-primary-neutral, #ffffff)',
        }}
        tag={Collapse}
        visible={!!selectedRows.length}
        duration={150}
      >
        <Text size={200}>
          Selected rows: <Text bold>{selectedRowsDisplay}</Text>
        </Text>
        <Button use='tertiary' onClick={handleDeselectAll}>
          Deselect all
        </Button>
      </Flex>
      <DataTable
        data={data}
        aria-label={'Table example with selectable rows'}
        defaultGridTemplateColumnWidth={'auto'}
        selectedRows={selectedRows}
        onSelectedRowsChange={handleChangeSelectedRows}
        ref={tableRef}
      >
        <DataTable.Head sticky top={!selectedRows.length ? 0 : 44}>
          <DataTable.Head.Column name='keyword'>keyword</DataTable.Head.Column>
          <DataTable.Head.Column name='kd' children='KD,%' />
          <DataTable.Head.Column name='cpc' children='CPC' />
          <DataTable.Head.Column name='vol' children='Vol.' />
        </DataTable.Head>
        <DataTable.Body />
      </DataTable>
    </Flex>
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
