import {
  Box,
  Flex,
  Collapse,
} from '@semcore/ui/base-components';
import Button from '@semcore/ui/button';
import { DataTable, ROW_GROUP, SelectableRows } from '@semcore/ui/data-table';
import Pagination from '@semcore/ui/pagination';
import { Text } from '@semcore/ui/typography';
import React from 'react';

import { ScreenReaderSelectedAllAnnouncement, useSelectedRowsCount } from '../../../docs/examples/checkbox-in-table';

export type DemoProps = {
  mergedRows?: boolean;
  loading?: boolean;
};

const selectedRows = new SelectableRows<string>();

const columns: { name: string; children: string }[] = [
  { name: 'keyword', children: 'Keyword' },
  { name: 'kd', children: 'KD %' },
  { name: 'cpc', children: 'CPC' },
  { name: 'vol', children: 'Vol.' },
];

const Demo = ({ mergedRows = false, loading = false }: DemoProps) => {
  const { count } = useSelectedRowsCount(selectedRows);
  const [currentPage, setCurrentPage] = React.useState(0);
  const tableRef = React.useRef<HTMLDivElement>(null);

  const handleDeselectAll = () => {
    selectedRows.clearAll();
    tableRef.current?.focus();
  };

  const currentData = mergedRows ? mergedData : flatData;
  const limit = 5;
  const tableData = currentData.slice(currentPage * limit, currentPage * limit + limit);

  return (
    <>
      <Box tabIndex={-1} wMax={800} h={250} style={{ overflow: 'auto', scrollPaddingTop: count ? '44px' : undefined }}>
        <ScreenReaderSelectedAllAnnouncement selectedRows={selectedRows} />
        <Collapse
          visible={count > 0}
          duration={0}
          style={{ position: 'sticky', top: 0, zIndex: 50 }}
        >
          <Flex
            role='region'
            aria-label='Table action bar'
            alignItems='center'
            gap={6}
            py={2}
            px={3}
            style={{ backgroundColor: 'var(--intergalactic-bg-primary-neutral, #ffffff)' }}
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
          selectedRows={selectedRows}
          ref={tableRef}
          loading={loading}
          headerProps={{
            sticky: true,
            top: count ? 44 : 0,
            animationDuration: 0,
          }}
          columns={columns}
          uniqueRowKey='id'
        />
      </Box>
      <Pagination
        mt={4}
        totalPages={Math.ceil(currentData.length / limit)}
        currentPage={currentPage + 1}
        onCurrentPageChange={(page) => setCurrentPage(page - 1)}
        aria-label='Table with selectable rows pagination'
      />
    </>
  );
};

