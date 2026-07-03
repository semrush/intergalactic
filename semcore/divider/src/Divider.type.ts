import type { NSBox } from '@semcore/base-components';
import type { Intergalactic } from '@semcore/core';

declare namespace NSDivider {
  type Props = NSBox.Props & {
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
  type DefaultProps = {
    use: 'primary';
    orientation: 'horizontal';
  };

  type Component = Intergalactic.Component<'div', Props>;
}

/** @deprecated It will be removed in v18. */
export type DividerProps = NSDivider.Props;

export type { NSDivider };
