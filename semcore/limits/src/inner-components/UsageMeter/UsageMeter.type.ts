import type { Intergalactic } from '@semcore/core';
declare namespace NSUsageMeter {
    type State = 'normal' | 'warning';

    type Theme = 'default' | 'invert';

    type Props = {
      min?: number;
      max?: number;
      value: number;
      feature: string;
      state?: NSUsageMeter.State;
      theme?: NSUsageMeter.Theme;
      locale?: string;
    };

    type Component = Intergalactic.Component<'div', Props>;
}

export type { NSUsageMeter };
