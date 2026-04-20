import type { BoxProps } from '@semcore/base-components';
import type { Intergalactic } from '@semcore/core';

declare namespace NSDivider {
  type Props = BoxProps & {
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

  type Component = Intergalactic.Component<'div', Props>;
}

/** @deprecated It will be removed in v18. */
export type DividerProps = NSDivider.Props;

export type { NSDivider };
