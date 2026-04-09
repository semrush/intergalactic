import {
  Box,
  Flex,
} from '@semcore/ui/base-components';
import Button from '@semcore/ui/button';
import { Text } from '@semcore/ui/typography';
import React from 'react';

import { Table } from './table';

type CheckboxExampleProps = {
  loading: boolean;
  sideIndents?: 'wide';
  compact?: boolean;
};

const Demo = (props: CheckboxExampleProps) => {
  const [selectedRows, setSelectedRows] = React.useState<string[]>([]);
  const [selectedRowsDisplay, setSelectedRowsDisplay] = React.useState(0);
  const tableRef = React.useRef<HTMLDivElement>(null);

  const handleChangeSelectedRows = React.useCallback((value: string[]) => {
    setSelectedRows(value);
    setSelectedRowsDisplay(value.length);
  }, []);

  const handleDeselectAll = () => {
    setSelectedRows([]);
    setSelectedRowsDisplay(0);
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
          handleChangeSelectedRows={handleChangeSelectedRows}
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