const flatData = [
  { id: '1', keyword: 'ebay buy', kd: '31.2', cpc: '$1.15', vol: '22,000' },
  { id: '2', keyword: 'amazon shoes', kd: '47', cpc: '$2.95', vol: '48,000' },
  { id: '3', keyword: 'www.nike.com', kd: '66.4', cpc: '$3.80', vol: 'n/a' },
  { id: '4', keyword: 'buy iphone 13', kd: '59', cpc: '$5.20', vol: '71,000' },
  { id: '5', keyword: 'adidas sale', kd: '40.2', cpc: '$1.85', vol: '19,500' },
  { id: '6', keyword: 'cheap flights expedia', kd: '52', cpc: '$4.10', vol: '35,800' },
  { id: '7', keyword: 'booking.com hotels', kd: '73', cpc: '$6.45', vol: 'n/a' },
  { id: '8', keyword: 'ubereats promo code', kd: '38', cpc: '$2.10', vol: '11,700' },
  { id: '9', keyword: 'buy ps5 online', kd: '64', cpc: '$5.95', vol: '44,200' },
  { id: '10', keyword: 'shopify login', kd: '25.8', cpc: '$0.65', vol: '13,600' },
  { id: '11', keyword: 'h&m online store', kd: '36', cpc: '$1.70', vol: '10,300' },
  { id: '12', keyword: 'buy macbook air', kd: '57.4', cpc: '$4.90', vol: '28,400' },
  { id: '13', keyword: 'www.zara.com', kd: '45', cpc: '$3.20', vol: 'n/a' },
  { id: '14', keyword: 'target clearance', kd: '33', cpc: '$1.25', vol: '12,900' },
  { id: '15', keyword: 'asos men jackets', kd: '41', cpc: '$2.55', vol: '6,800' },
  { id: '16', keyword: 'best buy coupons', kd: '48', cpc: '$3.70', vol: '17,100' },
  { id: '17', keyword: 'walmart near me', kd: '60.1', cpc: '$0.95', vol: '50,000' },
  { id: '18', keyword: 'netflix gift card', kd: '39', cpc: '$2.20', vol: '8,900' },
  { id: '19', keyword: 'www.apple.com', kd: '71', cpc: '$6.90', vol: 'n/a' },
  { id: '20', keyword: 'nike running shoes men', kd: '44', cpc: '$3.60', vol: '21,700' },
  { id: '21', keyword: 'download spotify premium', kd: '58', cpc: '$4.75', vol: '26,800' },
  { id: '22', keyword: 'buy dell laptop', kd: '53.1', cpc: '$5.40', vol: '19,600' },
  { id: '23', keyword: 'gap kids sale', kd: '34', cpc: '$1.10', vol: '5,300' },
];

const mergedData = [
  {
    id: '.1',
    keyword: 'ebay buy',
    [ROW_GROUP]: [
      { id: '1', kd: '31.2', cpc: '$1.15', vol: '22,000' },
      { id: '2', kd: '31.2', cpc: '$1.15', vol: '22,000' },
    ],
  },
  {
    id: '.2',
    keyword: 'amazon shoes',
    [ROW_GROUP]: [
      { id: '3', kd: '47', cpc: '$2.95', vol: '48,000' },
      { id: '4', kd: '47', cpc: '$2.95', vol: '48,000' },
    ],
  },
  {
    id: '.3',
    keyword: 'www.nike.com',
    [ROW_GROUP]: [
      { id: '5', kd: '66.4', cpc: '$3.80', vol: 'n/a' },
      { id: '6', kd: '66.4', cpc: '$3.80', vol: 'n/a' },
    ],
  },
  {
    id: '.4',
    keyword: 'buy iphone 13',
    [ROW_GROUP]: [
      { id: '7', kd: '59', cpc: '$5.20', vol: '71,000' },
      { id: '8', kd: '59', cpc: '$5.20', vol: '71,000' },
    ],
  },
  {
    id: '.5',
    keyword: 'adidas sale',
    [ROW_GROUP]: [
      { id: '9', kd: '40.2', cpc: '$1.85', vol: '19,500' },
    ],
  },
  {
    id: '.6',
    keyword: 'cheap flights expedia',
    [ROW_GROUP]: [
      { id: '10', kd: '52', cpc: '$4.10', vol: '35,800' },
    ],
  },
  {
    id: '.7',
    keyword: 'booking.com hotels',
    [ROW_GROUP]: [
      { id: '11', kd: '73', cpc: '$6.45', vol: 'n/a' },
    ],
  },
  {
    id: '.8',
    keyword: 'ubereats promo code',
    [ROW_GROUP]: [
      { id: '12', kd: '38', cpc: '$2.10', vol: '11,700' },
    ],
  },
  {
    id: '.9',
    keyword: 'buy ps5 online',
    [ROW_GROUP]: [
      { id: '13', kd: '64', cpc: '$5.95', vol: '44,200' },
    ],
  },
  {
    id: '.10',
    keyword: 'shopify login',
    [ROW_GROUP]: [
      { id: '14', kd: '25.8', cpc: '$0.65', vol: '13,600' },
    ],
  },
];

export const defaultProps: DemoProps = {
  mergedRows: false,
  loading: false,
};

Demo.defaultProps = defaultProps;

export default Demo;
