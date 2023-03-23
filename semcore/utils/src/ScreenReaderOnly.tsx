import React from 'react';
import createComponent, { sstyled, Root } from '@semcore/core';

// @ts-ignore
import style from './ScreenReaderOnly.shadow.css';

const ScreenReaderOnlyRoot = (props: { children: React.ReactNode }) => {
  const SScreenReaderOnlyRoot = Root;
  return sstyled(style)(
    <SScreenReaderOnlyRoot render="span">{props.children}</SScreenReaderOnlyRoot>,
  );
};

ScreenReaderOnlyRoot.displayName = 'ScreenReaderOnlyRoot';

export const ScreenReaderOnly = createComponent(ScreenReaderOnlyRoot) as React.FC<{
  children: React.ReactNode;
}>;
