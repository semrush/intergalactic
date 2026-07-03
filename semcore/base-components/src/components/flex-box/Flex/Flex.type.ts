import type { Intergalactic } from '@semcore/core';
import type { Property } from 'csstype';

import type { NSBox } from '../Box/Box.type';

declare namespace NSFlex {
  type Props = NSBox.Props & {
    /**
     * It manages the `inline-flex` property
     */
    inline?: boolean;
    /**
     * Adds the `reverse` property to `flex-direction`
     */
    reverse?: boolean;
    /**
     * It manages the `flex-wrap` property
     */
    flexWrap?: boolean;
    /**
     * It manages the `flex-direction` property
     */
    direction?: Property.FlexDirection;
    /**
     * It manages the `align-items` property
     */
    alignItems?: Property.AlignItems;
    /**
     * It manages the `align-content` property
     */
    alignContent?: Property.AlignContent;
    /**
     * CSS `justify-content` property
     */
    justifyContent?: Property.JustifyContent;
    /**
     * CSS `gap` property
     */
    gap?: Property.Gap<number>;
    /**
     * CSS `gap` property
     */
    rowGap?: Property.RowGap<number>;
    /**
     * CSS `gap` property
     */
    columnGap?: Property.ColumnGap<number>;

    /**
     * Multiplier of all indents. For example, if you specify a margin-top equal to 3 (mt = {3}), it will be 12px (3 * 4 = 12).
     * @default 4
     */
    scaleIndent?: number;
  };

  type Component = Intergalactic.Component<'div', Props>;
}

/** @deprecated It will be removed in v18. */
export type FlexProps = NSFlex.Props;

export type { NSFlex };
