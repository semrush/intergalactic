import type { BoxProps } from '@semcore/base-components';
import type { PropGetterFn, Intergalactic } from '@semcore/core';

export type ProgressBarProps = BoxProps & {
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

export type ValueProps = BoxProps & {
  /** Controls the size of the value bar */
  size?: 's' | 'm' | 'l';
  /** Progress value */
  value?: number;
  /** Animation diration in milliseconds for transitions */
  duration?: number;
  /** Color theme */
  theme?: string;
};

export type ProgressBarCxt = {
  getValueProps: PropGetterFn;
};

export type ProgressBarRootComponent = Intergalactic.Component<'div', ProgressBarProps, ProgressBarCxt>;
export type ProgressBarValueComponent = Intergalactic.Component<'div', ValueProps>;

export type ProgressBarComponent = ProgressBarRootComponent & {
  Value: ProgressBarValueComponent;
};
