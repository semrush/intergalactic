import React from 'react';
import { PropGetterFn, UnknownProperties, Intergalactic } from '@semcore/core';

import { Property } from 'csstype';
import { Box, BoxProps } from '@semcore/flex-box';
import { KeyboardFocusProps } from '@semcore/utils/lib/enhances/keyboardFocusEnhance';

/** @deprecated */
export interface ITextProps extends TextProps, UnknownProperties {}
export type TextProps = BoxProps & {
  /** Font size and line-heights */
  size?: 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800;
  /** The text will not be wrapped on a new line and will be cut off with ellipsis */
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
};

/** @deprecated */
export interface IListProps extends ListProps, UnknownProperties {}
export type ListProps = TextProps & {
  /** Marker of the entire list
   * @default • */
  marker?: React.ReactNode;
};

/** @deprecated */
export interface IListItemProps extends ListItemProps, UnknownProperties {}
export type ListItemProps = TextProps & {
  /** Individual marker of a list item */
  marker?: React.ReactNode;
};

/** @deprecated */
export interface IListContext extends ListContext, UnknownProperties {}
export type ListContext = {
  getItemProps: PropGetterFn;
};

/** @deprecated */
export interface IHintProps extends HintProps, UnknownProperties {}
export type HintProps = TextProps &
  KeyboardFocusProps & {
    /** The value responsible for the activity of the element
     * @default false
     */
    disabled?: boolean;
    /** Enable `active` state */
    active?: boolean;
    /** Left addon hint  */
    addonLeft?: React.ElementType;
    /** Right addon hint  */
    addonRight?: React.ElementType;
  };

/** @deprecated */
export interface IBlockquoteProps extends BlockquoteProps, UnknownProperties {}
export type BlockquoteProps = BoxProps & {
  /** Source of the quote */
  author?: React.ReactNode;
};

declare const Hint: Intergalactic.Component<'abbr', HintProps> & {
  Addon: typeof Box;
  Text: typeof Box;
};

declare const List: Intergalactic.Component<'ul', ListProps> & {
  Item: Intergalactic.Component<'li', ListItemProps>;
};

declare const Text: Intergalactic.Component<'span', TextProps>;

declare const Blockquote: Intergalactic.Component<'blockquote', BlockquoteProps>;

export { Text, List, Hint, Blockquote };
