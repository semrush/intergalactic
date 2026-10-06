import {
  Box,
  Flex,
  Collapse,
  ScreenReaderOnly,
} from '@semcore/ui/base-components';
import Button from '@semcore/ui/button';
import { DataTable, ROW_GROUP, SelectableRows } from '@semcore/ui/data-table';
import Pagination from '@semcore/ui/pagination';
import { Text } from '@semcore/ui/typography';
import React from 'react';

import { ScreenReaderSelectedAllAnnouncement, useSelectedRowsCount } from '../../docs/examples/checkbox-in-table';

export type DemoProps = {
  reactive?: boolean;
  loading?: boolean;
  compact?: boolean;
  sideIndents?: 'wide';
};

const reactiveSelectedRows = new SelectableRows<string>();

const columns = [
  { name: 'keyword', children: 'Keyword' },
  { name: 'kd', children: 'KD %' },
  { name: 'cpc', children: 'CPC' },
  { name: 'vol', children: 'Vol.' },
];

const ReactiveDemo = ({ loading, compact, sideIndents }: Omit<DemoProps, 'reactive'>) => {
  const { count } = useSelectedRowsCount(reactiveSelectedRows);
  const [currentPage, setCurrentPage] = React.useState(0);
  const tableRef = React.useRef<HTMLDivElement>(null);

  const handleDeselectAll = () => {
    reactiveSelectedRows.clearAll();
    tableRef.current?.focus();
  };

  const limit = 5;
  const tableData = React.useMemo(() => {
    return data.slice(currentPage * limit, currentPage * limit + limit);
  }, [currentPage]);

  return (
    <>
      <Box tabIndex={-1}>
        <ScreenReaderSelectedAllAnnouncement selectedRows={reactiveSelectedRows} />
        <Collapse
          visible={!!count}
          duration={200}
          style={{ position: 'sticky', top: 0, zIndex: 50 }}
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
              Selected rows: <Text bold>{count}</Text>
            </Text>
            <Button use='tertiary' onClick={handleDeselectAll}>
              Deselect all
            </Button>
          </Flex>
        </Collapse>
        <DataTable
          data={tableData}
          aria-label='Table example with selectable rows'
          defaultGridTemplateColumnWidth='auto'
          selectedRows={reactiveSelectedRows}
          ref={tableRef}
          loading={loading}
          compact={compact}
          sideIndents={sideIndents}
          headerProps={{
            sticky: true,
            top: count ? 44 : 0,
            animationDuration: 200,
          }}
          columns={columns}
          uniqueRowKey='id'
        />
      </Box>
      <Pagination
        mt={4}
        totalPages={Math.ceil(data.length / limit)}
        currentPage={currentPage + 1}
        onCurrentPageChange={(page) => setCurrentPage(page - 1)}
        aria-label='Table with selectable rows pagination'
      />
    </>
  );
};

