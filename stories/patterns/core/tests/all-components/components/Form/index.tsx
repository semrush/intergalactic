import { Flex } from '@semcore/ui/base-components';
import React from 'react';

import { FORM_TAB_COLUMN_STYLE, useSimulatedSkeleton } from './form-utils';
import { FormCards } from './FormCards';

export function Form() {
  const contentReady = useSimulatedSkeleton();

  return (
    <Flex
      mt={4}
      gap={4}
      alignItems='flex-start'
      w='100%'
      flexWrap
      aria-busy={!contentReady}
      aria-live='polite'
      role={contentReady ? undefined : 'status'}
    >
      <FormCards columnStyle={FORM_TAB_COLUMN_STYLE} contentReady={contentReady} />
    </Flex>
  );
}
