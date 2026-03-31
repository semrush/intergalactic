import {
  Box,
  Flex,
  ScreenReaderOnly,
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
  const [ariaMessage, setAriaMessage] = React.useState('');
  const tableRef = React.useRef<HTMLDivElement>(null);

  const handleChangeSelectedRows = React.useCallback((value: string[]) => {
    setSelectedRows(value);

    if (!selectedRows.length)
      setAriaMessage('Action bar appeared before the table');
    setSelectedRowsDisplay(value.length);
  }, []);

  const handleDeselectAll = () => {
    setSelectedRows([]);
    tableRef.current?.focus();
  };

  React.useEffect(() => {
    const timer = setTimeout(() => setAriaMessage(''), 300);
    return () => clearTimeout(timer);
  }, [ariaMessage]);

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
        <ScreenReaderOnly role='status' aria-live='polite'>
          {ariaMessage}
        </ScreenReaderOnly>
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
          <Button use='tertiary' onClick={handleDeselectAll}>
            Deselect all
          </Button>
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
