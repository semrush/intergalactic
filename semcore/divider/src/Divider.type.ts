import type { BoxProps } from '@semcore/base-components';
import type { Intergalactic } from '@semcore/core';

export type DividerProps = BoxProps & {
  /**
   * Type of the divider
   * @default primary
   */
  use?: 'primary' | 'secondary';
  /**
   * Theme of the divider
   */
  theme?: string | 'invert';
  /**
   * Orientation of the divider
   * @default horizontal
   */
  orientation?: 'horizontal' | 'vertical';
};

export type DividerComponent = Intergalactic.Component<'div', DividerProps>;
