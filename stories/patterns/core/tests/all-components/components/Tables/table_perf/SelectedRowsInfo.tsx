import { Flex } from '@semcore/ui/base-components';
import Button from '@semcore/ui/button';
import type { SelectableRows } from '@semcore/ui/data-table';
import { Text } from '@semcore/ui/typography';
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
      <Button use='tertiary' onClick={handleDeselectAll} disabled={count === 0}>
        Deselect all
      </Button>
    </Flex>
  );
}
