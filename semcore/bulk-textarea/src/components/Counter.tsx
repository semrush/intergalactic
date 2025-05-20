import React from 'react';
import { Root } from '@semcore/core';
import { ScreenReaderOnly } from '@semcore/flex-box';
import CounterKit, { CounterProps as CounterPropsKit } from '@semcore/counter';
import { useI18n } from '@semcore/core/lib/utils/enhances/WithI18n';

export type CounterProps = {
  theme: CounterPropsKit['theme'];
  linesCount: number;
  maxLines: number;
  getI18nText: ReturnType<typeof useI18n>;
};

export function Counter(props: CounterProps) {
  const { theme, linesCount, maxLines, getI18nText } = props;

  return (
    <Root render={CounterKit} ml={1} theme={theme}>
      {linesCount}
      <span aria-hidden='true'>/{maxLines}</span>
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