const LegacyDemo = ({ loading, compact, sideIndents }: Omit<DemoProps, 'reactive'>) => {
  const [selectedRows, setSelectedRows] = React.useState<string[]>([]);
  const [selectedRowsDisplay, setSelectedRowsDisplay] = React.useState(0);
  const [ariaMessage, setAriaMessage] = React.useState('');
  const [currentPage, setCurrentPage] = React.useState(0);
  const tableRef = React.useRef<HTMLDivElement>(null);

  const handleChangeSelectedRows = (value: string[]) => {
    console.log(value);
    setSelectedRows(value);
    if (!selectedRows.length)
      setAriaMessage('Action bar appeared before the table');
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

  const limit = 5;
  const tableData = data.slice(currentPage * limit, currentPage * limit + limit);

  return (
    <>
      <Box
        // need this for FF
        tabIndex={-1}
      >
        <ScreenReaderOnly role='status' aria-live='polite'>
          {ariaMessage}
        </ScreenReaderOnly>
        <Collapse
          visible={!!selectedRows.length}
          duration={200}
          style={{ position: 'sticky', top: 0, zIndex: 50 }}
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
          data={tableData}
          aria-label='Table example with selectable rows'
          defaultGridTemplateColumnWidth='auto'
          selectedRows={selectedRows}
          onSelectedRowsChange={handleChangeSelectedRows}
          ref={tableRef}
          loading={loading}
          compact={compact}
          sideIndents={sideIndents}
          headerProps={{
            sticky: true,
            top: selectedRows.length ? 44 : 0,
            animationDuration: 200,
          }}
          columns={[
            { name: 'keyword', children: 'Keyword' },
            { name: 'kd', children: 'KD %' },
            { name: 'cpc', children: 'CPC' },
            { name: 'vol', children: 'Vol.' },
          ]}
          uniqueRowKey='id'
        />
      </Box>
      <Pagination
        mt={4}
        totalPages={Math.ceil(data.length / limit)}
        currentPage={currentPage + 1}
        onCurrentPageChange={(page) => setCurrentPage(page - 1)}
        aria-label='Table with selectable rows pagination'
      />
    </>
  );
};

const Demo = ({ reactive = true, ...rest }: DemoProps) => {
  if (reactive) return <ReactiveDemo {...rest} />;
  return <LegacyDemo {...rest} />;
};

const data = [
  {
    keyword: 'ebay buy',
    [ROW_GROUP]: [
      { id: '1', kd: '31.2', cpc: '$1.15', vol: '22,000' },
      { id: '2', kd: '31.2', cpc: '$1.15', vol: '22,000' },
    ],
  },
  {
    keyword: 'amazon shoes',
    [ROW_GROUP]: [
      { id: '3', kd: '47', cpc: '$2.95', vol: '48,000' },
      { id: '4', kd: '47', cpc: '$2.95', vol: '48,000' },
    ],
  },
  {
    keyword: 'www.nike.com',
    [ROW_GROUP]: [
      { id: '5', kd: '66.4', cpc: '$3.80', vol: 'n/a' },
      { id: '6', kd: '66.4', cpc: '$3.80', vol: 'n/a' },
    ],
  },
  {
    keyword: 'buy iphone 13',
    [ROW_GROUP]: [
      { id: '7', kd: '59', cpc: '$5.20', vol: '71,000' },
      { id: '8', kd: '59', cpc: '$5.20', vol: '71,000' },
    ],
  },
  {
    keyword: 'adidas sale',
    [ROW_GROUP]: [{ id: '9', kd: '40.2', cpc: '$1.85', vol: '19,500' }],
  },
  {
    keyword: 'cheap flights expedia',
    [ROW_GROUP]: [{ id: '10', kd: '52', cpc: '$4.10', vol: '35,800' }],
  },
  {
    keyword: 'booking.com hotels',
    [ROW_GROUP]: [{ id: '11', kd: '73', cpc: '$6.45', vol: 'n/a' }],
  },
  {
    keyword: 'ubereats promo code',
    [ROW_GROUP]: [{ id: '12', kd: '38', cpc: '$2.10', vol: '11,700' }],
  },
  {
    keyword: 'buy ps5 online',
    [ROW_GROUP]: [{ id: '13', kd: '64', cpc: '$5.95', vol: '44,200' }],
  },
  {
    keyword: 'shopify login',
    [ROW_GROUP]: [{ id: '14', kd: '25.8', cpc: '$0.65', vol: '13,600' }],
  },
  {
    keyword: 'h&m online store',
    [ROW_GROUP]: [{ id: '15', kd: '36', cpc: '$1.70', vol: '10,300' }],
  },
  {
    keyword: 'buy macbook air',
    [ROW_GROUP]: [{ id: '16', kd: '57.4', cpc: '$4.90', vol: '28,400' }],
  },
  {
    keyword: 'www.zara.com',
    [ROW_GROUP]: [{ id: '17', kd: '45', cpc: '$3.20', vol: 'n/a' }],
  },
  {
    keyword: 'target clearance',
    [ROW_GROUP]: [{ id: '18', kd: '33', cpc: '$1.25', vol: '12,900' }],
  },
  {
    keyword: 'asos men jackets',
    [ROW_GROUP]: [{ id: '19', kd: '41', cpc: '$2.55', vol: '6,800' }],
  },
  {
    keyword: 'best buy coupons',
    [ROW_GROUP]: [{ id: '20', kd: '48', cpc: '$3.70', vol: '17,100' }],
  },
  {
    keyword: 'walmart near me',
    [ROW_GROUP]: [{ id: '21', kd: '60.1', cpc: '$0.95', vol: '50,000' }],
  },
  {
    keyword: 'netflix gift card',
    [ROW_GROUP]: [{ id: '22', kd: '39', cpc: '$2.20', vol: '8,900' }],
  },
  {
    keyword: 'www.apple.com',
    [ROW_GROUP]: [{ id: '23', kd: '71', cpc: '$6.90', vol: 'n/a' }],
  },
  {
    keyword: 'nike running shoes men',
    [ROW_GROUP]: [{ id: '24', kd: '44', cpc: '$3.60', vol: '21,700' }],
  },
  {
    keyword: 'download spotify premium',
    [ROW_GROUP]: [{ id: '25', kd: '58', cpc: '$4.75', vol: '26,800' }],
  },
  {
    keyword: 'buy dell laptop',
    [ROW_GROUP]: [{ id: '26', kd: '53.1', cpc: '$5.40', vol: '19,600' }],
  },
  {
    keyword: 'gap kids sale',
    [ROW_GROUP]: [{ id: '27', kd: '34', cpc: '$1.10', vol: '5,300' }],
  },
];

export const defaultProps: DemoProps = {
  reactive: true,
  loading: false,
  compact: undefined,
  sideIndents: undefined,
};
Demo.defaultProps = defaultProps;

export default Demo;
