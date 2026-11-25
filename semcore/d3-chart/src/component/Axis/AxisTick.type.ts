import type { NSBox } from '@semcore/base-components';
import type { Intergalactic } from '@semcore/core';
import type * as React from 'react';

declare namespace NSAxisTick {

  type Props = NSBox.Props & {
    value: number | string | Date;
    translate: string;
    valueFormatter: (value: unknown) => React.ReactNode;
  };

  type State = {
    isInteractive: boolean;
  };

  type Component = Intergalactic.Component<'div', Props>;
}

export type {
  NSAxisTick,
};
