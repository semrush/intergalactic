import type { BoxProps } from '@semcore/base-components';
import type { PropGetterFn, Intergalactic } from '@semcore/core';

declare namespace NSProgressBar {
  type Props = BoxProps & {
    /**
     * Progress bar theme
     * @default invert
     */
    theme?: 'dark' | 'invert' | string;
    /**
     * Progress bar size
     * @default m
     */
    size?: 's' | 'm' | 'l';
    /** Value as a percentage */
    value?: number;
    /** Duration of animation, ms
     * @default 1000
     */
    duration?: number;
  };

  type Ctx = {
    getValueProps: PropGetterFn;
  };

  type Root = Intergalactic.Component<'div', Props, Ctx>;

  namespace Value {
    type Props = BoxProps & {
      /** Controls the size of the value bar */
      size?: 's' | 'm' | 'l';
      /** Progress value */
      value?: number;
      /** Animation diration in milliseconds for transitions */
      duration?: number;
      /** Color theme */
      theme?: string;
    };

    type Root = Intergalactic.Component<'div', Props>;
  }

  type Component = Root & {
    Value: Value.Root;
  };
}

/** @deprecated It will be removed in v18. */
export type ProgressBarProps = NSProgressBar.Props;
/** @deprecated It will be removed in v18. */
export type ValueProps = NSProgressBar.Value.Props;
/** @deprecated It will be removed in v18. */
export type ProgressBarCxt = NSProgressBar.Ctx;

export type { NSProgressBar };
