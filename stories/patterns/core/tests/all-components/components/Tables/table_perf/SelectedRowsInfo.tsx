import { Flex } from '@semcore/base-components';
import Button from '@semcore/button';
import type { SelectableRows } from '@semcore/data-table';
import { Text } from '@semcore/typography';
import React from 'react';

import {
  ScreenReaderSelectedAllAnnouncement, useSelectedRowsCount,
} from '../../../../../../../components/data-table/docs/examples/checkbox-in-table';

type Props = {
  selectedRows: SelectableRows<string>;
};

export function SelectedRowsInfo({ selectedRows }: Props) {
  const { count } = useSelectedRowsCount(selectedRows);

  const handleDeselectAll = () => {
    selectedRows.clearAll();
  };

  return (
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
      <ScreenReaderSelectedAllAnnouncement selectedRows={selectedRows} />
      <Text size={200}>
        Selected rows:
        {' '}
        <Text bold>{count}</Text>
      </Text>
      <Button use='tertiary' onClick={handleDeselectAll}>
        Deselect all
      </Button>
    </Flex>
  );
}
