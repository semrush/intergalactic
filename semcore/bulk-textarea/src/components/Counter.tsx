import React from 'react';
import { Root } from '@semcore/core';
import { ScreenReaderOnly } from '@semcore/flex-box';
import CounterKit, { CounterProps as CounterPropsKit } from '@semcore/counter';

export type CounterProps = {
  theme: CounterPropsKit['theme'];
  rowsCount: number;
  ofRows: number;
};

export function Counter(props: CounterProps) {
  const { theme, rowsCount, ofRows } = props;

  return (
    <Root render={CounterKit} ml={1} theme={theme}>
      {rowsCount}
      <span aria-hidden='true'>/</span>
      <ScreenReaderOnly>of</ScreenReaderOnly>
      {ofRows}
      <ScreenReaderOnly>allowed rows</ScreenReaderOnly>
      {theme === 'warning' && <ScreenReaderOnly>Limit is almost reached</ScreenReaderOnly>}
      {theme === 'danger' && <ScreenReaderOnly>Limit is exceeded</ScreenReaderOnly>}
    </Root>
  );
}
