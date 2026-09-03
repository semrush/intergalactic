import { Flex } from '@semcore/ui/base-components';
import Button from '@semcore/ui/button';
import type { DataTableProps } from '@semcore/ui/data-table';
import { DataTable, ACCORDION, SelectableRows } from '@semcore/ui/data-table';
import Notice from '@semcore/ui/notice';
import Pagination from '@semcore/ui/pagination';
import { Text } from '@semcore/ui/typography';
import React, { useState, useRef } from 'react';

import { useExceededMaxLimit, useSelectedRowsCount } from '../../docs/examples/checkbox-in-table';

export type TableInTableProps = {
  accordionMode: DataTableProps<any, any, any>['accordionMode'];
  onAccordionToggle?: DataTableProps<any, any, any>['onAccordionToggle'];
  limitSelectedRows: boolean;
  maxAvailableSelectedRows: number;
};

const Accordion = () => {
  const [firstArray, setFirstArray] = useState(['1']);

  return firstArray.length
    ? (
        <div>
          {firstArray.map((text) => (
            <p key={text}>
              <span>{text}</span>
              <button onClick={() => setFirstArray([])}>remove</button>
            </p>

          ))}
        </div>
      )
    : null;
};

const selectedRows = new SelectableRows<string>([], { maxAvailableCount: -1 });

const Demo = (props: TableInTableProps) => {
  const [currentPage, setCurrentPage] = useState(1);

  const tableRef = useRef<HTMLDivElement>(null);

  const maxAvailableCount = props.limitSelectedRows ? props.maxAvailableSelectedRows : -1;

  React.useEffect(() => {
    // @ts-expect-error this is private property
    selectedRows.maxAvailableCount = maxAvailableCount;
  }, [maxAvailableCount]);

  const { count: selectedRowsCount } = useSelectedRowsCount(selectedRows);
  const { isExceeded } = useExceededMaxLimit(selectedRows);
  // the store doesn't emit anything when the limit itself changes,
  // so derive it here to keep the Storybook control in sync
  const isLimitReached = isExceeded || (maxAvailableCount >= 0 && selectedRowsCount >= maxAvailableCount);

  const [expanded] = React.useState(() => {
    const map = new Map<number, Set<string>>();
    map.set(1, new Set());
    return map;
  });

  const changePage = (page: number) => {
    if (expanded.has(page)) {
      // @ts-ignore
      expanded.set(page, new Set([...expanded.get(page)]));
    } else {
      expanded.set(page, new Set());
    }
    setCurrentPage(page);
  };

  const renderCell: DataTableProps<typeof data[number], 'id', string>['renderCell'] = ({
    columnName,
    defaultRender,
  }) => {
    if (columnName === 'vol') {
      return 'Accordion here';
    }
    return defaultRender();
  };

  return (
    <>
      <Flex alignItems='center' gap={6} mb={2} h={32}>
        <Text size={200}>
          Selected rows: <Text bold>{selectedRowsCount}</Text>
        </Text>
        {selectedRowsCount > 0 && (
          <Button use='tertiary' onClick={() => selectedRows.clearAll()}>
            Deselect all
          </Button>
        )}
        <Button use='tertiary' onClick={() => selectedRows.clearAllAvailable()}>
          Deselect this page
        </Button>
        {isLimitReached && (
          <Notice theme='warning' px={2} py={0}>
            <Notice.Text>Max allowed selectable rows have been exceeded</Notice.Text>
          </Notice>
        )}
      </Flex>

      <DataTable
        // remount on limit change so checkboxes re-read the new limit right away
        key={maxAvailableCount}
        accordionMode={props.accordionMode}
        onAccordionToggle={props.onAccordionToggle}
        data={data[currentPage - 1]}
        aria-label='Parent table with accordion and checkboxes'
        selectedRows={selectedRows}
        ref={tableRef}
        renderCell={renderCell}
        columns={columns}
        uniqueRowKey='id'
        expandedRows={expanded.get(currentPage)}
        headerProps={{
          sticky: true,
        }}
      />

      <Pagination
        mt={2}
        currentPage={currentPage}
        totalPages={3}
        onCurrentPageChange={changePage}
      />
    </>
  );
};

const columns = [
  { name: 'keyword', children: 'Keyword' },
  { name: 'kd', children: 'KD %' },
  { name: 'cpc', children: 'CPC' },
  { name: 'vol', children: 'Vol.' },
];

const data = [
  [
    { id: '1', keyword: 'www.ebay.com', kd: '10', cpc: '$0.65', vol: { [ACCORDION]: <Accordion key='1' /> } },
    { id: '2', keyword: 'ebay buy', kd: '-', cpc: '$0', vol: 'n/a' },
    { id: '3', keyword: 'ebay buy', kd: '75.89', cpc: '$0', vol: { [ACCORDION]: <Accordion key='2' /> } },
    { id: '4', keyword: 'ebay buy', kd: '77.8', cpc: '$1.25', vol: '32,500,000' },
    { id: '5', keyword: 'www.ebay.com', kd: '11.2', cpc: '$3.4', vol: '65,457,920' },
    {
      id: '6',
      keyword: 'www.ebay.com',
      kd: '11.2',
      cpc: '$3.4',
      vol: '65,457,920',
    },
  ],
  [
    { id: '7', keyword: 'ebay buy', kd: '75.89', cpc: '$0', vol: { [ACCORDION]: <Accordion key='3' /> } },
    { id: '8', keyword: 'ebay buy', kd: '77.8', cpc: '$1.25', vol: '32,500,000' },
    {
      id: '9',
      keyword: {
        toString: () => 'Accordion',
        [ACCORDION]: <Accordion key='4' />,
      },
      kd: '11.2', cpc: '$3.4', vol: '65,457,920',
    },
  ],
  [
    { id: '10', keyword: 'ebay buy', kd: '75.89', cpc: '$0', vol: { [ACCORDION]: <Accordion key='3' /> } },
    { id: '11', keyword: 'ebay buy', kd: '77.8', cpc: '$1.25', vol: '32,500,000' },
  ],
];

export const tableInTableDefaultProps: TableInTableProps = {
  accordionMode: 'independent',
  limitSelectedRows: false,
  maxAvailableSelectedRows: 3,
};

Demo.defaultProps = tableInTableDefaultProps;

export default Demo;
