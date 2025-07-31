import { Box, Flex, Collapse, ScreenReaderOnly } from '@semcore/base-components';
import Button from '@semcore/button';
import type { DataTableData } from '@semcore/data-table';
import { DataTable } from '@semcore/data-table';
import Pagination from '@semcore/pagination';
import { Text } from '@semcore/typography';
import React from 'react';

type CheckboxExampleProps = { animationDuration: number; loading: boolean };

const Demo = (props: CheckboxExampleProps) => {
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
        <ScreenReaderOnly role='status' aria-live='polite'>
          {ariaMessage}
        </ScreenReaderOnly>
        <Collapse
          visible={!!selectedRows.length}
          duration={props.animationDuration}
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
          data={tableData}
          aria-label='Table example with selectable rows'
          defaultGridTemplateColumnWidth='auto'
          selectedRows={selectedRows}
          onSelectedRowsChange={handleChangeSelectedRows}
          ref={tableRef}
          loading={props.loading}
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

const data: DataTableData = [];

export const defaultProps: CheckboxExampleProps = {
  animationDuration: 200,
  loading: false,
};

Demo.defaultProps = defaultProps;

export default Demo;
