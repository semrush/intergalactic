import type { Intergalactic } from '@semcore/core';

declare namespace NSLimitsUsageMeter {
    type State = 'normal' | 'warning';

    type Theme = 'default' | 'invert';

    type Props = {
      min?: number;
      max?: number;
      value: number;
      feature: string;
      state?: NSLimitsUsageMeter.State;
      theme?: NSLimitsUsageMeter.Theme;
      locale?: string;
    };

    type Component = Intergalactic.Component<'div', Props>;
}

export type { NSLimitsUsageMeter };
