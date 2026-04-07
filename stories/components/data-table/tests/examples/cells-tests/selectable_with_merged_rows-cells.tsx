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

import { ScreenReaderSelectedAllAnnouncement, useSelectedRowsCount } from '../../../docs/examples/checkbox-in-table';

export type SelectableWithMergedRowsProps = {
  headerLevels?: 1 | 2;
  withBorders?: boolean;
};

const selectedRows = new SelectableRows<string>();

const Demo = (props: SelectableWithMergedRowsProps) => {
  const { headerLevels = 1, withBorders = false } = props;
  const { count } = useSelectedRowsCount(selectedRows);
  const [currentPage, setCurrentPage] = React.useState(0);
  const tableRef = React.useRef<HTMLDivElement>(null);

  const handleDeselectAll = () => {
    selectedRows.clearAll();
    tableRef.current?.focus();
  };

  const limit = 5;
  const tableData = data.slice(
    currentPage * limit,
    currentPage * limit + limit,
  );

  const columns = React.useMemo(() => {
    const baseColumns: any[] = [
      { name: 'category', children: 'Category', gtcWidth: '120px' },
      { name: 'keyword', children: 'Keyword', gtcWidth: '200px' },
    ];

    if (headerLevels === 2) {
      baseColumns.push({
        name: 'metrics',
        children: 'Metrics',
        borders: withBorders ? 'both' : undefined,
        columns: [
          { name: 'kd', children: 'KD %', gtcWidth: '100px' },
          { name: 'cpc', children: 'CPC', gtcWidth: '100px' },
        ],
      });
      baseColumns.push({ name: 'vol', children: 'Vol.', gtcWidth: '120px' });
    } else {
      baseColumns.push(
        { name: 'kd', children: 'KD %', gtcWidth: '100px' },
        { name: 'cpc', children: 'CPC', gtcWidth: '100px' },
        { name: 'vol', children: 'Vol.', gtcWidth: '120px' },
      );
    }

    return baseColumns;
  }, [headerLevels, withBorders]);

  return (
    <>
      <Box
        tabIndex={-1}
      >
        <ScreenReaderSelectedAllAnnouncement selectedRows={selectedRows} />
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
              backgroundColor:
                                  'var(--intergalactic-bg-primary-neutral, #ffffff)',
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
          selectedRows={selectedRows}
          ref={tableRef}
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

const data = [
  // (row+column merge)
  {
    'category/keyword': 'E-commerce / ebay buy',
    [ROW_GROUP]: [
      {
        id: '1',
        kd: '31.2',
        cpc: '$1.15',
        vol: '22,000',
      },
      {
        id: '2',
        kd: '31.2',
        cpc: '$1.15',
        vol: '22,000',
      },
    ],
  },
  {
    category: 'Fashion',
    [ROW_GROUP]: [
      {
        id: '3',
        keyword: 'amazon shoes',
        kd: '47',
        cpc: '$2.95',
        vol: '48,000',
      },
      {
        'id': '3a',
        'keyword': 'h&m online store',
        'kd/cpc': '36 / $1.70',
        'vol': '10,300',
      },
    ],
  },
  // Merged row in the middle
  {
    category: 'Brands',
    keyword: 'www.nike.com',
    [ROW_GROUP]: [
      {
        'id': '5',
        'kd/cpc': '66.4 / $3.80',
        'vol': 'n/a',
      },
      {
        'id': '6',
        'kd/cpc': '66.5 / $40',
        'vol': 'n/a',
      },
    ],
  },
  {
    keyword: 'buy iphone 13 + buy iphone 14',
    [ROW_GROUP]: [
      {
        id: '7',
        category: 'Tech',
        kd: '59',
        cpc: '$5.20',
        vol: '71,000',
      },
      {
        id: '8',
        category: 'Tech',
        kd: '62.5',
        cpc: '$4.80',
        vol: '68,500',
      },
    ],
  },
  {
    category: 'Fashion',
    keyword: 'adidas sale',
    [ROW_GROUP]: [
      {
        id: '9',
        kd: '40.2',
        cpc: '$1.85',
        vol: '19,500',
      },
    ],
  },
  // Second page - 3 merged rows after checkbox
  {
    category: 'Travel',
    [ROW_GROUP]: [
      {
        id: '10a',
        keyword: 'cheap flights expedia',
        kd: '52',
        cpc: '$4.10',
        vol: '35,800',
      },
      {
        id: '10b',
        keyword: 'booking vacation deals',
        kd: '48',
        cpc: '$3.85',
        vol: '29,200',
      },
      {
        id: '10c',
        keyword: 'last minute travel',
        kd: '43',
        cpc: '$3.50',
        vol: '22,100',
      },
    ],
  },
  {
    category: 'Travel',
    keyword: 'booking.com hotels',
    [ROW_GROUP]: [
      {
        id: '11',
        kd: '73',
        cpc: '$6.45',
        vol: 'n/a',
      },
    ],
  },
  // Category+keyword merged in the middle
  {
    'category/keyword': 'Food / ubereats promo code',
    [ROW_GROUP]: [
      {
        id: '12',
        kd: '38',
        cpc: '$2.10',
        vol: '11,700',
      },
    ],
  },
  {
    category: 'Gaming',
    keyword: 'buy ps5 online',
    [ROW_GROUP]: [
      {
        id: '13',
        kd: '64',
        cpc: '$5.95',
        vol: '44,200',
      },
    ],
  },
  {
    category: 'E-commerce',
    keyword: 'shopify login',
    [ROW_GROUP]: [
      {
        id: '14',
        kd: '25.8',
        cpc: '$0.65',
        vol: '13,600',
      },
    ],
  },
  {
    'category/keyword': 'Tech / buy macbook air',
    [ROW_GROUP]: [
      {
        id: '15',
        kd: '57.4',
        cpc: '$4.90',
        vol: '28,400',
      },
    ],
  },
  {
    category: 'Brands',
    keyword: 'www.zara.com',
    [ROW_GROUP]: [
      {
        id: '16',
        kd: '45',
        cpc: '$3.20',
        vol: 'n/a',
      },
    ],
  },
  {
    category: 'Shopping',
    keyword: 'target clearance',
    [ROW_GROUP]: [
      {
        id: '17',
        kd: '33',
        cpc: '$1.25',
        vol: '12,900',
      },
    ],
  },
  {
    category: 'Fashion',
    keyword: 'asos men jackets',
    [ROW_GROUP]: [
      {
        'id': '18',
        'kd/cpc': '41 / $2.55',
        'vol': '6,800',
      },
    ],
  },
  {
    category: 'Shopping',
    keyword: 'best buy coupons',
    [ROW_GROUP]: [
      {
        id: '19',
        kd: '48',
        cpc: '$3.70',
        vol: '17,100',
      },
    ],
  },
  {
    category: 'Shopping',
    keyword: 'walmart near me',
    [ROW_GROUP]: [
      {
        id: '20',
        kd: '60.1',
        cpc: '$0.95',
        vol: '50,000',
      },
    ],
  },
  {
    category: 'Entertainment',
    keyword: 'netflix gift card',
    [ROW_GROUP]: [
      {
        id: '21',
        kd: '39',
        cpc: '$2.20',
        vol: '8,900',
      },
    ],
  },
  {
    category: 'Brands',
    keyword: 'www.apple.com',
    [ROW_GROUP]: [
      {
        id: '22',
        kd: '71',
        cpc: '$6.90',
        vol: 'n/a',
      },
    ],
  },
  {
    category: 'Fashion',
    keyword: 'nike running shoes men',
    [ROW_GROUP]: [
      {
        id: '23',
        kd: '44',
        cpc: '$3.60',
        vol: '21,700',
      },
    ],
  },
  {
    category: 'Entertainment',
    keyword: 'download spotify premium',
    [ROW_GROUP]: [
      {
        id: '24',
        kd: '58',
        cpc: '$4.75',
        vol: '26,800',
      },
    ],
  },
  {
    category: 'Tech',
    keyword: 'buy dell laptop',
    [ROW_GROUP]: [
      {
        id: '25',
        kd: '53.1',
        cpc: '$5.40',
        vol: '19,600',
      },
    ],
  },
  {
    category: 'Fashion',
    keyword: 'gap kids sale',
    [ROW_GROUP]: [
      {
        id: '26',
        kd: '34',
        cpc: '$1.10',
        vol: '5,300',
      },
    ],
  },
];

export const selectableWithMergedRowsProps: SelectableWithMergedRowsProps = {
  headerLevels: 1,
  withBorders: false,
};

Demo.defaultProps = selectableWithMergedRowsProps;

export default Demo;
