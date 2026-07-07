import { ScreenReaderOnly } from '@semcore/base-components';
import type { Intergalactic } from '@semcore/core';
import { Root } from '@semcore/core';
import CounterKit from '@semcore/counter';
import React from 'react';

import type { BulkTextareaRootType } from '../BulkTextarea';
import type { NSBulktextarea } from '../BulkTextarea.types';

export function Counter(
  props: Intergalactic.InternalTypings.InferChildComponentProps<
    NSBulktextarea.Counter.Component,
    BulkTextareaRootType,
    'Counter'
  >,
) {
  // ?
  const { theme, linesCount, maxLines, getI18nText } = props;

  return (
    <Root render={CounterKit} ml={1} theme={theme}>
      {linesCount}
      <span aria-hidden='true'>
        /
        {maxLines}
      </span>
      <ScreenReaderOnly>
        {getI18nText('BulkTextarea.Counter.ofAllowedRows:sr-message', { rowsNumber: maxLines })}
      </ScreenReaderOnly>
      {theme === 'warning' && (
        <ScreenReaderOnly>
          {getI18nText('BulkTextarea.Counter.limitReached:sr-message')}
        </ScreenReaderOnly>
      )}
      {theme === 'danger' && (
        <ScreenReaderOnly>
          {getI18nText('BulkTextarea.Counter.limitExceeded:sr-message')}
        </ScreenReaderOnly>
      )}
    </Root>
  );
}
