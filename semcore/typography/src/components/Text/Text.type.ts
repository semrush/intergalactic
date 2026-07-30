import type {
  NSBox,
  NSEllipsis,
  NSHint,
  Ellipsis as EllipsisInstance,
} from '@semcore/base-components';
import type { Intergalactic } from '@semcore/core';
import type { Property } from 'csstype';

declare namespace NSText {
  type BaseProps = {
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

  type HintProps = {
    /** Manually enabled/disabled Hint */
    hint?: boolean;
  } & {
    /** Settings for a hint with full text (cropped by ellipsis) */
    [K in keyof NSHint.Props as `hint:${string & K}`]?: NSHint.Props[K];
  };

  type EllipsisProps = {
    /** Manually enabled/disabled Ellipsis or provide an instance of it. */
    ellipsis?: boolean | EllipsisInstance;
  } & {
    /** Settings for an Ellipsis */
    [K in keyof NSEllipsis.Settings as `ellipsis:${string & K}`]?: NSEllipsis.Settings[K];
  };

  type Props = NSBox.Props & NSText.BaseProps &
    (
      | {
        /** Enable formatting/styling for all nested HTML tags with our default styles for them */
        formatTags?: boolean;
        ellipsis?: never;
        ellipsisProps?: never;
        hint?: never;
        hintProps?: never;
      }
      | ({
        formatTags?: never;
      } & NSText.HintProps & NSText.EllipsisProps)
    );

  type Component = Intergalactic.Component<'span', Props>;
}

/** @deprecated It will be removed in v19. */
export type TextHintProps = NSText.HintProps;
/** @deprecated It will be removed in v19. */
export type TextEllipsisProps = NSText.EllipsisProps;
/** @deprecated It will be removed in v19. */
export type BaseTextProps = NSText.BaseProps;
/** @deprecated It will be removed in v19. */
export type TextProps = NSText.Props;
/** @deprecated It will be removed in v19. */
export type TextComponent = NSText.Component;

export type { NSText };
