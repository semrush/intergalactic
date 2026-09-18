import { Box, Collapse, Flex, ScreenReaderOnly } from '@semcore/ui/base-components';
import Button from '@semcore/ui/button';
import { ACCORDION, DataTable, type DataTableSort, ROW_GROUP, SelectableRows } from '@semcore/ui/data-table';
import Pagination from '@semcore/ui/pagination';
import { Text } from '@semcore/ui/typography';
import React from 'react';

export type DemoProps = {
  fixedColumns?: boolean;
  limitMode?: boolean;
  rowsLimit?: number;
  columnsLimit?: number;
  /** Max rows allowed to be selected. -1 means unlimited. Reactive API only. */
  maxAvailableSelectedRows?: number;
  reactive?: boolean;
  pagination?: boolean;
  pageSize?: number;
  mergedRows?: boolean;
  accordion?: boolean;
  headerLevels?: 1 | 2;
  virtualScroll?: boolean;
  use?: 'primary' | 'secondary';
  compact?: boolean;
  sideIndents?: 'wide' | 'default';
};

type DataRow = { id: string; keyword: string; kd: string; cpc: string; vol: string };
type DataColumn = keyof DataRow;

const flatData: DataRow[] = [
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
    [ROW_GROUP]: [{ id: '9', kd: '40.2', cpc: '$1.85', vol: '19,500' }],
  },
  {
    id: '.6',
    keyword: 'cheap flights expedia',
    [ROW_GROUP]: [{ id: '10', kd: '52', cpc: '$4.10', vol: '35,800' }],
  },
  {
    id: '.7',
    keyword: 'booking.com hotels',
    [ROW_GROUP]: [{ id: '11', kd: '73', cpc: '$6.45', vol: 'n/a' }],
  },
  {
    id: '.8',
    keyword: 'ubereats promo code',
    [ROW_GROUP]: [{ id: '12', kd: '38', cpc: '$2.10', vol: '11,700' }],
  },
  {
    id: '.9',
    keyword: 'buy ps5 online',
    [ROW_GROUP]: [{ id: '13', kd: '64', cpc: '$5.95', vol: '44,200' }],
  },
  {
    id: '.10',
    keyword: 'shopify login',
    [ROW_GROUP]: [{ id: '14', kd: '25.8', cpc: '$0.65', vol: '13,600' }],
  },
];

const baseColumns = [
  { name: 'keyword', children: 'Keyword', sortable: true },
  { name: 'kd', children: 'KD %', sortable: true },
  { name: 'cpc', children: 'CPC', sortable: true },
  { name: 'vol', children: 'Vol.', sortable: true },
];

const fixedColumnsConfig = [
  { name: 'keyword', children: 'Keyword', sortable: true, fixed: 'left' as const, gtcWidth: '200px' },
  { name: 'kd', children: 'KD %', sortable: true, gtcWidth: '150px' },
  { name: 'cpc', children: 'CPC', sortable: true, gtcWidth: '120px' },
  { name: 'vol', children: 'Vol.', sortable: true, gtcWidth: '120px' },
];

const reactiveSelectedRows = new SelectableRows<string>();

const useSelectedRowsCount = (rows: SelectableRows<any>) => {
  const [count, setCount] = React.useState(0);
  React.useEffect(() => {
    const u1 = rows.on(SelectableRows.TOGGLE_EVENT, () => setCount(rows.get().length));
    const u2 = rows.on(SelectableRows.SELECT_ALL_EVENT, () => setCount(rows.get().length));
    return () => {
      u1();
      u2();
    };
  }, []);
  return { count };
};

const ScreenReaderSelectedAllAnnouncement = ({ selectedRows }: { selectedRows: SelectableRows<any> }) => {
  const [ariaMessage, setAriaMessage] = React.useState('');
  React.useEffect(() => {
    const callback = () => {
      if (selectedRows.get().length > 0) setAriaMessage('Action bar appeared before the table');
    };
    const u1 = selectedRows.on(SelectableRows.TOGGLE_EVENT, callback);
    const u2 = selectedRows.on(SelectableRows.SELECT_ALL_EVENT, callback);
    return () => {
      u1();
      u2();
    };
  }, [selectedRows]);
  React.useEffect(() => {
    const timer = setTimeout(() => setAriaMessage(''), 300);
    return () => clearTimeout(timer);
  }, [ariaMessage]);
  return <ScreenReaderOnly role='status' aria-live='polite'>{ariaMessage}</ScreenReaderOnly>;
};

const getLimitConfig = (limitMode: boolean, rowsLimit?: number, columnsLimit?: number) => {
  if (!limitMode) return undefined;
  return {
    fromRow: rowsLimit,
    fromColumn: columnsLimit,
    renderOverlay() {
      return (
        <Flex alignItems='center' direction='column' gap={3} py={6} wMax={320}>
          <Text size={300} fontWeight='bold' textAlign='center'>
            You've reached your report limit for today
          </Text>
          <Text size={200} textAlign='center'>
            To increase your daily report limit, upgrade to a Guru plan.
          </Text>
          <Button theme='success' use='primary'>
            Upgrade to Guru
          </Button>
          <Button theme='success' use='primary'>
            Upgrade to Guru
          </Button>
        </Flex>
      );
    },
  };
};

