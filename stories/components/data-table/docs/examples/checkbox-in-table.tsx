import { Box, Flex, Collapse, ScreenReaderOnly } from '@semcore/ui/base-components';
import Button from '@semcore/ui/button';
import { DataTable, SelectableRows } from '@semcore/ui/data-table';
import Pagination from '@semcore/ui/pagination';
import { Text } from '@semcore/ui/typography';
import React from 'react';

type CheckboxExampleProps = { animationDuration: number; loading: boolean; sideIndents?: 'wide'; compact?: boolean };

const selectedRows = new SelectableRows<string>();

const Demo = (props: CheckboxExampleProps) => {
  const { count } = useSelectedRowsCount(selectedRows);
  const [currentPage, setCurrentPage] = React.useState(0);
  const tableRef = React.useRef<HTMLDivElement>(null);

  const handleDeselectAll = () => {
    selectedRows.clearAll();
    tableRef.current?.focus();
  };

  const limit = 5;
  const tableData = data.slice(currentPage * limit, currentPage * limit + limit);

  return (
    <>
      <Box
        // need this for FF
        tabIndex={-1}
        wMax={800}
        h={250}
        style={{ overflow: 'auto', scrollPaddingTop: count > 0 ? '44px' : undefined }}
      >
        <ScreenReaderSelectedAllAnnouncement selectedRows={selectedRows} />
        <Collapse
          visible={count > 0}
          duration={props.animationDuration}
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
              <Text bold>{count}</Text>
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
          sideIndents={props.sideIndents}
          loading={props.loading}
          compact={props.compact}
          headerProps={{
            sticky: true,
            top: count > 0 ? 44 : 0,
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
        aria-label='Table with selectable rows pagination'
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

export const defaultProps: CheckboxExampleProps = {
  animationDuration: 200,
  loading: false,
  sideIndents: undefined,
  compact: undefined,
};

Demo.defaultProps = defaultProps;

export default Demo;

export const useSelectedRowsCount = (selectedRows: SelectableRows<any>) => {
  const [count, setCount] = React.useState(0);

  React.useEffect(() => {
    const unsubscribe = selectedRows.on(SelectableRows.TOGGLE_EVENT, () => {
      const selectedRowsCount = selectedRows.get().length;

      setCount(selectedRowsCount);
    });

    return unsubscribe;
  }, []);

  React.useEffect(() => {
    const unsubscribe = selectedRows.on(SelectableRows.SELECT_ALL_EVENT, () => {
      const selectedRowsCount = selectedRows.get().length;

      setCount(selectedRowsCount);
    });

    return unsubscribe;
  }, []);

  return { count };
};

export const ScreenReaderSelectedAllAnnouncement = (props: { selectedRows: SelectableRows<any> }) => {
  const [ariaMessage, setAriaMessage] = React.useState('');

  const setAriaCallback = React.useCallback(() => {
    const selectedRowsSize = props.selectedRows.get().length;

    setAriaMessage(selectedRowsSize === 0 ? '' : 'Actions are available before the table');
  }, [props.selectedRows]);

  React.useEffect(() => {
    const unsubscribe = props.selectedRows.on(SelectableRows.TOGGLE_EVENT, setAriaCallback);

    return unsubscribe;
  }, [props.selectedRows]);

  React.useEffect(() => {
    const unsubscribe = props.selectedRows.on(SelectableRows.SELECT_ALL_EVENT, setAriaCallback);

    return unsubscribe;
  }, [props.selectedRows]);

  return (
    <ScreenReaderOnly role='status' aria-live='polite'>
      {ariaMessage}
    </ScreenReaderOnly>
  );
};
