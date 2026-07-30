import type { Intergalactic, IStyledProps } from '@semcore/core';
import type { Theme, BasicColorKeys, SemanticColorKeys } from '@semcore/theme';
import type { Property } from 'csstype';
import type React from 'react';

type BorderRadius = `${keyof Theme['semanticTokens']['radii']}-rounded`;

declare namespace NSBox {
  type Props = IStyledProps & {
    /**
     * HTML class name attribute
     */
    className?: string;
    /**
     * HTML style attribute
     */
    style?: React.CSSProperties;
    /**
     * CSS `display` property
     */
    display?: Property.Display;

    /** Sets the `inline-block` property */
    inline?: boolean;

    /** CSS `box-sizing: border-box` property */
    boxSizing?: boolean | 'border-box';

    /** CSS `flex` property */
    flex?: Property.Flex<string>;

    /** CSS `margin` property */
    m?: number | string;

    /** CSS `margin-top` property */
    mt?: number | string;

    /** CSS `margin-right` property */
    mr?: number | string;

    /** CSS `margin-bottom` property */
    mb?: number | string;

    /** CSS `margin-left` property */
    ml?: number | string;

    /** CSS `margin-left` and `margin-right` property */
    mx?: number | string;

    /** CSS `margin-top` and `margin-bottom` property */
    my?: number | string;

    /** CSS `padding` property */
    p?: number | string;

    /** CSS `padding-top` property */
    pt?: number | string;

    /** CSS `padding-right` property */
    pr?: number | string;

    /** CSS `padding-bottom` property */
    pb?: number | string;

    /** CSS `padding-left` property */
    pl?: number | string;

    /** CSS `padding-left` and `padding-right` property */
    px?: number | string;

    /** CSS `padding-top` and `padding-bottom` property */
    py?: number | string;

    /**
     * CSS `width` property.
     * If its value is less than 1, is considered as a fraction of 100%.
     * If its value is more than 1, is considered as value in px, if it is a string, is passed as is.
     */
    w?: number | string;

    /**
     * CSS `min-width` property.
     * If its value is less than 1, is considered as a fraction of 100%.
     * If its value is more than 1, is considered as value in px, if it is a string, is passed as is.
     */
    wMin?: number | string;

    /**
     * CSS `max-width` property.
     * If its value is less than 1, is considered as a fraction of 100%.
     * If its value is more than 1, is considered as value in px, if it is a string, is passed as is.
     */
    wMax?: number | string;

    /**
     * CSS `height` property.
     * If its value is less than 1, is considered as a fraction of 100%.
     * If its value is more than 1, is considered as value in px, if it is a string, is passed as is.
     */
    h?: number | string;

    /**
     * CSS `min-height` property.
     * If its value is less than 1, is considered as a fraction of 100%.
     * If its value is more than 1, is considered as value in px, if it is a string, is passed as is.
     */
    hMin?: number | string;

    /**
     * CSS `max-height` property.
     * If its value is less than 1, is considered as a fraction of 100%.
     * If its value is more than 1, is considered as value in px, if it is a string, is passed as is.
     */
    hMax?: number | string;

    /**
     * Multiplier of all indents. For example, if you specify a margin-top equal to 3 (mt = {3}), it will be 12px (3 * 4 = 12).
     * @default 4
     */
    scaleIndent?: number;

    /**
     * Flag for render outline inside box
     * @default false
     */
    innerOutline?: boolean;

    /**
     * Flag for render inverted outline
     * @default false
     */
    invertOutline?: boolean;

    /**
     * Flag for render outline in the ::after element
     * @default false
     */
    inAfterOutline?: boolean;
    /** CSS `position` property */
    position?: Property.Position;
    /** CSS `top` property */
    top?: number | string;
    /** CSS `left` property */
    left?: number | string;
    /** CSS `bottom` property */
    bottom?: number | string;
    /** CSS `right` property */
    right?: number | string;
    /** CSS `inset` property */
    inset?: string;
    /** CSS `z-index` property */
    zIndex?: number;
    /** CSS `text-align` property */
    textAlign?: Property.TextAlign;
    /** Box content */
    children?: React.ReactNode;
    /** Hover cursor */
    hoverCursor?: Property.Cursor;
    /** Css `background` property */
    bg?: Property.Background | BasicColorKeys | SemanticColorKeys;
    /** Css `border-radius` property */
    borderRadius?: Property.BorderRadius | BorderRadius;
    /** Css `border` property */
    border?: Property.Border;
    /** Css `resize` property */
    resize?: Property.Resize;
    /** Css `overflow` property */
    overflow?: Property.Overflow;
    /**
     * Old way to add custom style
     * @deprecated
     */
    css?: any;
    /**
     * Focus ring offset (top)
     */
    focusRingTopOffset?: Property.Top;
    /**
     * Focus ring offset (left)
     */
    focusRingLeftOffset?: Property.Left;
    /**
     * Focus ring offset (right)
     */
    focusRingRightOffset?: Property.Right;
    /**
     * Focus ring offset (bottom)
     */
    focusRingBottomOffset?: Property.Bottom;
  };

  type Component = Intergalactic.Component<'div', Props>;
}

/** @deprecated It will be removed in v19. */
export type BoxProps = NSBox.Props;

export type { NSBox };