const virtualFlatData: DataRow[] = Array.from({ length: 500 }, (_, i) => {
  const base = flatData[i % flatData.length];
  return { ...base, id: `v${i + 1}` };
});

const ACCORDION_ROW_IDS = new Set(['1', '5', '11']);

const AccordionContent = ({ keyword }: { keyword: string }) => (
  <Flex direction='column' gap={2} p={4} style={{ backgroundColor: 'var(--intergalactic-bg-secondary-neutral, #f4f5f9)' }}>
    <Text size={200} bold>Details for “{keyword}”</Text>
    <Text size={100}>
      Expanded row content. Replace with any React node — charts, nested tables, forms, etc.
    </Text>
  </Flex>
);

const withAccordion = (rows: DataRow[], enabled: boolean): DataRow[] => {
  if (!enabled) return rows;
  return rows.map((row) =>
    ACCORDION_ROW_IDS.has(row.id)
      ? ({ ...row, [ACCORDION]: <AccordionContent keyword={row.keyword} /> } as DataRow)
      : row,
  );
};

const sortData = (data: DataRow[], sort?: DataTableSort<DataColumn>): DataRow[] => {
  if (!sort) return data;
  const [prop, direction] = sort;
  return [...data].sort((a, b) => {
    const aVal = a[prop as keyof DataRow] ?? '';
    const bVal = b[prop as keyof DataRow] ?? '';
    if (aVal === bVal) return 0;
    return direction === 'asc' ? (aVal > bVal ? 1 : -1) : aVal > bVal ? -1 : 1;
  });
};

const ACTION_BAR_HEIGHT = 44;

const ActionBar = ({
  count,
  onDeselectAll,
  sticky = true,
}: { count: number; onDeselectAll: () => void; sticky?: boolean }) => (
  <Collapse
    visible={count > 0}
    duration={0}
    style={sticky ? { position: 'sticky', top: 0, zIndex: 50 } : undefined}
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
      <Button use='tertiary' onClick={onDeselectAll}>
        Deselect all
      </Button>
    </Flex>
  </Collapse>
);

const ReactiveDemo = ({
  fixedColumns = false,
  limitMode = false,
  rowsLimit,
  columnsLimit,
  pagination = false,
  pageSize = 5,
  mergedRows = false,
  accordion = false,
  virtualScroll = false,
  use,
  compact,
  sideIndents = 'default',
  maxAvailableSelectedRows = -1,
}: Omit<DemoProps, 'reactive'>) => {
  const { count } = useSelectedRowsCount(reactiveSelectedRows);
  const [sort, setSort] = React.useState<DataTableSort<DataColumn>>();
  const [currentPage, setCurrentPage] = React.useState(0);
  const tableRef = React.useRef<HTMLDivElement>(null);
  const limit = getLimitConfig(limitMode, rowsLimit, columnsLimit);

  // the store has no public setter for the limit, and it is created at module level.
  // set it in the render body so the very first render already sees it.
  (reactiveSelectedRows as unknown as { maxAvailableCount: number }).maxAvailableCount = maxAvailableSelectedRows;

  const handleDeselectAll = () => {
    reactiveSelectedRows.clearAll();
    tableRef.current?.focus();
  };

  const sourceData = virtualScroll ? virtualFlatData : flatData;
  const allData = mergedRows ? mergedData : sourceData;
  const sortedData = React.useMemo(
    () => (mergedRows ? allData : withAccordion(sortData(sourceData, sort), accordion)),
    [sort, mergedRows, accordion, virtualScroll],
  );
  const tableData = pagination
    ? sortedData.slice(currentPage * pageSize, currentPage * pageSize + pageSize)
    : sortedData;
  const useInnerScroll = fixedColumns || virtualScroll;

  return (
    <>
      <Box
        tabIndex={-1}
        hMax={useInnerScroll ? undefined : 400}
        style={{ overflow: useInnerScroll ? undefined : 'auto', scrollPaddingTop: count > 0 && !useInnerScroll ? `${ACTION_BAR_HEIGHT}px` : undefined }}
      >
        <ScreenReaderSelectedAllAnnouncement selectedRows={reactiveSelectedRows} />
        <ActionBar count={count} onDeselectAll={handleDeselectAll} sticky={!useInnerScroll} />
        <DataTable
          limit={limit}
          aria-label='Table'
          columns={fixedColumns ? fixedColumnsConfig : baseColumns}
          data={tableData}
          hMax={useInnerScroll ? 400 : undefined}
          w={fixedColumns ? '500px' : undefined}
          headerProps={{ sticky: true, top: count > 0 && !useInnerScroll ? ACTION_BAR_HEIGHT : 0, animationDuration: 0 }}
          sort={sort as DataTableSort<any>}
          selectedRows={reactiveSelectedRows}
          onSortChange={setSort}
          uniqueRowKey='id'
          use={use}
          compact={compact}
          sideIndents={sideIndents === 'wide' ? 'wide' : undefined}
          virtualScroll={virtualScroll}
          ref={tableRef}
        />
      </Box>
      {pagination && (
        <Pagination
          mt={4}
          totalPages={Math.ceil(allData.length / pageSize)}
          currentPage={currentPage + 1}
          onCurrentPageChange={(page) => setCurrentPage(page - 1)}
          aria-label='Table pagination'
        />
      )}
    </>
  );
};

