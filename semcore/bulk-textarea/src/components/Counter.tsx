import { ScreenReaderOnly } from '@semcore/base-components';
import { Root } from '@semcore/core';
import type { useI18n } from '@semcore/core/lib/utils/enhances/WithI18n';
import CounterKit, { type NSCounter } from '@semcore/counter';
import React from 'react';

export type CounterProps = {
  theme: NSCounter.Props['theme'];
  linesCount: number;
  maxLines: number;
  getI18nText: ReturnType<typeof useI18n>;
};

export function Counter(props: CounterProps) {
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
