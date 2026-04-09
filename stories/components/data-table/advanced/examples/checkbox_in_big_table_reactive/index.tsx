import {
  Box,
  Flex,
} from '@semcore/ui/base-components';
import Button from '@semcore/ui/button';
import { SelectableRows } from '@semcore/ui/data-table';
import { Text } from '@semcore/ui/typography';
import React from 'react';

import { Table } from './table';
import { useSelectedRowsCount } from '../../../docs/examples/checkbox-in-table';

type CheckboxExampleProps = {
  loading: boolean;
  sideIndents?: 'wide';
  compact?: boolean;
};

const selectedRows = new SelectableRows<string>();

const Demo = (props: CheckboxExampleProps) => {
  const { count: selectedRowsDisplay } = useSelectedRowsCount(selectedRows);
  const tableRef = React.useRef<HTMLDivElement>(null);

  const handleDeselectAll = () => {
    selectedRows.clearAll();
    tableRef.current?.focus();
  };

  return (
    <>
      <Box
        // need this for FF
        tabIndex={-1}
        wMax={1000}
        h={1000}
        style={{
          overflow: 'auto',
          scrollPaddingTop: '44px',
        }}
      >
        <Flex
          role='region'
          aria-label='Table action bar'
          alignItems='center'
          gap={6}
          py={2}
          px={3}
          h={44}
          style={{
            position: 'sticky',
            boxSizing: 'border-box',
            top: 0,
            zIndex: 50,
            backgroundColor:
                'var(--intergalactic-bg-primary-neutral, #ffffff)',
          }}
        >
          <Text size={200}>
            Selected rows: <Text bold>{selectedRowsDisplay}</Text>
          </Text>
          {selectedRowsDisplay > 0 && (
            <Button use='tertiary' onClick={handleDeselectAll}>
              Deselect all
            </Button>
          )}
        </Flex>
        <Table
          selectedRows={selectedRows}
          tableRef={tableRef}
          loading={props.loading}
          compact={props.compact}
          sideIndents={props.sideIndents}
        />
      </Box>
    </>
  );
};

export const defaultProps: CheckboxExampleProps = {
  loading: false,
  sideIndents: undefined,
  compact: undefined,
};

Demo.defaultProps = defaultProps;

export default Demo;
