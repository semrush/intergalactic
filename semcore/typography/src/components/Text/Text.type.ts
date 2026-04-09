import type { BoxProps, EllipsisSettings, SimpleHintPopperProps, Ellipsis } from '@semcore/base-components';
import type { Intergalactic } from '@semcore/core';
import type { Property } from 'csstype';

export type TextHintProps = {
  /** Manually enabled/disabled Hint */
  hint?: boolean;
} & {
  /** Settings for a hint with full text (cropped by ellipsis) */
  [K in keyof SimpleHintPopperProps as `hint:${string & K}`]?: SimpleHintPopperProps[K];
};

/** The text will not be wrapped on a new line and will be cut off with ellipsis. Also, it will show a hint with full text. */
export type TextEllipsisProps = {
  /** Manually enabled/disabled Ellipsis or provide an instance of it. */
  ellipsis?: (boolean | Ellipsis);
} & {
  /** Settings for an Ellipsis */
  [K in keyof EllipsisSettings as `ellipsis:${string & K}`]?: EllipsisSettings[K];
};

export type BaseTextProps = {
  /** Font size and line-heights */
  size?: 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800;
  /**
   * The text will not be wrapped on a new line and will be cut off with ellipsis
   * @deprecated use ellipsis prop instead
   **/
  noWrap?: boolean;
  /** CSS property `font-weight: 700;` */
  bold?: boolean;
  /** CSS property `font-weight: 600;` */
  semibold?: boolean;
  /** CSS property `font-weight: 500;` */
  medium?: boolean;
  /** Italicized text */
  italic?: boolean;
  /** Underlined text */
  underline?: boolean;
  /** CSS property `font-family: monospace;` */
  monospace?: boolean;
  /** Strikethrough text */
  lineThrough?: boolean;
  /** Uppercase text */
  uppercase?: boolean;
  /** Lowercase text */
  lowercase?: boolean;
  /** Capitalized text */
  capitalize?: boolean;
  /** Text color **/
  color?: string;
  /** Custom `font-size` */
  fontSize?: Property.FontSize<any>;
  /** Custom `line-height` */
  lineHeight?: Property.LineHeight<any>;
  /** Custom `font-weight` */
  fontWeight?: Property.FontWeight;
  /** Text alignment */
  textAlign?: Property.TextAlign;
  /** Enforces text color */
  use?: 'primary' | 'secondary';
  /** Makes text semi-transparent to indicate disabled state */
  disabled?: boolean;
};

export type TextProps = BoxProps & BaseTextProps & (
  {
    /** Enable formatting/styling for all nested HTML tags with our default styles for them */
    formatTags?: boolean;
    ellipsis?: never;
    ellipsisProps?: never;
    hint?: never;
    hintProps?: never;
  } |
  ({
    formatTags?: never;
    // /** Settings for a hint with full text (cropped by ellipsis) */
    // hintProps?: Partial<Omit<SimpleHintPopperProps, 'children'>> | false;
  } & TextHintProps & TextEllipsisProps)
);

export type TextComponent = Intergalactic.Component<'span', TextProps>;
