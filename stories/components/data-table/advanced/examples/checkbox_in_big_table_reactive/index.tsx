import {
  Box,
  Flex,
} from '@semcore/ui/base-components';
import Button from '@semcore/ui/button';
import { SelectableRows } from '@semcore/ui/data-table';
import Notice from '@semcore/ui/notice';
import { Text } from '@semcore/ui/typography';
import React from 'react';

import { Table } from './table';
import {
  ScreenReaderSelectedAllAnnouncement,
  useExceededMaxLimit,
  useSelectedRowsCount,
} from '../../../docs/examples/checkbox-in-table';

type CheckboxExampleProps = {
  loading: boolean;
  sideIndents?: 'wide';
  compact?: boolean;
  variant?: 'default' | 'card';
  limitSelectedRows: boolean;
  maxAvailableSelectedRows: number;
};

const selectedRows = new SelectableRows<string>([], { maxAvailableCount: -1 });

const Demo = (props: CheckboxExampleProps) => {
  const tableRef = React.useRef<HTMLDivElement>(null);
  const deselectAllRef = React.useRef<HTMLButtonElement>(null);
  const maxAvailableCount = props.limitSelectedRows ? props.maxAvailableSelectedRows : -1;

  React.useEffect(() => {
    // @ts-expect-error this is private property
    selectedRows.maxAvailableCount = maxAvailableCount;
  }, [maxAvailableCount]);

  const { count: selectedRowsDisplay } = useSelectedRowsCount(selectedRows);
  const { isExceeded } = useExceededMaxLimit(selectedRows);
  // the store doesn't emit anything when the limit itself changes,
  // so derive it here to keep the Storybook control in sync
  const isLimitReached = isExceeded || (maxAvailableCount >= 0 && selectedRowsDisplay >= maxAvailableCount);

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
        h='calc(100vh - 100px)'
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
          <ScreenReaderSelectedAllAnnouncement selectedRows={selectedRows} />
          <Text size={200}>
            Selected rows: <Text bold>{selectedRowsDisplay}</Text>
          </Text>
          <Button onClick={() => selectedRows.replace(['1', '2', '3', '4'])}>
            check 4 rows
          </Button>
          {selectedRowsDisplay > 0 && (
            <Button use='tertiary' onClick={handleDeselectAll} ref={deselectAllRef}>
              Deselect all
            </Button>
          )}
          {isLimitReached && (
            <Notice theme='warning' px={2} py={0}>
              <Notice.Text>Max allowed selectable rows have been exceeded</Notice.Text>
            </Notice>
          )}
        </Flex>
        <Table
          // remount on limit change so checkboxes re-read the new limit right away
          key={maxAvailableCount}
          selectedRows={selectedRows}
          tableRef={tableRef}
          loading={props.loading}
          compact={props.compact}
          sideIndents={props.sideIndents}
          variant={props.variant}
          onBlur={(e: React.FocusEvent) => {
            if (e.relatedTarget === null && e.target.getAttribute('aria-label') === 'All items') {
              deselectAllRef.current?.focus();
            }
          }}
        />
      </Box>
    </>
  );
};

export const defaultProps: CheckboxExampleProps = {
  loading: false,
  sideIndents: undefined,
  compact: undefined,
  variant: undefined,
  limitSelectedRows: false,
  maxAvailableSelectedRows: 3,
};

Demo.defaultProps = defaultProps;

export default Demo;
