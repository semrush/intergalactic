import type { Intergalactic } from '@semcore/core';
declare namespace NSLimitsUsageMeter {
    type State = 'normal' | 'warning';

    type Theme = 'default' | 'invert';

    type Props = {
      /**
       * Minimum value of the meter
       * @default 0
       */
      min?: number;
      /**
       * Maximum value of the meter (usage limit)
       * @default 100
       */
      max?: number;
      /**
       * Current usage value. Values outside of the `min`–`max` range are clamped
       */
      value: number;
      /**
       * Name of the limited feature. Used as a visible label and as an accessible name of the meter
       */
      feature: string;
      /**
       * Visual state of the filled part of the meter
       * @default normal
       */
      state?: NSLimitsUsageMeter.State;
      /**
       * Color theme. Use `invert` on dark backgrounds
       * @default default
       */
      theme?: NSLimitsUsageMeter.Theme;
      /**
       * Locale for the built-in texts
       */
      locale?: string;
    };

    type Component = Intergalactic.Component<'div', Props>;
}

export type { NSLimitsUsageMeter };
