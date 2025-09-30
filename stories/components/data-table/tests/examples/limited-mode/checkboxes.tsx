import { Box, Flex, Collapse, ScreenReaderOnly } from '@semcore/base-components';
import Button from '@semcore/button';
import Pagination from '@semcore/pagination';
import { Text } from '@semcore/typography';
import { DataTable } from '@semcore/ui/data-table';
import React from 'react';

export type CheckboxExampleProps = {
  sideIndents?: 'wide';
  compact?: boolean;
  columnsLimit?: number;
  rowsLimit?: number;
  animationDuration?: number;
  loading?: boolean;
};

const Demo = (props: CheckboxExampleProps) => {
  const { columnsLimit, rowsLimit } = props;

  const [selectedRows, setSelectedRows] = React.useState<string[]>([]);
  const [selectedRowsDisplay, setSelectedRowsDisplay] = React.useState(0);
  const [ariaMessage, setAriaMessage] = React.useState('');
  const [currentPage, setCurrentPage] = React.useState(0);
  const tableRef = React.useRef<HTMLDivElement>(null);

  const handleChangeSelectedRows = (value: string[]) => {
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

  const limit = 5;
  const tableData = data.slice(currentPage * limit, currentPage * limit + limit);

  return (
    <>
      <Box
        // need this for FF
        tabIndex={-1}
        wMax={800}
        h={250}
        style={{ overflow: 'auto', scrollPaddingTop: selectedRows.length ? '44px' : undefined }}
      >
        <Collapse
          visible={!!selectedRows.length}
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
              Selected rows:
              {' '}
              <Text bold>{selectedRowsDisplay}</Text>
            </Text>
            <Button use='tertiary' onClick={handleDeselectAll}>
              Deselect all
            </Button>
          </Flex>
        </Collapse>
        <DataTable
          limit={{
            fromRow: rowsLimit,
            fromColumn: columnsLimit,
            renderOverlay() {
              return (
                <Flex alignItems='center' direction='column' gap={3} py={6} wMax={320}>
                  <Text size={300} fontWeight='bold' textAlign='center'>You've reached your report limit for today</Text>
                  <Text size={200} textAlign='center'>
                    To increase your daily report limit,upgrade to a Guru plan.
                  </Text>
                  <Button
                    theme='success'
                    use='primary'
                  >
                    Upgrade to Guru
                  </Button>

                </Flex>
              );
            },
          }}
          data={tableData}
          aria-label='Table example with selectable rows'
          defaultGridTemplateColumnWidth='auto'
          selectedRows={selectedRows}
          onSelectedRowsChange={handleChangeSelectedRows}
          ref={tableRef}
          sideIndents={props.sideIndents}
          loading={props.loading}
          compact={props.compact}
          headerProps={{
            sticky: true,
            top: selectedRows.length ? 44 : 0,
            animationDuration: props.animationDuration,
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
      />
    </>
  );
};

const data = [
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

export const checkboxExampleProps: CheckboxExampleProps = {
  animationDuration: 200,
  loading: false,
  sideIndents: undefined,
  compact: undefined,
  columnsLimit: 1,
  rowsLimit: 0,
};

Demo.defaultProps = checkboxExampleProps;

export default Demo;