const LegacyDemo = ({
  fixedColumns = false,
  limitMode = false,
  rowsLimit,
  columnsLimit,
  pagination = false,
  pageSize = 5,
  mergedRows = false,
  accordion = false,
  virtualScroll = false,
  use,
  compact,
  sideIndents,
}: Omit<DemoProps, 'reactive'>) => {
  const [selectedRows, setSelectedRows] = React.useState<string[]>([]);
  const [ariaMessage, setAriaMessage] = React.useState('');
  const [sort, setSort] = React.useState<DataTableSort<DataColumn>>();
  const [currentPage, setCurrentPage] = React.useState(0);
  const tableRef = React.useRef<HTMLDivElement>(null);
  const limit = getLimitConfig(limitMode, rowsLimit, columnsLimit);
  const count = selectedRows.length;

  const handleDeselectAll = () => {
    setSelectedRows([]);
    tableRef.current?.focus();
  };

  const handleChangeSelectedRows = (value: string[]) => {
    if (!selectedRows.length && value.length > 0) {
      setAriaMessage('Action bar appeared before the table');
    }
    setSelectedRows(value);
  };

  React.useEffect(() => {
    const timer = setTimeout(() => setAriaMessage(''), 300);
    return () => clearTimeout(timer);
  }, [ariaMessage]);

  const sourceData = virtualScroll ? virtualFlatData : flatData;
  const allData = mergedRows ? mergedData : sourceData;
  const sortedData = React.useMemo(
    () => (mergedRows ? allData : withAccordion(sortData(sourceData, sort), accordion)),
    [sort, mergedRows, accordion, virtualScroll],
  );
  const tableData = pagination
    ? sortedData.slice(currentPage * pageSize, currentPage * pageSize + pageSize)
    : sortedData;
  const useInnerScroll = fixedColumns || virtualScroll;

  return (
    <>
      <Box
        tabIndex={-1}
        hMax={useInnerScroll ? undefined : 400}
        style={{ overflow: useInnerScroll ? undefined : 'auto', scrollPaddingTop: count > 0 && !useInnerScroll ? `${ACTION_BAR_HEIGHT}px` : undefined }}
      >
        <ScreenReaderOnly role='status' aria-live='polite'>
          {ariaMessage}
        </ScreenReaderOnly>
        <ActionBar count={count} onDeselectAll={handleDeselectAll} sticky={!useInnerScroll} />
        <DataTable
          limit={limit}
          aria-label='Table'
          columns={fixedColumns ? fixedColumnsConfig : baseColumns}
          data={tableData}
          hMax={useInnerScroll ? 400 : undefined}
          w={fixedColumns ? '500px' : undefined}
          headerProps={{ sticky: true, top: count > 0 && !useInnerScroll ? ACTION_BAR_HEIGHT : 0, animationDuration: 0 }}
          sort={sort as DataTableSort<any>}
          selectedRows={selectedRows}
          onSelectedRowsChange={handleChangeSelectedRows}
          onSortChange={setSort}
          uniqueRowKey='id'
          use={use}
          compact={compact}
          sideIndents={sideIndents === 'wide' ? 'wide' : undefined}
          virtualScroll={virtualScroll}
          ref={tableRef}
        />
      </Box>
      {pagination && (
        <Pagination
          mt={4}
          totalPages={Math.ceil(allData.length / pageSize)}
          currentPage={currentPage + 1}
          onCurrentPageChange={(page) => setCurrentPage(page - 1)}
          aria-label='Table pagination'
        />
      )}
    </>
  );
};

const Demo = ({ reactive = true, ...rest }: DemoProps) => {
  if (reactive) return <ReactiveDemo {...rest} />;
  return <LegacyDemo {...rest} />;
};

export const defaultProps: DemoProps = {
  fixedColumns: false,
  limitMode: false,
  columnsLimit: 1,
  rowsLimit: 1,
  maxAvailableSelectedRows: -1,
  reactive: true,
  pagination: false,
  pageSize: 5,
  mergedRows: false,
  accordion: false,
  virtualScroll: false,
  use: 'primary',
  compact: undefined,
  sideIndents: undefined,
};

Demo.defaultProps = defaultProps;

export default Demo;
