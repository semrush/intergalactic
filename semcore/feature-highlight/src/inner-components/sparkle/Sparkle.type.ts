import type { Intergalactic } from '@semcore/core';

declare namespace NSSparkleFH {
    type Props = {
      index: number;
      num: number;
      curve?: number;
      top?: string;
      left?: string;
    };

    type Component = Intergalactic.Component<'svg', Props>;
}

export type { NSSparkleFH };
